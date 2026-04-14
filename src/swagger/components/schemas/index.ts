import errorSchema from "./error";
import commonSchema from "./common";
import authSchema from "./auth";
import projectsSchema from "./projects";
import paginateSchema from "./paginate";
import donationsSchema from "./donations";

export default {
    ...errorSchema,
    ...commonSchema,
    ...authSchema,
    ...projectsSchema,
    ...paginateSchema,
    ...donationsSchema
}