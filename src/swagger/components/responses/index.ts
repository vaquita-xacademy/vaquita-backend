import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";
import donationsResponses from "./donations";

export default {
    ...authResponses,
    ...projectsResponses,
    ...errorResponses,
    ...donationsResponses
}