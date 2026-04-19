import authPaths from "./auth";
import projectsPaths from "./projects";
import projectUpdatesPaths from "./project-updates";
import categories from "./categories";

export default {
    ...authPaths,
    ...projectsPaths,
    ...projectUpdatesPaths,
    ...categories,
}