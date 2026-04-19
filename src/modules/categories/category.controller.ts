import { User } from "../../db/models";
import { Request, Response } from "express";
import { errorResponse, success } from "../../helpers/responses";
import { CategoryService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { CategoryResource } from "./resource/category.resource";
import { IdParamDTO } from "../projects/dto/project-param.dto";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public create = async (request: Request, response: Response)=>{
        try {
            const user = request.user as User;
            const body = request.body as CreateCategoryDTO;
            const category = await this.categoryService.create(body);
            return success(
                response, { category: CategoryResource.toResponse(category) }, 201
            );
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    }

    public findAll = async (request: Request, response: Response)=>{
        try {
            const categories = await this.categoryService.findAll();
            return success(
                response, { categories: CategoryResource.toResponseList(categories) }, 200
            );
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    }

    public delete = async (request: Request, response: Response) => {
        try {
            const { id } = response.locals.params as IdParamDTO;
            await this.categoryService.delete(id);
            return success(response, { message: "Categoría eliminada exitosamente" }, 200);
        } catch (error: any) {
            const statusCode = error.statusCode ?? 500;
            return errorResponse(response, error.message, statusCode);
        }
    }

}