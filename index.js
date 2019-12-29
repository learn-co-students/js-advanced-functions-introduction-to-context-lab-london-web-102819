// Your code here
function createEmployeeRecord(employeeInfo){
    let employee = {};
    employee.firstName = employeeInfo[0];
    employee.familyName = employeeInfo[1];
    employee.title = employeeInfo[2];
    employee.payPerHour  = employeeInfo[3]; 
    employee['timeInEvents'] = [];
    employee['timeOutEvents'] = []; 
    return employee; 
};

const createEmployeeRecords = employeeRecords =>{
    return employeeRecords.map(createEmployeeRecord);
};

const createTimeInEvent = (record, date) =>{
    let newEvent = {};
    let timeIn = date.split(' ');

    newEvent['type'] = 'TimeIn';
    newEvent['date'] = timeIn[0];
    newEvent['hour'] = parseInt(timeIn[1],10); 

    record['timeInEvents'].push(newEvent);

    return record; 
};

const createTimeOutEvent = (record, date) => {
    let newEvent = {};
    let timeOut = date.split(' ');

    newEvent['type'] = 'TimeOut';
    newEvent['date'] = timeOut[0];
    newEvent['hour'] = parseInt(timeOut[1], 10); 

    record['timeOutEvents'].push(newEvent);

    return record;
};

const hoursWorkedOnDate = function(employee, date){
    let timeInAry = employee.timeInEvents.find(record => record.date === date);
    let timeOutAry = employee.timeOutEvents.find(record => record.date === date); 

    let timeIn = timeInAry.hour;
    let timeOut = timeOutAry.hour;

    return (timeOut - timeIn)/100; 
};

const wagesEarnedOnDate = (employee, date) => {
   let hours = hoursWorkedOnDate(employee,date);
   let wagePerHour = employee.payPerHour;

   return hours * wagePerHour;
};

const allWagesFor = (employee) => {
    /* baby K's fancy way again  __ all in shot [time efficiency]: 
    return employee.timeInEvents.reduce((memo,recordIn) => {
        return memo + wagesEarnedOnDate(employee,recordIn.date); 
    }, 0);
    */
    let dates = employee.timeInEvents.map(recordIn => {
        return recordIn.date;
    });

    let dailyWages = dates.map(date => wagesEarnedOnDate(employee, date));

    return dailyWages.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
      }, 0);
};

const calculatePayroll = (employees) => {
    return employees.reduce((memo, employee) => {
        return memo + allWagesFor(employee)
    }, 0);
};

const findEmployeeByFirstName = (employees, firstName) => {
   return employees.find(employee => employee.firstName === firstName);
   
}; 