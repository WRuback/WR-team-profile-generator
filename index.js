// Used to prompt User.
const inquirer = require("inquirer");
// Used to Write Files.
const fs = require("fs");

// These classes are built to store Employee information of various types.
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const Manager = require("./lib/Manager.js");

// Questions to get information to build an Employee of all 3 types.
// Has validation to make sure all information is correctly formatted.
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
// Prompts users on whether they want to finish there section, or add a new type of employee.
const checkPrompts = [
    {
        type: "list",
        message: "What Would you Like to Do?",
        choices: ["Add an Engineer", "Add an Intern", "Finish and generate HTML"],
        name: "userChoice"
    }
]

// Asks the manager questions, makes a manager object and 
// put it in the output array, then goes into a loop.
// Starts with the check prompts, and then checks the answer.
// Either builds an Engineer or Intern (putting them in an array), or ends the loop.
// At the end of the loop, return the output array.
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

// Creates a new file with the added data.
function writeToFile(fileName, data) {
    fs.writeFile('./dist/' + fileName, data, (err) =>
                err ? console.error(err) : console.log('Success! Your file is written.')
            );
}

// Creates the html file based on the team array.
// It adds the title to the html header.
// It looks at each class in the teamArray, and runs the related card builder.
// Stores the built cards in an array from aa map function.
// In the card location, they array is joined with breaks inbetween.
function buildHTML(title, teamArray) {
    let teamBoxes = teamArray.map(function(element) {
        if(element instanceof Manager){
            return buildManager(element);
        }
        else if (element instanceof Engineer){
            return buildEngineer(element);
        }
        else if (element instanceof Intern){
            return buildIntern(element);
        }
    });
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <link rel="stylesheet" href="./assets/css/style.css" />
        <script src="https://kit.fontawesome.com/48b5c6d0f7.js" crossorigin="anonymous"></script>
        <title>Team Profile - ${title}</title>
    </head>
    
    <body>
        <section class="hero is-danger is-fullheight">
            <div class="hero-head has-background-info">
                <p class="level-item has-text-centered title has-text-light p-5">${title} - Team Profile</p>
            </div>
            <div class="hero-body is-justify-content-center">
                <div class="container columns is-multiline is-centered">
                    ${teamBoxes.join("\n")}
                </div>
            </div>
        </section>
        <script src="https://use.fontawesome.com/a613337919.js"></script>
    </body>
    
    </html>`
}

// Builds a Manager card, using information from a manager object.
function buildManager(manager){
    return `<div class="column is-one-third">
    <div class="panel is-info">
        <p class="panel-heading">
            ${manager.getName()} - Manager <i class="fas fa-user-tie"></i>
        </p>
        <div class="panel-block has-background-white">
            <p>ID: ${manager.getId()}</p>
        </div>
        <div class="panel-block has-background-white">
            <p>Email: <a href="mailto: ${manager.getEmail()}" class="has-text-link">${manager.getEmail()}</a></p>
        </div>
        <div class="panel-block has-background-white">
            <p>Office number: ${manager.getOfficeNumber()}</p>
        </div>
    </div>
</div>`
}

// Builds a Engineer card, using information from a engineer object.
// The github username is also a link to the github profile of the username.
function buildEngineer(engineer){
    return `<div class="column is-one-third">
    <div class="panel is-info">
        <p class="panel-heading">
            ${engineer.getName()} - Engineer <i class="fas fa-wrench"></i>
        </p>
        <div class="panel-block has-background-white">
            <p>ID: ${engineer.getId()}</p>
        </div>
        <div class="panel-block has-background-white">
            <p>Email: <a href="mailto: ${engineer.getEmail()}" class="has-text-link">${engineer.getEmail()}</a></p>
        </div>
        <div class="panel-block has-background-white">
            <p>github: <a href="https://github.com/${engineer.getGithub()}" class="has-text-link" target="_blank">${engineer.getGithub()}</a></p>
        </div>
    </div>
</div>`
}

// Builds a Intern card, using information from a intern object.
function buildIntern(intern){
    return `<div class="column is-one-third">
    <div class="panel is-info">
        <p class="panel-heading">
            ${intern.getName()} - Intern <i class="fas fa-child"></i>
        </p>
        <div class="panel-block has-background-white">
            <p>ID: ${intern.getId()}</p>
        </div>
        <div class="panel-block has-background-white">
            <p>Email: <a href="mailto: ${intern.getEmail()}" class="has-text-link">${intern.getEmail()}</a></p>
        </div>
        <div class="panel-block has-background-white">
            <p>School: ${intern.getSchool()}</p>
        </div>
    </div>
</div>`
}

// Main flow of the program.
async function init() {
    // Asks a prompt for the name of the Team.
    let teamTitle = await inquirer.prompt([
        {
        type: "input",
        message: "What is the Name of the Team?",
        name: "title"
        }
    ]).then(function(response){
        return response.title;
    });
    // Runs the question loop, creating the array of team member classes.
    let currentTeam = await questionLoop();
    // Takes the team name and array of employee's, and builds the html information.
    let teamProfile = buildHTML(teamTitle,currentTeam);
    // Writes the new file.
    writeToFile("index_" + teamTitle + ".html", teamProfile);
}
// Start is run.
init();