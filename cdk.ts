import * as cdk from "aws-cdk-lib";
import * as timestream from "aws-cdk-lib/aws-timestream";

const app = new cdk.App();
const stack = new cdk.Stack(app, "play-amazon-timestream");

const database = new timestream.CfnDatabase(stack, "Database", {
	databaseName: "play-amazon-timestream",
});
new timestream.CfnTable(stack, "Table", {
	databaseName: database.ref,
	tableName: "play-amazon-timestream",
	retentionProperties: {
		memoryStoreRetentionPeriodInHours: 1,
		magneticStoreRetentionPeriodInDays: 1,
	},
	magneticStoreWriteProperties: {
		enableMagneticStoreWrites: false,
	},
});
