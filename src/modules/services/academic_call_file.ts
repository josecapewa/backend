import { FastifyRequest, FastifyReply } from "fastify";
import { BaseService } from "./base";
import { MultipartBody } from "../types/multipart";
import { AppError } from "../errors/app";
import prisma from "../lib/prisma";
import { getFieldsAndFiles } from "../helpers/multipart/get_fields_and_files";
import { academicCallFileModel } from "../models/academic_call_file";
import { academicCallFileValidations } from "../validations/academic_call_file";
import { countFiles, verifyFileType } from "../helpers/data/verify_exists";
import { getSequentialFileName } from "../helpers/file/get_sequential_file_name";
import { fileManagementService } from "./file-management";
import getFinalFilePath from "../helpers/file/get_final_file_path";
import { ParamsValidations } from "../validations/params";

class AcademicCallFileService extends BaseService {
  model = academicCallFileModel;
  create = async (req: FastifyRequest, res: FastifyReply) => {
    const data = req.body as MultipartBody;

    const { fields, files } = await getFieldsAndFiles(data);
    const academicCallFileType = await verifyFileType("Convocatórias");
    if (!files.pdf) {
      throw new AppError("O PDF das convocatórias não foi enviado.", 400);
    }

    const { alunos_turmas, _class } =
      academicCallFileValidations.getData.parse(fields);

    const studentsSequencialName = getSequentialFileName(
      alunos_turmas.map((aluno_turma) => aluno_turma.n_turma)
    );

    let fileName = `${_class}${
      studentsSequencialName ? `_${studentsSequencialName}` : ""
    }`;
    const version = await countFiles(fileName, "Convocatórias");

    if (version > 0) {
      fileName += ` (${version})`;
    }

    const filePath = await fileManagementService.upload({
      name: fileName,
      part: files.pdf,
      directory: getFinalFilePath("CONVOCATORIAS"),
    });

    const academicCallFile = await prisma.arquivoConvocatoria.create({
      data: {
        convocatorias: {
          createMany: {
            data: alunos_turmas.map((aluno_turma) => ({
              id_aluno_turma: aluno_turma.id,
            })),
            skipDuplicates: true,
          },
        },
        arquivo: {
          create: {
            caminho: filePath,
            id_tipo_arquivo: academicCallFileType.id,
            nome: fileName,
          },
        },
      },
    });

    return res.send(academicCallFile);
  };
  delete = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = ParamsValidations.getId.parse(req.params);
    const deletedFile = await prisma.arquivo.delete({
      where: {
        id,
      },
    });
    if (deletedFile) {
      await fileManagementService.delete(deletedFile.caminho);
    }

    return res.send({ message: "Arquivo eliminado com sucesso." });
  };
}

export const academicCallFileService = new AcademicCallFileService();
