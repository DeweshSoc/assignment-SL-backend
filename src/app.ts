import * as path from "path";

import "dotenv/config";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";
import express from "express";

import routes from "./routes";
import type { ErrorResponse } from "./interfaces";
import connectToDB from "./connection";

const app = express();

// cors
app.use(cors());

// configurations
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));

// handle requests
app.use("/", routes);

app.use("/", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(
        `BAD REQUEST : invalid endpoint url => ${req.method} - ${req.url}`
    ) as ErrorResponse;
    err.status = 400;
    next(err);
});

// Error Handling
app.use(
    (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
        console.log(
            `\x1b[41m\x1b[1m\x1b[97m `,
            req.body,
            err.message,
            `\x1b[0m`
        );
        console.log(err);
        err.message = err.status ? err.message : "Some server error occured.";
        res.status(err.status || 500).json({
            error: {
                status: err.status,
                message: err.message,
            },
        });
    }
);

// connect to DB and spin server

const startServer = async () => {
    try {
        await connectToDB();
        let port = process.env.PORT || "5000";
        app.listen(port, () => {
            console.log(`Server up at ${port}`);
        });
    } catch (err) {
        console.error("SERVER => error occured", err);
    }
};

startServer();
