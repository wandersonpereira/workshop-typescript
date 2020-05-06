import { AbstractModel } from "./AbstractModel";
import { IModel } from "./interfaces/IModel";

const db = require('diskdb'); 

export class DiskDb <T extends IModel> extends AbstractModel {
    public connect (): void {
        db.connect("./data/db/workshop");
    }
    
    public async delete(item: T): Promise<T> {
        const table: string = item.getTable();
        db.loadCollections([table]);
        return await db[table].remove(item);
    }

    public async get(where: any): Promise<T> {
        const table: string = where.getTable();
        db.loadCollections([table]);
        return await db[table].findOne(where.getData());
    }

    public async insert(item: T): Promise<T> {
        const table: string = item.getTable();
        db.loadCollections([table]);
        return await db[table].save(item.getData());
    }

    public async update(item: T, where: any): Promise<T> {
        const table: string = item.getTable();
        db.loadCollections([table]);
        return await db[table].update(where, item.getData());
    }
}



