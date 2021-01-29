import { Module } from '@nestjs/common';
import { CatexampleController } from './catexample.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatexampleService } from './catexample.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [CatexampleController],
  providers: [CatexampleService],
})
export class CatexampleModule {}
