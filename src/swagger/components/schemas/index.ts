import errorSchema from "./error";
import commonSchema from "./common";
import authSchema from "./auth";

export default {
    ...errorSchema,
    ...commonSchema,
    ...authSchema,
}