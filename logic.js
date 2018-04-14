// Initialize Firebase
var config = {
  apiKey: "AIzaSyBR14f7vPtlDgWNoM0frtHQOoRLn9OOT_o",
  authDomain: "traintimer-65445.firebaseapp.com",
  databaseURL: "https://traintimer-65445.firebaseio.com",
  projectId: "traintimer-65445",
  storageBucket: "traintimer-65445.appspot.com",
  messagingSenderId: "631098526381"
};


firebase.initializeApp(config);

$('#add-train').on('click', function() {
var name = $('#name').val();
var dest = $('#destination').val();
var firstTime = $('#first-time').val();
var freq = $('#frequency').val();


var train = {
  name: name,
  destination: dest,
  firstTime: firstTime,
  frequency: freq,

  dateAdded: firebase.database.ServerValue.TIMESTAMP

};

console.log(train);

var connectionsRef = trainDb.ref();

connectionsRef.push(train);
return false;

});

// Create a variable to reference the database.
var trainDb = firebase.database();



trainDb.ref().orderByChild("dateAdded").limitToLast(2).on("child_added", function(snapshot) {

// Change the HTML to reflect
$("#train1").text(snapshot.val().name);
$("#city1").text(snapshot.val().destination);
$("#freq1").text(snapshot.val().frequency);
$("#arrive").text(snapshot.val().firstTime);

});



// -------------------------------------------------------------- (CRITICAL - BLOCK) --------------------------- //
// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.


// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.

// When the client's connection state changes...
