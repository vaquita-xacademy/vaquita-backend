import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";
import donationsResponses from "./donations";
import projectUpdatesResponses from "./project-updates";

export default {
    ...authResponses,
    ...projectsResponses,
    ...donationsResponses,
    ...projectUpdatesResponses,
    ...errorResponses
}