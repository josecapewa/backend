import { DefaultFileTypes } from "@/modules/lib/definitions/file_types";
import { AppError } from "../../errors/app";
import prisma from "../../lib/prisma";

interface IClassNameStudents {
  turmas: {
    alunos_turma: {
      aluno: {
        pessoa: {
          genero: boolean | null;
        };
      };
    }[];
  }[];
}
export async function verifyFileType(name: DefaultFileTypes) {
  const academicCallFileType = await prisma.tipoArquivo.findUnique({
    where: { nome: name },
  });
  if (!academicCallFileType) {
    throw new AppError(
      `O tipo de arquivo '${name}' não foi encontrado. Adicione este tipo de arquivo ao sistema antes de proceder.`,
      404
    );
  }
  return academicCallFileType;
}

export async function countFiles(name: string, type: DefaultFileTypes) {
  return await prisma.arquivo.count({
    where: {
      nome: name,
      tipo_arquivo: {
        nome: type,
      },
    },
  });
}

export function getTotalClassNamesStudents(classNames: IClassNameStudents[]) {
  let total_masculinos = 0;
  let total_femininos = 0;

  classNames.forEach((nomeTurma) => {
    nomeTurma.turmas.forEach((turma) => {
      turma.alunos_turma.forEach((alunoTurma) => {
        if (alunoTurma.aluno?.pessoa?.genero === true) {
          total_masculinos++;
        } else if (alunoTurma.aluno?.pessoa?.genero === false) {
          total_femininos++;
        }
      });
    });
  });

  return {
    total_masculinos,
    total_femininos,
  };
}
