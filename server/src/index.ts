import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import routes from "./routes/index";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0"
		},
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
		components: {
			schemas: {
				Book: {
					type: "object",
					properties: {
						title: {
							type: "string"
						},
						author: {
							type: "string"
						},
						ISBN: {
							type: "integer"
						}
					}
				}
			}
		}
	},
	apis: ["./src/routes/*.ts"]
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const swaggerSpec = swaggerJSDoc(options);

const port = 4000;

app.use("/", routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

export { app, server };
