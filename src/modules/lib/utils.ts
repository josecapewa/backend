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

export function formatCamelCaseToTitle(text: string): string {
  if (!text) return "";

  const spacedText = text.replace(/([A-Z])/g, " $1");

  return spacedText.trim().replace(/^./, (str) => str.toUpperCase());
}

export const isPasswordStrongEnought = (pass: string) => {
  return pass.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/
  );
};
