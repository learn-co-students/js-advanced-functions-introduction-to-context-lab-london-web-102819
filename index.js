// Your code here

function createEmployeeRecord(arr) {
    return {firstName: arr[0],
            familyName: arr[1],
            title: arr[2],
            payPerHour: arr[3],
            timeInEvents: [],
            timeOutEvents: []};
}

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord);
} 

function createTimeInEvent(employee, date) {
    employee.timeInEvents.push({date: date.slice(0,10), hour: parseInt(date.slice(10)), type: "TimeIn"});
    return employee;
}

function createTimeOutEvent(employee, date) {
    employee.timeOutEvents.push({date: date.slice(0,10), hour: parseInt(date.slice(10)), type: "TimeOut"});
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const start = employee.timeInEvents.find(e => e.date === date).hour;
    const end = employee.timeOutEvents.find(e => e.date === date).hour;
    return (end - start)/100;
}

function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    const {payPerHour} = employee;
    return payPerHour*hours;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total,current) => total += wagesEarnedOnDate(employee, current.date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((total, e) => total += allWagesFor(e), 0);
}

function findEmployeeByFirstName(employees, soughtName) {
    return employees.find(e => e.firstName === soughtName);
}