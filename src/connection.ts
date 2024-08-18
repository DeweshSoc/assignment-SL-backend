import mongoose from "mongoose";

const userName = process.env.MONGODB_USERNAME || null;
const password = process.env.MONGODB_PASSWORD
    ? encodeURIComponent(process.env.MONGODB_PASSWORD)
    : null;
const authCredentials = userName && password ? `${userName}:${password}` : null;
const domainName = process.env.MONGODB_DOMAIN || null;
const hostName = process.env.MONGODB_HOSTNAME || null;
const tld = process.env.MONGODB_TLD || null;

async function connectToDB() {
    try {
        if (!authCredentials || !domainName || !hostName || !tld) {
            throw new Error(
                "Missing environment variables. Check environment variables"
            );
        }
        const uri = `mongodb+srv://${authCredentials}@${hostName}.${domainName}.${tld}/?retryWrites=true&w=majority&appName=skai-lama-assignment-be`;
        await mongoose.connect(uri, {
            dbName: "skailamaDB",
        });
        console.log("Connected to DB");

        // error after connection established
        mongoose.connection.on("error", (err) => {
            console.error(`MONGOOSE => error : ${err}`);
        });

        return mongoose.connection;
    } catch (err) {
        // error during initial connection setup
        console.error(
            `MONGOOSE => connection could not be established. More details: ${err}`
        );
        throw err;
    }
}

export default connectToDB;
