import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";

export default {
    ...authResponses,
    ...projectsResponses,
    ...errorResponses
}