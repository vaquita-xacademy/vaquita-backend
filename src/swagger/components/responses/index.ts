import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";
import projectUpdatesResponses from "./project-updates";
import categoriesResponses from "./categories";
import donations from "./donations";

export default {
    ...authResponses,
    ...projectsResponses,
    ...projectUpdatesResponses,
    ...errorResponses,
    ...categoriesResponses,
    ...donations,
}