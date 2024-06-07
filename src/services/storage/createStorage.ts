import createFileSystemStore from "./fileSystemStorage.js";
import { Storage, StorageType } from "./types.js";
// import { createMongoDBStorage } from "./mongodbStorage.js";

const CreateStorage = async (): Promise<Storage> => {
  const storageType = process.env.STORAGE_TYPE;

  switch (storageType) {
    case StorageType.fileSystem:
      return createFileSystemStore();
    case StorageType.mongodb:
    // return createMongoDBStorage();

    default:
      throw new Error(`Unknown storage type: ${storageType}`);
  }
};

export default CreateStorage;
