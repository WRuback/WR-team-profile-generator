const Employee = require("./Employee.js");

class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name,id,email);
        if(typeof officeNumber !== "number" || officeNumber<=0 || !officeNumber){
            throw new Error("Expected parameter 'officeNumber' to be a positive number");
        }
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;