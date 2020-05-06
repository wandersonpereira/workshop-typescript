import { ICustomer } from "../interfaces/ICostumer";
import { Workshop } from "../libs/Workshop";

@Workshop.Models.Table
export class Customer {
    @Workshop.Models.Validate(true)
    public name: string;

    @Workshop.Models.Validate(true)
    public lastName: string;

    @Workshop.Models.Validate(true)
    public pid: string;

    @Workshop.Models.Validate(true)
    public isActive: boolean;

    public dob: string;

    constructor(customer: ICustomer) {
        this.name = customer.name;
        this.lastName = customer.lastName;
        this.pid = customer.pid;
        this.isActive = customer.isActive;
        this.dob = customer.dob;
    }

    public getData(): ICustomer {
        return {
            name: this.name,
            lastName: this.lastName,
            pid: this.pid,
            isActive: this.isActive,
            dob: this.dob,
        }
    }
} 



