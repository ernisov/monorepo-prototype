import { createServer } from 'miragejs';
import factories from './factories';
import models from './models';
import serializers from './serializers';
import {handlePostApi} from "../posts/posts.mirage";

export type RouteHandlerContext = {
    serialize: (resource: any, serializer?: keyof typeof serializers) => any;
};

export type AppServer = ReturnType<typeof makeServer>;

type MakeServerParams = { environment: string };
export default function makeServer({ environment = 'test' }: MakeServerParams) {
    return createServer<typeof models, typeof factories>({
        environment,
        factories,
        serializers,
        models,
        routes() {
            this.urlPrefix = 'https://jsonplaceholder.typicode.com';
            handlePostApi(this);
        }
    });
}