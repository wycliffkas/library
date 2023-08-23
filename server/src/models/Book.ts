import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

interface BookAttributes {
	title: string;
	author: string;
	ISBN: string;
}

class Book extends Model<BookAttributes> implements BookAttributes {
	public title!: string;
	public author!: string;
	public ISBN!: string;
}

Book.init(
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		ISBN: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true
		}
	},
	{
		sequelize,
		tableName: "books"
	}
);

(async () => {
	try {
		await sequelize.sync();
	} catch (error) {
		console.error("Error syncing the database:", error);
	}
})();

export default Book;
