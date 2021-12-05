// Declaring the dependencies and variables
const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown")
const writeFileAsync = util.promisify(fs.writeFile);
const finalFilePath = './dist/README.md'

//Prompt the user questions to populate the README.md
function promptUser(questions) {
    return inquirer.prompt(questions);
}

const questions = [
    {
        type: "input",
        name: "projectTitle",
        message: "What is the project title?",
    },
    {
        type: "input",
        name: "description",
        message: "Write a brief description of your project: "
    },
    {
        type: "input",
        name: "installation",
        message: "Describe the installation process if any: ",
    },
    {
        type: "input",
        name: "usage",
        message: "What is this project usage for?"
    },
    {
        type: "input",
        name: "contributing",
        message: "Who are the contributors of this projects?"
    },
    {
        type: "input",
        name: "tests",
        message: "Is there a test included?"
    },
    {
        type: "list",
        name: "license",
        message: "Chose the appropriate license for this project: ",
        choices: [
            "Apache",
            "Academic",
            "GNU",
            "ISC",
            "MIT",
            "Mozilla",
            "Open"
        ]
    },
    {
        type: "input",
        name: "questions",
        message: "Is there any issue? "
    },
    {
        type: "input",
        name: "username",
        message: "Please enter your GitHub username: "
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email: "
    }
];

// Write new README.md to dist directory
async function writeToFile(fileName, data) {
    await writeFileAsync(fileName, data);
    console.log('✔️  Successfully wrote to README.md');
}



async function init() {
    try {
        // Ask user questions and generate responses
        const answers = await promptUser(questions);
        const generateContent = generateMarkdown(answers);
        writeToFile(finalFilePath, generateContent)
        
    } catch (err) {
        console.log(err);
    }
}


// Function call to initialize app
init();


