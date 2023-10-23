import { Timestamp } from 'typeorm';
import { Roles } from '../common/user-roler.enum';

export class UserProfile {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  roles!: Roles[];
  createdAT: Timestamp;
  updatedAt: Timestamp;
}
