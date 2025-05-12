import crypto, { BinaryToTextEncoding } from 'crypto';

const cipher = crypto.createCipheriv(
  'aes-128-cbc',
  process.env.SECRET_KEY,
  process.env.SECRET_IV,
);
const decipher = crypto.createDecipheriv(
  'aes-128-cbc',
  process.env.SECRET_KEY,
  process.env.SECRET_IV,
);

export const encodeStr = (data: string) => {
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};

export const decodeStr = (encryptedData: string) => {
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
};

export const encodeMd5 = (
  str: string,
  encoding: BinaryToTextEncoding = 'base64',
) => {
  return crypto.createHash('md5').update(str).digest(encoding);
};
