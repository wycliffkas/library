import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: process.env.DB_PATH,
  logging: false,
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

export { sequelize };
