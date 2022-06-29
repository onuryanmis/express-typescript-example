import {EntityTarget} from "typeorm";
import AppDataSource from "../config/AppDataSource";
import {NotFoundError} from "routing-controllers";

export class CrudService {
    public static async findOrNotFound(entity: EntityTarget<any>, where: object): Promise<any> {
        return this.notFoundChecker(
            await AppDataSource.getRepository(entity).findOneBy(where)
        );
    }

    public static async notFoundChecker(data: any): Promise<any> {
        if (!data) throw new NotFoundError('404 not found!');
        return data;
    }
}