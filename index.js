// Your code here

function createEmployeeRecord(array) {
    const record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(arrays) {
    return arrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employee, dateTimeString) {
    let date = dateTimeString.split(" ")[0];
    let hour = parseInt(dateTimeString.split(" ")[1]);
    
    const event = {type: "TimeIn", date: date,  hour: hour}

    employee.timeInEvents.push(event)
    return employee
}

function createTimeOutEvent(employee, dateTimeString) {
    let date = dateTimeString.split(" ")[0];
    let hour = parseInt(dateTimeString.split(" ")[1]);
    
    const event = {type: "TimeOut", date: date,  hour: hour}

    employee.timeOutEvents.push(event)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let tid = employee.timeInEvents.find(function(e) {return e.date === date});
    let tod = employee.timeOutEvents.find(function(e) {return e.date === date});
    
    return tod.hour/100 - tid.hour/100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return hours * employee.payPerHour
}

function allWagesFor(employee) {
    let pays = employee.timeInEvents.map(function(e) {
        return wagesEarnedOnDate(employee, e.date)
    })

    let arrSum = arr => arr.reduce((a,b) => a + b, 0)
    
    return arrSum(pays) 
}

function calculatePayroll(employees) {
    let wages = employees.map( function(e) {
        return allWagesFor(e)
    })

    let arrSum = arr => arr.reduce((a,b) => a + b, 0)
    
    return arrSum(wages)     
}

function findEmployeeByFirstName(records, name) {
    let employee = records.find(function(r) {
        return r.firstName === name;
    })
    return employee
}