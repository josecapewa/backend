import path from "path";
import fs, { existsSync, rmSync } from "fs";
import { paths } from "@/modules/lib/definitions/paths";
import { MultipartFile } from "@fastify/multipart";
import { AppError } from "@/modules/errors/app";

class FileManagementService {
  /**
   * Faz o upload de um arquivo para o diretório especificado.
   *
   * @param {Object} params - Os parâmetros para a função de upload.
   * @param {MultipartFile} params.part - A parte do arquivo a ser enviada.
   * @param {string} params.name - O nome do arquivo.
   * @param {string} [params.directory] - O diretório opcional onde o arquivo será enviado.
   * @returns {Promise<string>} - Uma promessa que resolve para o caminho do arquivo enviado.
   * @throws {Error} - Lança um erro se o upload falhar.
   */
  async upload({
    name,
    part,
    directory,
  }: {
    part: MultipartFile;
    name?: string;
    directory?: string;
  }): Promise<string> {
    try {
      const fileName = `${name ? name.trim() : part.filename}${path.extname(
        part.filename
      )}`;
      const uploadDir = path.join(paths.upload, directory || "");
      const uploadPath = path.join(uploadDir, fileName);
      await fs.promises.mkdir(uploadDir, { recursive: true });

      const fileBuffer = await part.toBuffer();
      const fileSize = fileBuffer.length;
      if (!fileBuffer || fileSize === 0) {
        throw new AppError("O buffer do arquivo está vazio ou inválido",500);
      }
      if (fileSize > 10 * 1024 * 1024) {
        const fileStream = fs.createWriteStream(uploadPath);
        fileStream.write(fileBuffer);
        fileStream.end();

        await new Promise<void>((resolve, reject) => {
          fileStream.on("finish", resolve);
          fileStream.on("error", reject);
        });
      } else {
        await fs.promises.writeFile(uploadPath, fileBuffer);
      }

      return directory ? `${directory}/${fileName}` : fileName;
    } catch (error) {
      throw new AppError("Erro ao fazer upload do arquivo: " + error, 500);
    }
  }
  /**
   * Deleta um arquivo no caminho especificado.
   *
   * @param filePath - O caminho relativo do arquivo a ser deletado.
   * @returns Uma promessa que resolve para `true` se o arquivo foi deletado com sucesso.
   * @throws Um erro se o arquivo não puder ser deletado.
   */
  async delete(filePath: string): Promise<boolean> {
    try {
      const fullFilePath = path.join(paths.upload, filePath);

      if (existsSync(fullFilePath)) rmSync(fullFilePath, { recursive: true });

      return true;
    } catch (error) {
      console.error(`Erro ao deletar o arquivo: ${filePath}`, error);
      throw new Error("Erro ao deletar o arquivo");
    }
  }
}

export const fileManagementService = new FileManagementService();
