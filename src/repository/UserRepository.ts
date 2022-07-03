import AppDataSource from '../config/AppDataSource';
import {User} from '../entity/User';

export const UserRepository = AppDataSource.getRepository(User);