import { db } from "./db";

export interface QuotationService {
    getQuotation(): Promise<string>;
}

export class QuotableQuotationService implements QuotationService {
    private defaultQuote: string;
    private url: string;

    constructor(url: string, defaultQuote: string) {
        this.defaultQuote = defaultQuote;
        this.url = url;
    }

    async getQuotation(): Promise<string> {
        const queryResult = await db.queryBuilder()
            .select("text")
            .from("quotation")
            .orderBy("created_at", "desc")
            .limit(1);

        if (queryResult.length !== 0) {
            return queryResult[0].text;
        }

        const response = await fetch(`${this.url}/random`);
        const body = await response.json();
        const newQuote = body.content || "";

        await db.insert({ text: newQuote }, "id").into("quotation");

        return newQuote || this.defaultQuote;
    }
}