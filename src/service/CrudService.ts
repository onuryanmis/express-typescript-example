import {EntityTarget} from "typeorm";
import AppDataSource from "../config/AppDataSource";
import {NotFoundError} from "routing-controllers";

export class CrudService{
    public static async findOrNotFound(entity: EntityTarget<any>, where: object): Promise<any>{
        const detail = await AppDataSource.getRepository(entity).findOneBy(where);

        if (!detail) throw new NotFoundError('404 not found!');

        return detail;
    }
}