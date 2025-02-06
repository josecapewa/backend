import { MultipartBody, MultipartField } from "@/modules/types/multipart";
import { MultipartFile } from "@fastify/multipart";

/**
 * Extracts fields and files from a given multipart body.
 *
 * This asynchronous function processes the provided multipart data,
 * categorizing it into fields and files. Fields are expected to have
 * a type of "field" and will be stored in a key-value format, while
 * files will be stored as is in a separate object.
 *
 * @param {MultipartBody} data - The multipart body containing fields and files.
 * @returns {Promise<{ fields: Record<string, string>, files: Record<string, MultipartFile> }>}
 *          A promise that resolves to an object containing two properties:
 *          - `fields`: An object mapping field names to their values.
 *          - `files`: An object mapping file names to their corresponding MultipartFile objects.
 *
 * @throws {Error} Throws an error if the input data is not in the expected format.
 *
 * @example
 * const data = {
 *   username: { type: 'field', value: 'john_doe' },
 *   profilePic: { type: 'file', ...fileObject }
 * };
 *
 * const result = await getFieldsAndFiles(data);
 * console.log(result.fields); // { username: 'john_doe' }
 * console.log(result.files); // { profilePic: ...fileObject }
 */
export async function getFieldsAndFiles(data: MultipartBody) {
  const fields: Record<string, string> = {};
  const files: Record<string, MultipartFile> = {};

  for (const [key, obj] of Object.entries(data)) {
    if ((obj.type as "field" | "file") === "field") {
      fields[key] = (obj as MultipartField).value;
    } else {
      files[key] = obj;
    }
  }

  return { fields, files };
}
