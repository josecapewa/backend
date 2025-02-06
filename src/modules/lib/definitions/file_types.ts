export type DefaultFileTypes =
  | "Convocatórias"
  | "Foto original do aluno"
  | "Foto original do professor"
  | "Cartões";
export const defaultFileTypes: Record<DefaultFileTypes, string> = {
  Cartões: "Cartões",
  Convocatórias: "Convocatórias",
  "Foto original do aluno": "Foto original do aluno",
  "Foto original do professor": "Foto original do professor",
};

