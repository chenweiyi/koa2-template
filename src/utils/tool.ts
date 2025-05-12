import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

export const getDirname = () => {
  return dirname(fileURLToPath(import.meta.url));
};

export const genRandomStr = (length: number) => {
  const chars =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const mkdirFolder = (folderPath: string) => {
  const folderAbsPath = path.join(getDirname(), '../..', folderPath);
  try {
    if (!fs.existsSync(folderAbsPath)) {
      fs.mkdirSync(folderAbsPath, { recursive: true });
      console.log('folderPath created successfully:', folderAbsPath);
    }
  } catch (error) {
    console.error('mkdirFolder error:', error);
    throw error;
  }
};

export const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('filePath deleted successfully:', filePath);
    }
  } catch (error) {
    console.error('deleteFile error:', error);
    throw error;
  }
};

export const deleteFolder = (folderPath: string) => {
  try {
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
      console.log('folderPath deleted successfully:', folderPath);
    }
  } catch (error) {
    console.error('deleteFolder error:', error);
    throw error;
  }
};
