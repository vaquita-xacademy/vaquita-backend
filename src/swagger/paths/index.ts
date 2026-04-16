import authPaths from "./auth";
import projectsPaths from "./projects";
import donationsPaths from "./donations";
import projectUpdatesPaths from "./project-updates";

export default {
    ...authPaths,
    ...projectsPaths,
    ...donationsPaths,
    ...projectUpdatesPaths,
}