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

var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = -1;
  var minutesAway= -1;

  $("#submit").on("click", function() {
		event.preventDefault();
		//console.log(event);
		trainName = $("#nameInput").val().trim();
		destination = $("#destinationInput").val().trim();
		firstTrain = $("#timeInput").val().trim();
		frequency = $("#frequencyInput").val().trim();
		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
		});
	});
  database.ref().on("child_added", function(childSnapshot) {
			var firstTrainMoment = moment(firstTrain, "hh:mm").subtract(1, "years");
			var currentTime = moment();
			var timeDifference = moment().diff(moment(firstTrainMoment), "minutes");
			var tRemainder = timeDifference % frequency;
			var minutesAway = frequency - tRemainder;
			var nextTrain = moment().add(minutesAway, "minutes");
			$("#contentTable").append("<tr><td>"+childSnapshot.val().trainName+"</td><td>"+childSnapshot.val().destination+"</td><td>"+childSnapshot.val().frequency+"</td><td>"+moment(nextTrain).format("HH:mm")+"</td><td>"+minutesAway+"</td></tr>");
  });