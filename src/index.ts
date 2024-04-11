import dotenv from "dotenv";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

dotenv.config();

async function main() {
    const evergreenQuote = process.env.EVERGREEN_QUOTE;
    if (!evergreenQuote) {
        throw new Error("Evergreen Quote is undefined!");
    }

    const port = process.env.PORT;
    if (!port) {
        throw new Error("Port is undefined!");
    }

    const quotableApiUrl = process.env.QUOTABLE_API_URL;
    if (!quotableApiUrl) {
        throw new Error("Url for Quotable API is undefined!");
    }

    const server = http.createServer(async (req, res) => {
        const quote = await (await fetch(`${quotableApiUrl}/random`)).json();

        const file = fs.readFileSync(path.resolve(__dirname, "../views/index.html"));
        const content = file.toString().replace("{{quote}}", quote?.content || evergreenQuote);

        res.writeHead(200);
        res.write(content);
        res.end();
    });

    server.listen(port, () => {
        console.log(`Server listening on port: ${port}`);
    });
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});

