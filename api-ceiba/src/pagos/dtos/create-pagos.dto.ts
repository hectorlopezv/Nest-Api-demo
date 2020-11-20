import {
  IsAlphanumeric,
  IsInt,
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer/decorators';

export class CreatePagosDto {
  @ApiProperty()
  @IsNumberString()
  documentoIdentificacionArrendatario!: number;

  @ApiProperty()
  @IsAlphanumeric()
  codigoInmueble!: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Max(1000000)
  valorPagado!: number;

  @ApiProperty()
  @IsString()
  fechaPago!: string;
}
