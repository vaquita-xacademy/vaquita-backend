import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";
import projectUpdatesResponses from "./project-updates";

export default {
    ...authResponses,
    ...projectsResponses,
    ...projectUpdatesResponses,
    ...errorResponses
}