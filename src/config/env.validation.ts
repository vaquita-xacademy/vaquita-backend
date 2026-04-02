const REQUIRED_ENV_VARS = [
    "DB_HOST",
    "DB_NAME",
    "DB_USERNAME",
    "DB_PASSWORD",
    "JWT_SECRET",
    "COOKIE_SECRET",
] as const;

export function validateEnv(): void {
    const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error("Faltan variables de entorno requeridas:");
        missing.forEach((key) => console.error(`  - ${key}`));
        console.error("Revisa tu archivo .env y vuelve a iniciar el servidor.");
        process.exit(1);
    }
}
