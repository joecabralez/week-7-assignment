var currentDay = moment().format("YYYY-MM-DD");

var config = {
    apiKey: "AIzaSyCeyUHfIyR6RIdo_P-ErDL_fF3aUiIMF4o",
    authDomain: "train-schedule-app-a2ca7.firebaseapp.com",
    databaseURL: "https://train-schedule-app-a2ca7.firebaseio.com",
    projectId: "train-schedule-app-a2ca7",
    storageBucket: "train-schedule-app-a2ca7.appspot.com",
    messagingSenderId: "149782388883"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = 0;
var arrival = 0;
var wait = 0;

$("#submit").click(function() {

	trainName = $("#nameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	firstTrain = $("#timeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	trainData.ref().push ({
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	$("input").val(null)
});



trainData.on('child_added', function(childSnapshot, prevChildKey) {

	var holyshitworkplease = currentDay + " " + childSnapshot.val().firstTrain

	var startTime = moment(holyshitworkplease).format("X")

	var currentTime = moment().format("X")

	var timeDifference = currentTime - startTime

	var minutes = Math.floor(timeDifference/60)

	var next = (minutes%childSnapshot.val().frequency)

	var nextTime = childSnapshot.val().frequency - next;


	// =================================================================

	var trainDiv = $("<tr>");

	var nameTD = $("<td>");
	nameTD.append(childSnapshot.val().trainName);

	var destinationTD = $("<td>");
	destinationTD.append(childSnapshot.val().destination);

	var frequencyTD = $("<td>");
	frequencyTD.append(childSnapshot.val().frequency);


	var something = currentTime +  (childSnapshot.val().frequency - next)*60

	var nextTrainTD = $("<td>");
	nextTrainTD.append( moment().add(nextTime, 'minutes').format("hh:mm") );

	var minutesAwayTD = $("<td>");
	minutesAwayTD.append( childSnapshot.val().frequency - next )

	trainDiv.append(nameTD);
	trainDiv.append(destinationTD);
	trainDiv.append(frequencyTD);
	trainDiv.append(nextTrainTD);
	trainDiv.append(minutesAwayTD);

	$("#contentTable").append(trainDiv)

}, function(errorObject){

		console.log("Errors handled: " + errorObject.code);

});
