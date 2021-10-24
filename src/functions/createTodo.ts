import { document } from "../utils/dynamodbClient";

import { v4 as uuidv4 } from "uuid";
import * as dayjs from "dayjs";
import { APIGatewayProxyHandler } from "aws-lambda";

interface ICreateTodo {
    id: string;
    title: string;
    deadline: string;
}

export const handle: APIGatewayProxyHandler = async (event) => {
    const { id, title, deadline } = JSON.parse(event.body) as ICreateTodo;

    await document.put({
        TableName: "todos",
        Item: {
            id: uuidv4(),
            user_id: id,
            title,
            done: false,
            deadline: dayjs(deadline).format("DD/MM/YYYY")
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Todo created",
        }),
        header: {
            "Content-Type": "application/json"
        }
    }
}