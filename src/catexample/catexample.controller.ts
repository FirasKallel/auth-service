import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { ApiTags } from '@nestjs/swagger';
import { CatexampleService } from './catexample.service';

@ApiTags('cats')
@Controller('catexample')
export class CatexampleController {
  constructor(private catExampleService: CatexampleService) {}
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    const newcat = this.catExampleService.create(createCatDto);
    return 'ok';
  }
}
