export interface Storage {
  save(key: string, data: any): Promise<void>;
}

export interface StorageConfig {
  type: StorageType;
  options: any;
}

export enum StorageType {
  fileSystem = "fileSystem",
  mongodb = "mongodb",
}
