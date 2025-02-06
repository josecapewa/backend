import { AppError } from "@/modules/errors/app";

export default async function getStreamBuffer(stream: NodeJS.ReadableStream) {
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream) {
    chunks.push(chunk as Buffer<ArrayBufferLike>);
  }
  const buffer = Buffer.concat(chunks);

  if (buffer.length === 0) {
    throw new AppError("O arquivo gerado está vazio.", 500);
  }
  return buffer;
}
