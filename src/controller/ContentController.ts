import {
    Authorized,
    Body,
    Delete,
    Get,
    InternalServerError,
    JsonController,
    Param,
    Post,
    Put
} from 'routing-controllers';
import {CrudService} from '../service/CrudService';
import Logger from '../library/LoggerLibrary';
import {SuccessResponse} from '../response/SuccessResponse';
import {Content} from '../entity/Content';
import {ContentRepository} from '../repository/ContentRepository';
import {ResponseInterface} from '../interfaces/ResponseInterface';

@JsonController('/content')
export class ContentController {
    @Get('/')
    public async index(): Promise<Content[]> {
        return await ContentRepository.find({
            relations: {category: true}
        });
    }

    @Get('/:id')
    public async detail(@Param('id') id: number): Promise<Content | null> {
        return CrudService.notFoundChecker(
            await ContentRepository.findOneByIdWithCategory(id)
        );
    }

    @Authorized()
    @Post('/')
    public async create(@Body() requestBody: Content): Promise<ResponseInterface> {
        try {
            await ContentRepository.save(requestBody)
            return new SuccessResponse('Content successfully added - #' + requestBody.id);
        } catch (err) {
            Logger.error('[CONTENT][ADD][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Authorized()
    @Put('/:id')
    public async update(@Param('id') id: number, @Body() requestBody: Content): Promise<ResponseInterface> {
        const content = await CrudService.findOrNotFound(Content, {id});
        try {
            await ContentRepository.update(content.id, requestBody)
            return new SuccessResponse('Content successfully updated - #' + content.id);
        } catch (err) {
            Logger.error('[CONTENT][UPDATE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }

    @Authorized()
    @Delete('/:id')
    public async remove(@Param('id') id: number): Promise<ResponseInterface> {
        const content = await CrudService.findOrNotFound(Content, {id});
        try {
            await ContentRepository.remove(content);
            return new SuccessResponse('CONTENT successfully deleted - #' + id);
        } catch (err) {
            Logger.error('[CONTENT][REMOVE][ERROR]', err);
            throw new InternalServerError('Operation failed')
        }
    }
}