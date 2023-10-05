/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


// Function to create an employee record
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create employee records from an array of arrays
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // Function to create a timeIn event
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    const [hour, minute] = time.split(':');
  
    const timeInEvent = {
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date: date
    };
  
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  
  // Function to create a timeOut event
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(' ');
    const [hour, minute] = time.split(':');
  
    const timeOutEvent = {
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date: date
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeIn || !timeOut) {
      return undefined; // If timeIn or timeOut event is missing, return undefined
    }
  
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100; // Calculate hours worked
  
    return hoursWorked;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  
    if (hoursWorked === undefined) {
      return 0; // No matching timeIn or timeOut event found for the date
    }
  
    const ratePerHour = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * ratePerHour;
  
    return wagesEarned;
  }

 