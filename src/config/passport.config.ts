import JWTStrategy, { JwtFromRequestFunction, StrategyOptions } from "passport-jwt";
import LocalStrategy from "passport-local";
import passport from "passport";
import { compareSync } from "bcrypt";
import { jwtConfig } from "./jwt.config";

const { Usuario } = require("../models") as { Usuario: any };

export const passportConfig = passport;

const cookieExtractor: JwtFromRequestFunction = function (req) {
  if (req && req.signedCookies)
    return req.signedCookies["access_token"];
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
    async (
      email: string,
      password: string,
      done: (error: any, user?: any, options?: any) => void
    ) => {
      try {
        // Buscamos con scope explicito porque el hash no sale en consultas normales.
        const usuario = await Usuario.scope("conContrasena").findOne({
          where: { correo_electronico: email }
        });

        if (!usuario)
          return done(null, false, { message: "Credenciales invalidas" });

        const isValid = compareSync(password, usuario.get("contrasena_hash"));
        if (!isValid)
          return done(null, false, { message: "Credenciales invalidas" });

        const usuarioSeguro = await Usuario.findByPk(usuario.id);
        return done(null, usuarioSeguro);
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
        // El JWT solo guarda el id; el usuario real se vuelve a leer desde base.
        const usuario = await Usuario.findByPk(data.sub);

        if (!usuario)
          return done(null, false, { code: 404, message: "Usuario no encontrado" });

        return done(null, usuario);
      } catch (err) {
        return done(err);
      }
    }
  )
);
