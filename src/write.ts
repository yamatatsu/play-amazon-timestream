import { TimestreamQuery } from "@aws-sdk/client-timestream-query";
import { TimestreamWrite } from "@aws-sdk/client-timestream-write";

const timestreamQuery = new TimestreamQuery({});
const timestreamWrite = new TimestreamWrite({});

main();

async function main() {
	const date = new Date();

	await timestreamWrite.writeRecords({
		DatabaseName: "play-amazon-timestream",
		TableName: "play-amazon-timestream",
		CommonAttributes: {
			MeasureName: "device-data",
			MeasureValueType: "MULTI",
		},
		Records: [...Array(5).keys()].flatMap((i) => {
			const _date = new Date(date);
			_date.setMinutes(_date.getMinutes() - i);

			return [
				["001", "001"],
				["001", "002"],
				["001", "003"],
				["002", "001"],
				["002", "002"],
				["002", "003"],
				["003", "001"],
				["003", "002"],
				["003", "003"],
			].map(([gateway, device]) => ({
				Time: _date.getTime().toString(),
				Dimensions: [
					{ Name: "gateway", Value: gateway },
					{ Name: "device", Value: device },
				],
				MeasureValues: [
					{
						Name: "temperature",
						Value: randomNumber(-5, 35, 1),
						Type: "DOUBLE",
					},
					{ Name: "humidity", Value: randomNumber(30, 80, 0), Type: "DOUBLE" },
				],
			}));
		}),
	});
}

function randomNumber(min: number, max: number, digits: number): string {
	return (Math.random() * (max - min) + min).toFixed(digits);
}
