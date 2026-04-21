import errorSchema from "./error";
import commonSchema from "./common";
import authSchema from "./auth";
import projectsSchema from "./projects";
import paginateSchema from "./paginate";
import projectUpdatesSchema from "./project-updates";
import categories from "./categories";
import donations from "./donations";


export default {
    ...errorSchema,
    ...commonSchema,
    ...authSchema,
    ...projectsSchema,
    ...paginateSchema,
    ...projectUpdatesSchema,
    ...categories,
    ...donations,
}