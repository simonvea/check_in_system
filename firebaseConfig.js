
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD30iLrkdKCpg3IopFjL9Pg8DVWNY7NqnI",
    authDomain: "check-in-system-902b5.firebaseapp.com",
    databaseURL: "https://check-in-system-902b5.firebaseio.com",
    projectId: "check-in-system-902b5",
    storageBucket: "check-in-system-902b5.appspot.com",
    messagingSenderId: "997650002129",
    appId: "1:997650002129:web:1adf0298a0ed4f77"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const tasksRef = db.collection("tasks");