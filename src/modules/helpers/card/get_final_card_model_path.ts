import { removeAccents } from "../names";


export default function getFinalCardModelPath(
  trainingFieldName: string,
  cardModelName: string
) {
  return `${removeAccents(
    trainingFieldName.toUpperCase()
  )}/CARTOES/MODELOS/${removeAccents(cardModelName).toUpperCase()}`;
}
