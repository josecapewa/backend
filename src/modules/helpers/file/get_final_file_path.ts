import dayjs from "dayjs";
import { removeAccents } from "../names";

export default function getFinalFilePath(fileType: string) {
  return `ARQUIVOS/${removeAccents(
    fileType
  ).toUpperCase()}/${dayjs().year()}/${dayjs()
    .format("MMMM")
    .toUpperCase()}/${dayjs().format("DD")}`;
}
