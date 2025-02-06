export const formatStudentAverage = (note: number) => {
  const noteString = note.toString();
  const parts = noteString.split(".");

  if (parts.length === 1) {
    return parseInt(parts[0]);
  }

  const [originalNote, decimalUnit] = parts;

  if (parseFloat("0." + decimalUnit) < 0.499999) {
    return parseInt(originalNote);
  }

  return parseInt(originalNote) + 1;
};
