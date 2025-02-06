import { userModel } from "../models/user";
import { cpanelService } from "../services/cpanel";

export function validateBiFormat(biNumber: string) {
  const biRegex = /^\d{9}[A-Za-z]{2}\d{3}$/;
  return biRegex.test(biNumber);
}

export function getFirstAndLastName(name: string) {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names.reverse().find((name) => name !== "");
  return `${firstName} ${lastName}`;
}

export async function generateUsername(name: string): Promise<string> {
  let baseUsername = getFirstAndLastName(name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

  let username = baseUsername;
  let counter = 1;

  while (await userModel.userExists(username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
}

export function formatCamelCaseToTitle(text: string): string {
  if (!text) return "";

  const spacedText = text.replace(/([A-Z])/g, " $1");

  return spacedText.trim().replace(/^./, (str) => str.toUpperCase());
}

export async function generateUniqueEmail(email: string): Promise<string> {
  let [baseUsername, domain] = email.split("@");
  let username = baseUsername;
  let counter = 1;

  while (await cpanelService.doesEmailExist(`${username}@${domain}`)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return `${username}@${domain}`;
}

export const isPasswordStrongEnought = (pass: string) => {
  return pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/)
}

//Special Exams functions

export const formatSubjectName = (nome: string) => {
  const semEspaco = nome.trimEnd().trimStart();
  const palavras = semEspaco.split(" ");

  const formatadas = palavras.filter((p) => p.length > 2);

  if (formatadas.length > 2) {
    return formatadas
      .map((p, ind) => {
        return `${p[0].toUpperCase()}${
          ind === formatadas.length - 1 ? "" : "."
        }`;
      })
      .join(" ");
  }
  return nome;
};