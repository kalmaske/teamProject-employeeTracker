// Initialize Firebase
var config = {
    apiKey: "AIzaSyBA-nLp-LVZg2aHMA95QANd8oA5YoZV3ZA",
    authDomain: "employeetracker-bb5fc.firebaseapp.com",
    databaseURL: "https://employeetracker-bb5fc.firebaseio.com",
    projectId: "employeetracker-bb5fc",
    storageBucket: "employeetracker-bb5fc.appspot.com",
    messagingSenderId: "989580686380"
  };
  firebase.initializeApp(config);


var name;
var role;
var startDate;
var rate;
var database = firebase.database();

$(document).ready(function(){
	$("#submitButton").on("click", function(event){
		event.preventDefault();
		name = $("#employee-name").val();
		role = $("#role").val();
		startDate = $("#start-date").val();
		rate = $("#monthly-rate").val();
		
		var employeesRef = database.ref("employees");
		var newEmployee = employeesRef.push({
			fName : name,
			fRole : role,
			fStartDate : startDate,
			fRate : rate
			});
		// var newEmployeeKey = newEmployee.key;
		// console.log(newEmployeeKey);
	});

});

database.ref("employees/").on("child_added", function(childSnapshot){
	buildTableRow(childSnapshot.val());
})

function buildTableRow(myObject) {
	var myDate = new Date(myObject.fStartDate);
	database.ref("time").set({
		currentTime : firebase.database.ServerValue.TIMESTAMP
	});
	var serverTime;
	database.ref("time/").once("value",function(snapshot){
		serverTime = snapshot.val().currentTime
	});

	var monthsWorked = moment(serverTime).diff(moment(myObject.fStartDate, "YYYY-MM-DD"),"months");

	//PRINT TABLE
	var tableRow = $("<tr>");
	var tableName = $("<td>").text(myObject.fName);
	var tableRole = $("<td>").text(myObject.fRole);
	var tableStart = $("<td>").text(myObject.fStartDate);
	var tableMonthsWorked = $("<td>").text(monthsWorked);
	var tableRate = $("<td>").text(myObject.fRate);
	var tableTotal = $("<td>").text((monthsWorked* myObject.fRate));

	tableRow.append(tableName).append(tableRole).append(tableStart).append(tableMonthsWorked).append(tableRate).append(tableTotal);
	$("#employees-table-body").append(tableRow);
	console.log(myObject);

};