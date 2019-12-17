// Your code here

const createEmployeeRecord = arr => {
  let obj = {};
  return (obj = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  });
};

const createEmployeeRecords = arr => {
  let result = [];
  for (const element of arr) {
    result.push(createEmployeeRecord(element));
  }
  return result;
};

const createTimeInEvent = (record, dateStamp) => {
  let hour = parseInt(dateStamp.substring(11, 13)) * 100;
  let date = dateStamp.substring(0, 10);

  record.timeInEvents.push({
    type: "TimeIn",
    hour,
    date
  });

  return record;
};

const createTimeOutEvent = (record, dateStamp) => {
  let hour = parseInt(dateStamp.substring(11, 13)) * 100;
  //   console.log(hour);
  let date = dateStamp.substring(0, 10);

  record.timeOutEvents.push({
    type: "TimeOut",
    hour,
    date
  });

  return record;
};

const hoursWorkedOnDate = (record, date) => {
  let dateTimeIn = record.timeInEvents.find(d => d.date == date);
  let dateTimeOut = record.timeOutEvents.find(d => d.date == date);

  let timeIn = dateTimeIn.hour;
  let timeOut = dateTimeOut.hour;
  let hoursWorked = (timeOut - timeIn) / 100;
  return hoursWorked;
};

const wagesEarnedOnDate = (record, date) => {
  let hoursWorked = hoursWorkedOnDate(record, date);

  let payOwed = hoursWorked * record.payPerHour;
  return payOwed;
};

const allWagesFor = record => {
  let totalOwed = 0;
  let dates = record.timeInEvents.map(d => d.date);

  for (const date of dates) {
    totalOwed += wagesEarnedOnDate(record, date);
  }
  return totalOwed;
};

const findEmployeeByFirstName = (srcArray, firstName) => {
  let employee = srcArray.find(e => (e.firstName = firstName));
  return employee;
};

const calculatePayroll = array => {
  let grandTotal = 0;
  for (const employee of array) {
    grandTotal += allWagesFor(employee);
  }
  return grandTotal;
};
