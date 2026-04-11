import authPaths from "./auth";
import projectsPaths from "./projects";
import verifiedProfilesPaths from "./verified-profiles";
import organizationsPaths from "./organizations";
import donationsPaths from "./donations";

export default {
    ...authPaths,
    ...verifiedProfilesPaths,
    ...organizationsPaths,
    ...projectsPaths,
    ...donationsPaths,
}
