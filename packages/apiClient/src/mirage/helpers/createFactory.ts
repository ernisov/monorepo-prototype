import { Factory } from 'miragejs';
import { Server } from 'miragejs/server';
import { ModelInstance, WithFactoryMethods } from 'miragejs/-types';

type WithFactoryHooks<Data> = WithFactoryMethods<Partial<Data>> & {
    afterCreate?: (obj: ModelInstance<Data>, server: Server) => void;
};

/**
 * Creates an instance of miragejs {@link Factory} with slightly extended type definition.
 *
 * **IMPORTANT:**
 *
 * We can't declare "server" as {@link AppServer} in type definition
 * because it could lead to circular reference.
 * Didn't dig into mirage's type definitions thoroughly
 * but I assume asserting it to {@link AppServer} is a good enough workaround
 * @example
 * createFactory({
 *     prop: value,
 *     afterCreate(obj, s) {
 *         const server = s as AppServer;
 *     }
 * })
 */
export default function createFactory<Data>(data: WithFactoryHooks<Data>) {
    return Factory.extend<Partial<Data>>(data);
}
