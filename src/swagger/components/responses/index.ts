import authResponses from "./auth";
import errorResponses from "./error";
import projectsResponses from "./projects";
import verifiedProfilesResponses from "./verified-profiles";
import organizationsResponses from "./organizations";
import donationsResponses from "./donations";

export default {
    ...authResponses,
    ...projectsResponses,
    ...verifiedProfilesResponses,
    ...organizationsResponses,
    ...donationsResponses,
    ...errorResponses,
}
