const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const Manager = require("./lib/Manager.js")

const Engine = new Engineer("Bob",1,"a@a.com","WRuback");
console.log(Engine.getGithub());
console.log(Engine.getRole());
console.log(Engine.getName());

const Interior = new Intern("Jim",2,"a@a.com","UCF");
console.log(Interior.getSchool());
console.log(Interior.getRole());
console.log(Interior.getName());

const Mana = new Manager("Hank",3,"a@a.com",20);
console.log(Mana.getOfficeNumber());
console.log(Mana.getRole());
console.log(Mana.getName());

const {_name, _id, _email, ...args} = Mana;
console.log(Mana instanceof Employee);
console.log(Mana instanceof Engineer);
console.log(Mana instanceof Intern);
console.log(Mana instanceof Manager);