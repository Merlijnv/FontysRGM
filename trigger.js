require("dotenv").config();

// Get ARGS
if (process.argv.length < 3) {
  console.log("\nRequires one argument: RGMID\n");
  process.exit(1);
}

let nextScreen = 2;
try {
  nextScreen = parseInt(process.argv[2]);
} catch (e) {
  console.error("Could not parse number");
  process.exit(1);
}

var firebaseConfig = {
  apiKey: "AIzaSyAEI97rRLY5mdtPHnH8x-9fGteQqPcnWb0",
  authDomain: "kettingreactie-e0e69.firebaseapp.com",
  databaseURL: "https://kettingreactie-e0e69.firebaseio.com",
  projectId: "kettingreactie-e0e69",
  storageBucket: "kettingreactie-e0e69.appspot.com",
  messagingSenderId: "163401991644",
  appId: "1:163401991644:web:b49ce9fe93a465e57ffb19",
  measurementId: "G-ZPQTNJN070"
};

const firebase = require("firebase");
const app = firebase.initializeApp(firebaseConfig);

app.database().ref("/chain/").set({
  node: {
    nextScreen,
  },
});

setTimeout(() => {
  process.exit(0);
}, 500);




