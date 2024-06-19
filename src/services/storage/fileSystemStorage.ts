import * as fsPromises from "fs/promises";
import fs from "fs";
import * as path from "path";
import { Storage } from "./types.js";

const createFileSystemStorage = (): Storage => {
  const basePath = process.env.FILESYSTEM_BASE_PATH || "./data";

  const createFileStorageIfNotExists = (basePath: string) => {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
  };

  createFileStorageIfNotExists(basePath);

  const save = async (key: string, data: any): Promise<void> => {
    const filePath = path.join(basePath, `${key}.json`);
    await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
  };

  return { save };
};

export default createFileSystemStorage;
