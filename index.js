const inquirer = require("inquirer");

const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const Manager = require("./lib/Manager.js")

const managerPrompts = [
    {
        type: "input",
        message: "What is your Team Manager's Name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is your Team Manager's Employee ID?",
        name: "managerID"
    },
    {
        type: "input",
        message: "What is your Team Manager's Email?",
        name: "managerEmail"
    },
    {
        type: "input",
        message: "What is your Team Manager's Office Number?",
        name: "managerOffice"
    }
];
const engineerPrompts = [
    {
        type: "input",
        message: "What is your Engineer's Name?",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is your Engineer's Employee ID?",
        name: "engineerID"
    },
    {
        type: "input",
        message: "What is your Engineer's Email?",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "What is your Engineer's Github Username?",
        name: "engineerGithub"
    }
];
const internPrompts = [
    {
        type: "input",
        message: "What is your Intern's Name?",
        name: "internName"
    },
    {
        type: "input",
        message: "What is your Intern's Employee ID?",
        name: "internID"
    },
    {
        type: "input",
        message: "What is your Intern's Email?",
        name: "internEmail"
    },
    {
        type: "input",
        message: "What is your Intern's School?",
        name: "internSchool"
    }
];
const checkPrompts = [
    {
        type: "list",
        message: "What Would you Like to Do?",
        choices: ["Add an Engineer", "Add an Intern", "Finish entering list"],
        name: "userChoice"
    }
]

async function questionLoop() {
    const team = [];
    team.push(await inquirer.prompt(managerPrompts)
        .then(function ({ managerName, managerID, managerEmail, managerOffice }) {
            return new Manager(managerName, managerID, managerEmail, managerOffice);
        }));
    while (true) {
        let userInput = await inquirer.prompt(checkPrompts)
            .then(function ({ userChoice }) {
                return userChoice;
            });
        if (userInput === "Add an Engineer") {
            team.push(await inquirer.prompt(engineerPrompts)
                .then(function ({ engineerName, engineerID, engineerEmail, engineerGithub }) {
                    return new Engineer(engineerName, engineerID, engineerEmail, engineerGithub);
                }));
        }
        else if (userInput === "Add an Intern") {
            team.push(await inquirer.prompt(internPrompts)
                .then(function ({ internName, internID, internEmail, internSchool }) {
                    return new Intern(internName, internID, internEmail, internSchool);
                }));
        }
        else{
            break;
        }
    }
    return team;
}

async function init() {
    let teamArray = await questionLoop();
    console.log(teamArray);
}

init();