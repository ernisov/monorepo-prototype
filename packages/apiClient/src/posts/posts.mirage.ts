import { Model } from "miragejs";
import { ModelDefinition } from "miragejs/-types";
import { Post } from "./posts.types";
import createFactory from "../mirage/helpers/createFactory";
import {AppServer} from "../mirage";

export const models = {
    post: Model as ModelDefinition<Post>,
};

export const factories = {
    post: createFactory<Post>({
        userId(index: number) {
            return index;
        },
        body(index: number) {
            return `Post body: ${index}`;
        },
        title(index: number) {
            return `Post title: ${index}`;
        },
    }),
};

export function handlePostApi(server: AppServer) {
    server.get('/posts', (schema) => {
        return schema.all('post');
    });
}