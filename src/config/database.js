require("dotenv").config();

const sharedConfig = {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  logging: false,
  define: {
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
};

const productionConfig = {
  ...sharedConfig,
  database: process.env.DB_NAME || "vaquita_db",
};

if (process.env.DATABASE_URL) {
  productionConfig.use_env_variable = "DATABASE_URL";
}

if (process.env.DB_SSL === "true") {
  productionConfig.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

module.exports = {
  development: {
    ...sharedConfig,
    database: process.env.DB_NAME || "vaquita_db",
  },
  test: {
    ...sharedConfig,
    database: process.env.DB_TEST_NAME || "vaquita_db_test",
  },
  production: productionConfig,
};
