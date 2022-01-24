const Employee = require("./Employee.js");

class Engineer extends Employee{
    constructor(name, id, email, githubUsername){
        super(name,id,email);
        this.github = githubUsername;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;