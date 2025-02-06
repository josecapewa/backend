import bcrypt from "bcryptjs";
import { generateKeyPairSync } from "crypto";

class HashService {
  hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };
  comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  }
  generatePassword = async () => {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";
    let password = "";
    for (let i = 0; i < length; i++) {
      const at = Math.floor(Math.random() * (charset.length + 1));
      password += charset.charAt(at);
    }
    return password;
  }

  generateKeys = () => {
    const { publicKey } = generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });

    const cleanKey = (key: string) =>
      key
        .replace(/-----BEGIN (PUBLIC) KEY-----\n/, "")
        .replace(/\n-----END (PUBLIC) KEY-----\n/, "")
        .replace(/\n/g, "");

    return {
      publicKey: cleanKey(publicKey),
    };
  }
}

export const hashService = new HashService();
