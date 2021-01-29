import { Test, TestingModule } from '@nestjs/testing';
import { CatexampleService } from './catexample.service';

describe('CatexampleService', () => {
  let service: CatexampleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatexampleService],
    }).compile();

    service = module.get<CatexampleService>(CatexampleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
