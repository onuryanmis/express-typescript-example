import {Body, Delete, Get, InternalServerError, JsonController, Param, Post, Put} from 'routing-controllers';
import {Category} from "../entity/Category";
import {CrudService} from "../service/CrudService";
import Logger from "../library/LoggerLibrary";
import {SuccessResponse} from "../response/SuccessResponse";
import {CategoryRepository} from "../repository/CategoryRepository";

@JsonController("/category")
export class CategoryController {
    @Get('/')
    public async index(): Promise<Category[]> {
        return await CategoryRepository.find();
    }

    @Get('/:id')
    public async detail(@Param("id") id: number): Promise<Category> {
        return await CrudService.findOrNotFound(Category, {id});
    }

    @Post('/')
    public async create(@Body() requestBody: Category): Promise<SuccessResponse> {
        try {
            await CategoryRepository.save(requestBody)
            return new SuccessResponse('Category successfully added - #' + requestBody.id);
        } catch (err) {
            Logger.error('[CATEGORY][ADD][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Put('/:id')
    public async update(@Param("id") id: number, @Body() requestBody: Category): Promise<SuccessResponse> {
        const category = await CrudService.findOrNotFound(Category, {id});
        try {
            await CategoryRepository.update(category.id, requestBody)
            return new SuccessResponse('Category successfully updated - #' + category.id);
        } catch (err) {
            Logger.error('[CATEGORY][UPDATE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Delete('/:id')
    public async remove(@Param("id") id: number): Promise<SuccessResponse> {
        const category = await CrudService.findOrNotFound(Category, {id});
        try {
            await CategoryRepository.remove(category);
            return new SuccessResponse('Category successfully deleted - #' + id);
        } catch (err) {
            Logger.error('[CATEGORY][REMOVE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }
}