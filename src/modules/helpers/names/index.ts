export function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
export function formatNameList(names: string[]): string {
  if (names.length === 0) {
    return "";
  }
  if (names.length === 1) {
    return names[0];
  }
  if (names.length === 2) {
    return `${names[0]} e ${names[1]}`;
  }

  console.log("names", names);
  const lastName = names.pop();
  return `${names.join(", ")} e ${lastName}`;
}

export function extractUniqueFieldName(fieldTarget: string) {
  const match = fieldTarget.match(/^[^_]+_([^_]+)_key$/);
  return match ? match[1] : null;
}
