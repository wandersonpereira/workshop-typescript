import { Workshop }  from "./libs/Workshop";
import {ICustomer} from "./interfaces/ICostumer";
import {Customer} from "./models/Customer";

const CostomerWanderson: ICustomer = {
    name: "Wanderson",
    lastName: "Pereira",
    pid: "RCHLO_112233",
    isActive: true,
    dob: "14/06/1990",
}

const customer: any = new Customer(CostomerWanderson);
const db: any = new Workshop.DiskDb();

db.connect();
db.insert(customer);
db.get(customer).then((rs: any) => {
    const c2 = db.formatResponse(Customer, rs);
});




