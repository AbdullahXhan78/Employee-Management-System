import inquirer from 'inquirer';
import chalk from 'chalk';

console.log(chalk.bold.italic.blue("WELCOME TO EMPLOYEE MANAGEMENT SYSTEM"));

let employees: any[] = [];

async function getEmployeeData(existingData = {}) {
    return await inquirer.prompt([
        { name: "name", message: "Enter employee's name",  },
        { name: "email", message: "Enter employee's email", },
        { name: "contact", message: "Enter employee's contact number", },
        { name: "address", message: "Enter employee's address",  },
        { name: "gender", type: "list", message: "Select employee's gender", choices: ["Male", "Female", "Other"], },
        { name: "qualification", type: "list", message: "Select employee's qualification", choices: ["High School", "Bachelor's Degree", "Master's Degree"],  },
    ]);
}

async function addEmployee() {
    let employeeData = await getEmployeeData();
    employeeData.employeeID = Math.floor(Math.random() * 10000); // Generate a random ID

    employees.push(employeeData);

    console.log(chalk.bold.green("Employee added successfully!"));
}

async function searchEmployee() {
    let searchCriteria = await inquirer.prompt([
        { name: "searchBy", type: "list", message: "Search employee by:", choices: ["Name", "ID"] },
        { name: "searchValue", message: "Enter the search value:" },
    ]);

    let foundEmployees;
    if (searchCriteria.searchBy === "Name") {
        foundEmployees = employees.filter(emp => emp.name.toLowerCase().includes(searchCriteria.searchValue.toLowerCase()));
    } else {
        foundEmployees = employees.filter(emp => emp.employeeID == searchCriteria.searchValue);
    }

    if (foundEmployees.length > 0) {
        console.log(chalk.bold.italic.yellow("Employee(s) found:"));
        foundEmployees.forEach(emp => {
            console.log(chalk.bold.green("Name:"), emp.name);
            console.log(chalk.bold.green("Email:"), emp.email);
            console.log(chalk.bold.green("Contact:"), emp.contact);
            console.log(chalk.bold.green("Address:"), emp.address);
            console.log(chalk.bold.green("Gender:"), emp.gender);
            console.log(chalk.bold.green("Qualification:"), emp.qualification);
            console.log(chalk.bold.green("Employee ID:"), emp.employeeID);
            console.log("---------------------------------------");
        });
    } else {
        console.log(chalk.bold.red("No employee found with the given criteria."));
    }
}

async function editEmployee() {
    let { employeeID } = await inquirer.prompt([
        { name: "employeeID", message: "Enter the employee ID to edit:" },
    ]);

    let employee = employees.find(emp => emp.employeeID == employeeID);

    if (employee) {
        let updatedData = await getEmployeeData(employee);
        Object.assign(employee, updatedData);

        console.log(chalk.bold.green("Employee updated successfully!"));
    } else {
        console.log(chalk.bold.red("Employee not found."));
    }
}

async function deleteEmployee() {
    let { employeeID } = await inquirer.prompt([
        { name: "employeeID", message: "Enter the employee ID to delete:" },
    ]);

    let index = employees.findIndex(emp => emp.employeeID == employeeID);

    if (index !== -1) {
        employees.splice(index, 1);
        console.log(chalk.bold.green("Employee deleted successfully!"));
    } else {
        console.log(chalk.bold.red("Employee not found."));
    }
}

async function mainMenu() {
    while (true) {
        let choice = await inquirer.prompt([
            { name: "action", type: "list", message: "Choose an action:", choices: ["Add Employee", "Search Employee", "Edit Employee", "Delete Employee", "Exit"] },
        ]);

        switch (choice.action) {
            case "Add Employee":
                await addEmployee();
                break;
            case "Search Employee":
                await searchEmployee();
                break;
            case "Edit Employee":
                await editEmployee();
                break;
            case "Delete Employee":
                await deleteEmployee();
                break;
            case "Exit":
                console.log(chalk.bold.italic.blue("Exiting the program. Goodbye!"));
                process.exit(0);
        }
    }
``}

mainMenu();