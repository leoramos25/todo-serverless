import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
    const { id } = event.pathParameters;

    const todos = await document.scan({
        TableName: "todos",
        FilterExpression: "user_id = :id",
        ExpressionAttributeValues: { ":id": id }
    }).promise();

    if (todos) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                todos,
            })
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "user not found"
        })
    }
}