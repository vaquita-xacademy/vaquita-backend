import { Category } from "../../../db/models";

export class CategoryResource {
    public static toResponse(category: Category) {
        return {
            id: category.id,
            name: category.name,
        };
    }

    public static toResponseList(categories: Category[]) {
        return categories.map((category) => this.toResponse(category));
    }
}
