const inquirer = require("inquirer");

const Employee = require("./lib/Employee.js");
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const Manager = require("./lib/Manager.js")

const managerPrompts = [
    {
        type: "input",
        message: "What is your Team Manager's Name?",
        name: "managerName",
        validate: (input) => !input.trim().length ? "Please Enter a non-empty String." : true
    },
    {
        type: "input",
        message: "What is your Team Manager's Employee ID?",
        name: "managerID",
        validate: (input) => parseInt(input)<=0 || !parseInt(input)  ? "Please Enter a positive number." : true
    },
    {
        type: "input",
        message: "What is your Team Manager's Email?",
        name: "managerEmail",
        validate: (input) => !input.match(/[\w]+@[\w]+\.[\w]+/) ? "Please Enter a valid email format." : true
    },
    {
        type: "input",
        message: "What is your Team Manager's Office Number?",
        name: "managerOffice",
        validate: (input) => parseInt(input)<=0 || !parseInt(input)  ? "Please Enter a positive number." : true
    }
];
const engineerPrompts = [
    {
        type: "input",
        message: "What is your Engineer's Name?",
        name: "engineerName",
        validate: (input) => !input.trim().length ? "Please Enter a non-empty String." : true
    },
    {
        type: "input",
        message: "What is your Engineer's Employee ID?",
        name: "engineerID",
        validate: (input) => parseInt(input)<=0 || !parseInt(input)  ? "Please Enter a positive number." : true
    },
    {
        type: "input",
        message: "What is your Engineer's Email?",
        name: "engineerEmail",
        validate: (input) => !input.match(/[\w]+@[\w]+\.[\w]+/) ? "Please Enter a valid email format." : true
    },
    {
        type: "input",
        message: "What is your Engineer's Github Username?",
        name: "engineerGithub",
        validate: (input) => !input.trim().length ? "Please Enter a non-empty String." : true
    }
];
const internPrompts = [
    {
        type: "input",
        message: "What is your Intern's Name?",
        name: "internName",
        validate: (input) => !input.trim().length ? "Please Enter a non-empty String." : true
    },
    {
        type: "input",
        message: "What is your Intern's Employee ID?",
        name: "internID",
        validate: (input) => parseInt(input)<=0 || !parseInt(input)  ? "Please Enter a positive number." : true
    },
    {
        type: "input",
        message: "What is your Intern's Email?",
        name: "internEmail",
        validate: (input) => !input.match(/[\w]+@[\w]+\.[\w]+/) ? "Please Enter a valid email format." : true
    },
    {
        type: "input",
        message: "What is your Intern's School?",
        name: "internSchool",
        validate: (input) => !input.trim().length ? "Please Enter a non-empty String." : true
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
            return new Manager(managerName, parseInt(managerID), managerEmail, parseInt(managerOffice));
        }));
    while (true) {
        let userInput = await inquirer.prompt(checkPrompts)
            .then(function ({ userChoice }) {
                return userChoice;
            });
        if (userInput === "Add an Engineer") {
            team.push(await inquirer.prompt(engineerPrompts)
                .then(function ({ engineerName, engineerID, engineerEmail, engineerGithub }) {
                    return new Engineer(engineerName, parseInt(engineerID), engineerEmail, engineerGithub);
                }));
        }
        else if (userInput === "Add an Intern") {
            team.push(await inquirer.prompt(internPrompts)
                .then(function ({ internName, internID, internEmail, internSchool }) {
                    return new Intern(internName, parseInt(internID), internEmail, internSchool);
                }));
        }
        else{
            break;
        }
    }
    return team;
}

function writeToFile(fileName, data) {
    fs.writeFile('./dist/' + fileName, data, (err) =>
                err ? console.error(err) : console.log('Success!')
            );
}

async function init() {
    let teamArray = await questionLoop();
    console.log(teamArray);
}

init();