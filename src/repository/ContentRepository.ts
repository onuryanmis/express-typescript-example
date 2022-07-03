import AppDataSource from '../config/AppDataSource';
import {Content} from '../entity/Content';

export const ContentRepository = AppDataSource.getRepository(Content).extend({
    findOneByIdWithCategory(id: number) {
        return this.createQueryBuilder('content')
            .leftJoinAndSelect('content.category', 'category')
            .where('content.id = :id', {id})
            .getOne()
    },
})
