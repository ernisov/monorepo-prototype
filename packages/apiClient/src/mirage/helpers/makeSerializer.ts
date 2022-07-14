import {Serializer} from "miragejs";
import {SerializerInterface} from "miragejs/serializer";

const shouldConvert = (key: string, value: any) => {
    return key === 'id' && typeof value === 'string';
};

const mapData = (data: any): any => {
    if (Array.isArray(data)) {
        return data.map((item) => mapData(item));
    }

    if (typeof data === 'object' && data !== null) {
        return Object.entries(data).reduce((acc, [key, value]) => {
            const newValue = shouldConvert(key, value) ? Number(value) : mapData(value);
            return {
                ...acc,
                [key]: newValue,
            };
        }, {});
    }

    return data;
};

export default function makeSerializer<T>(include: Array<keyof T>) {
    return Serializer.extend({
        include,
        embed: true,
        root: false,
        serialize(primaryResource: any, request: any): any {
            const json = (Serializer.prototype as SerializerInterface).serialize?.apply(this, [
                primaryResource,
                request,
            ]);

            return mapData(json);
        },
        keyForEmbeddedRelationship(attributeName: string) {
            return attributeName;
        },
    });
};