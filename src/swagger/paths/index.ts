import authPaths from "./auth";
import projectsPaths from "./projects";
import donationsPaths from "./donations";

export default {
    ...authPaths,
    ...projectsPaths,
    ...donationsPaths
}