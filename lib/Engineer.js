const Employee = require("./Employee.js");

class Engineer extends Employee{
    constructor(name, id, email, githubUsername){
        super(name,id,email);
        if(typeof githubUsername !== "string" || !githubUsername.trim().length){
            throw new Error("Expected parameter 'githubUsername' to be a non-empty string");
        }
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