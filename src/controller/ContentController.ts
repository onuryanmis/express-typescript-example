import {Body, Delete, Get, InternalServerError, JsonController, Param, Post, Put} from 'routing-controllers';
import {Repository} from "typeorm";
import AppDataSource from "../config/AppDataSource";
import {CrudService} from "../service/CrudService";
import Logger from "../library/LoggerLibrary";
import {SuccessResponse} from "../response/SuccessResponse";
import {Content} from "../entity/Content";

@JsonController("/content")
export class ContentController {
    private readonly contentRepository: Repository<Content>

    constructor() {
        this.contentRepository = AppDataSource.getRepository(Content)
    }

    @Get('/')
    public async index(): Promise<Content[]> {
        return await this.contentRepository.find({
            relations: {category: true}
        });
    }

    @Get('/:id')
    public async detail(@Param("id") id: number): Promise<Content> {
        return await CrudService.findOrNotFound(Content, {id});
    }

    @Post('/')
    public async create(@Body() requestBody: Content): Promise<SuccessResponse> {
        try {
            await this.contentRepository.save(requestBody)
            return new SuccessResponse('Content successfully added - #' + requestBody.id);
        } catch (err) {
            Logger.error('[CONTENT][ADD][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Put('/:id')
    public async update(@Param("id") id: number, @Body() requestBody: Content): Promise<SuccessResponse> {
        const content = await CrudService.findOrNotFound(Content, {id});
        try {
            await this.contentRepository.update(content.id, requestBody)
            return new SuccessResponse('Content successfully updated - #' + content.id);
        } catch (err) {
            Logger.error('[CONTENT][UPDATE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Delete('/:id')
    public async remove(@Param("id") id: number): Promise<SuccessResponse> {
        const content = await CrudService.findOrNotFound(Content, {id});
        try {
            await this.contentRepository.remove(content);
            return new SuccessResponse('CONTENT successfully deleted - #' + id);
        } catch (err) {
            Logger.error('[CONTENT][REMOVE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }
}