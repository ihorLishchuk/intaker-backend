import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import {Type} from "class-transformer";

export class ForecastQueryDto {
  @IsString()
  city!: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  cnt!: number;
}
