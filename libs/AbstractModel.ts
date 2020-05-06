export abstract class AbstractModel {
    abstract async delete(where: any): Promise<any>;
    abstract async insert(item: any): Promise<any>;
    abstract async get(where: any): Promise<any>;
    abstract async update(item: any, where: any): Promise<any>;

    protected convertToJson(objectItem: object = {}): string {
        return JSON.stringify(objectItem);
    }

    protected convertToObject(json: string = "{}"): object {
        return JSON.parse(json);
    }

    public formatResponse<T>(c: (new (...args: any[]) => T), ...args: any[]): T {
        return new c(...args);
    }
}

