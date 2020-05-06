/**
 * All types of variables
 */
let isDone: boolean = false;                // Boolean
let decimal: number = 6;                    // Number
let color: string = "blue";                 // String
let list: number[] = [1, 2, 3];             // Array
let x: [string, number] = ["hello", 10];    // Tuple
enum Color {Red, Green, Blue}               // Enum
let notSure: any = 4;                       // Any
let customer: object = {
    fullName: "Wanderson Pereira",
    pid: "RCHLO20200614"        
}                                           // Object


/**
 * Example of types in variables
 */
//Simple variables
var customers = [{
    fullName: "Wanderson Pereira",
    pid: "RCHLO20200614",
}];

var fullName = customers[0].fullName;
var pid = customers[0].pid;

//Use type of 'any' in variables
var customers1: any[] = [{
    fullName: "Wanderson Pereira",
    pid: "RCHLO20200614"
}];

var fullName1: string = customers1[0].fullName;
var pid1: string = customers1[0].pid;

//Use complexed types of variables
const customers2: {fullName: string, pid: string}[] = [{
    fullName: "Wanderson Pereira",
    pid: "RCHLO20200614"
}];

const fullName2: string = customers2[0].fullName;
const pid2: string = customers2[0].pid;

//Consumer the simple variables
customers.forEach(function (customer) {
    const fullName = customer.fullName;
    const pid = customer.pid;
});

//Consumer the complexed variables
customers2.forEach( (customer: {fullName: string, pid: string}) => {
    const fullName: string = customer.fullName;
    const pid: string = customer.pid;
});
/***
 * End example of types in variables
 */














function filterCustomerByPID( customers, pid ) {
    return (customers || []).filter( function (customer) {
        return customer.pid === pid;
    });
}

function filterCustomerByPID2( customers: {fullName: string, pid: string}[] = [], pid: string = "" ): {fullName: string, pid: string}[]  {
    return customers.filter( (customer: {fullName: string, pid: string}) => customer.pid === pid);
}



function error(message: string): never {
    throw new Error(message);
}

function success(message: string): void {
    console.log(message);
}

function getFirstName({fullName}): string {
    const [firstName = ""] = fullName.split(" ");
    return firstName;
}

const firstNameOfCustomer: string = getFirstName(customers2[0]);
if (firstNameOfCustomer === "") {
    error("This customer don't have name.");
} else {
    success("Customer loaded with success.");
}