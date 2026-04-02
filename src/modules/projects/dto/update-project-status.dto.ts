import { IsEnum, IsNotEmpty } from "class-validator";
import { ProjectStatus } from "../../../types/enums";
import { errorMessage } from "../../../helpers/messages";

export class UpdateProjectStatusDTO {
    @IsNotEmpty({ message: errorMessage.required })
    @IsEnum(ProjectStatus, { message: errorMessage.isEnum(Object.values(ProjectStatus)) })
    status!: ProjectStatus;
}
