import {
    IsIn,
    IsISO8601,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Min
} from "class-validator";
import { Type } from "class-transformer";

// El update permite modificar solo los campos enviados por el cliente.
export class UpdateProjectDto {

    @IsString()
    @IsOptional()
    @MaxLength(180)
    titulo?: string;

    @IsString()
    @IsOptional()
    @MaxLength(300)
    resumen?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0.01)
    @IsOptional()
    monto_objetivo?: number;

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
