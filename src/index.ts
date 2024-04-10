import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { dir } from "node:console";

const PORT = 9001;

const server = http.createServer((req, res) => {
    const rs = fs.createReadStream(path.resolve(__dirname, "views/index.html"));

    rs.on("close", () => {
        res.end();
    });

    rs.pipe(res);
});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});