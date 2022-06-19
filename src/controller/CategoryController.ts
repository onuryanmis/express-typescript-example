import {Controller, Delete, Get, Param, Post, Put} from 'routing-controllers';

@Controller("/category")
export class CategoryController {
    @Get('/')
    public index(): string {
        return "";
    }

    @Get('/:id')
    public detail(@Param("id") id: number): string {
        return "";
    }

    @Post('/')
    public create(): string {
        return "";
    }

    @Put('/:id')
    public update(@Param("id") id: number): string {
        return "";
    }

    @Delete('/:id')
    public remove(@Param("id") id: number): string {
        return "";
    }
}