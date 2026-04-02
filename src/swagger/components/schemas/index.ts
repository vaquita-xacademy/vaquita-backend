import errorSchema from "./error";
import commonSchema from "./common";
import authSchema from "./auth";
import projectsSchema from "./projects";
import paginateSchema from "./paginate";
import verifiedProfilesSchema from "./verified-profiles";
import organizationsSchema from "./organizations";
import donationsSchema from "./donations";

export default {
    ...errorSchema,
    ...commonSchema,
    ...authSchema,
    ...projectsSchema,
    ...paginateSchema,
    ...verifiedProfilesSchema,
    ...organizationsSchema,
    ...donationsSchema,
}
