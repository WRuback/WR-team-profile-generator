class Employee {
    constructor(name, id, email){
        if(typeof name !== "string" || !name.trim().length){
            throw new Error("Expected parameter 'name' to be a non-empty string");
        }
        if(typeof id !== "number" || id<=0 || !id){
            throw new Error("Expected parameter 'id' to be a positive number");
        }
        if(typeof email !== "string" || !email.match(/[\w]+@[\w]+\.[\w]+/)){
            throw new Error("Expected parameter 'Email' to be formated 'email213@email.com");
        }
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getId(){
        return this.id;
    }
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
}

module.exports = Employee;