import { TimestreamQuery } from "@aws-sdk/client-timestream-query";
import { TimestreamWrite } from "@aws-sdk/client-timestream-write";

const timestreamQuery = new TimestreamQuery({});
const timestreamWrite = new TimestreamWrite({});

main();

async function main() {
	const result = await timestreamQuery.query({
		QueryString: `
			SELECT *
			FROM "play-amazon-timestream"."play-amazon-timestream"
			WHERE time > ago(30m)
		`,
	});

	console.log("ColumnInfo:", result.ColumnInfo);
	console.log("Rows:", JSON.stringify(result.Rows, null, 2));
}
