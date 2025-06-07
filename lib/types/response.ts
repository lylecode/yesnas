import { Storage } from '@prisma/client';
import { StorageUsage } from './storage';

export interface StorageResponse {
  storage: Storage;
  usage: StorageUsage;
}
