import {DiskDb as NamedDiskDb} from "./DiskDb";
import {Table, Validate} from "./decorators/Models";
import {IModel as NamedIModel} from "./interfaces/IModel";

export namespace Workshop {
    export const DiskDb = NamedDiskDb;
    export const Models = {
        Table,
        Validate
    }

    export namespace Interfaces {
        export interface IModel extends NamedIModel {};
    }
}



