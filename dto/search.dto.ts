import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  q!: string;

  @ApiPropertyOptional({ type: Number, default: 1 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional({ type: Number, default: 30 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit = 30;
}
