import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePagosDto } from './dtos';
import { PagosService } from './pagos.service';


@ApiTags('Pagos API')
@Controller('api')
export class PagosController {
  constructor(private readonly PagosService: PagosService) {}

  @Get('pagos')
  @HttpCode(200)
  getMany() {
    return this.PagosService.getMany();
  }

  @Post('pagos')
  @HttpCode(200)
  async createOne(@Body() dto: CreatePagosDto) {
      return await this.PagosService.createOne(dto);
  }
}
