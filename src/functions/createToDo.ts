import chromium from "chrome-aws-lambda";
import path from "path";
import dayjs from "dayjs";
import { document } from "../utils/dynamodbClient";

require('dotenv').config();


interface ICreateToDo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: Date;
}

export const handle = async (event) => {
    const { id, user_id, title, done, deadline } = JSON.parse(event.body) as ICreateToDo;

    await document.put({
        TableName: "todos_user",
        Item: {
            id,
            user_id,
            title,
            done,
            deadline: new Date(deadline)
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "To Do created!",
            todo: {
                id,
                user_id,
                title,
                done,
                deadline
            }
        }),
        headers: {
            "Content-type": "application/json"
        },
    };
};