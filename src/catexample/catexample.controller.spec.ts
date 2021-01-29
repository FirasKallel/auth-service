import { Test, TestingModule } from '@nestjs/testing';
import { CatexampleController } from './catexample.controller';

describe('CatexampleController', () => {
  let controller: CatexampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatexampleController],
    }).compile();

    controller = module.get<CatexampleController>(CatexampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
