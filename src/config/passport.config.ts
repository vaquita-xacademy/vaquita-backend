import JWTStrategy, { JwtFromRequestFunction, StrategyOptions } from "passport-jwt";
import LocalStrategy from "passport-local";
import passport from "passport";
import { compareSync } from "bcrypt";
import { jwtConfig } from "./jwt.config";
import { User } from "../db/models";

export const passportConfig = passport;

const cookieExtractor: JwtFromRequestFunction = function (req) {
    if (req && req.signedCookies)
        return req.signedCookies['access_token'];
    return null;
};

const jwtOptions: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtConfig.access_secret
};

passportConfig.use(
    new LocalStrategy.Strategy(
        {
            usernameField: "email",
            passwordField: "password",
            session: false
        },
        async (email: string, password: string, done) => {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user)
                    return done(null, false, { message: "Credenciales inválidas" });

                const isValid = compareSync(password, user.toJSON().password);
                if (!isValid)
                    return done(null, false, { message: "Credenciales inválidas" });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passportConfig.use(
    new JWTStrategy.Strategy(
        jwtOptions,
        async (jwt_payload, done: JWTStrategy.VerifiedCallback) => {
            try {
                const { data } = jwt_payload;
                const user = await User.findByPk(data.sub);
                
                if (!user)
                    return done(null, false, { code: 404, message: "Usuario no encontrado" });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);