import authPaths from "./auth";
import projectsPaths from "./projects";
import projectUpdatesPaths from "./project-updates";

export default {
    ...authPaths,
    ...projectsPaths,
    ...projectUpdatesPaths,
}