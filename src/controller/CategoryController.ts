import {Body, Delete, Get, InternalServerError, JsonController, Param, Post, Put} from 'routing-controllers';
import {Repository} from "typeorm";
import {Category} from "../entity/Category";
import AppDataSource from "../config/AppDataSource";
import {CrudService} from "../service/CrudService";
import Logger from "../library/LoggerLibrary";
import {SuccessResponse} from "../response/SuccessResponse";

@JsonController("/category")
export class CategoryController {
    private readonly categoryRepository: Repository<Category>

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(Category)
    }

    @Get('/')
    public async index(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    @Get('/:id')
    public async detail(@Param("id") id: number): Promise<Category> {
        return await CrudService.findOrNotFound(Category, {id});
    }

    @Post('/')
    public async create(@Body() requestBody: Category): Promise<SuccessResponse> {
        try {
            await this.categoryRepository.save(requestBody)
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
            await this.categoryRepository.update(category.id, requestBody)
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
            await this.categoryRepository.remove(category);
            return new SuccessResponse('Category successfully deleted - #' + id);
        } catch (err) {
            Logger.error('[CATEGORY][REMOVE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }
}