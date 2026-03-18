import {
    IsIn,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Min
} from "class-validator";
import { Type } from "class-transformer";

// Este DTO define el payload minimo para dar de alta un proyecto.
export class CreateProjectDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(180)
    titulo!: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    resumen?: string;

    @IsString()
    @IsNotEmpty()
    descripcion!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0.01)
    monto_objetivo!: number;

    @IsString()
    @IsOptional()
    @IsIn(["draft", "active", "paused", "completed", "cancelled"])
    estado?: string;

    @IsISO8601()
    @IsOptional()
    fecha_inicio?: string;

    @IsISO8601()
    @IsOptional()
    fecha_fin?: string;

    @IsUrl()
    @IsOptional()
    url_imagen_portada?: string;

}
