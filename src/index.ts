import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { QuotableQuotationService, QuotationService } from "./quotation.service";

async function main() {
    const port = process.env.PORT || 3000;
    if (!port) {
        throw new Error("Port is undefined!");
    }

    const quotableApiUrl = process.env.QUOTABLE_API_URL;
    if (!quotableApiUrl) {
        throw new Error("Url for Quotable API is undefined!");
    }

    const quotationService: QuotationService = new QuotableQuotationService(quotableApiUrl);

    const server = http.createServer(async (req, res) => {
        const quote = await quotationService.getQuotation();

        const file = fs.readFileSync(path.resolve(__dirname, "../views/index.html"));
        const content = file.toString().replace("{{quote}}", quote).replace("{{port}}", port as string);

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

