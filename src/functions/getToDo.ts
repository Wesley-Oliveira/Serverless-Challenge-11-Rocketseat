import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

require('dotenv').config();

export const handle: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const response = await document.query({
        TableName: "todos_user",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    }).promise();

    const userToDos = response.Items;

    return {
        statusCode: 200,
        body: JSON.stringify({
            userToDos
        }),
    };
}