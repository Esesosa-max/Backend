var firebaseConfig = {
  apiKey: "AIzaSyDCaRc-0mSKVOrywGOctseGavHriPot7rE",
  authDomain: "node-js-f6307.firebaseapp.com",
  projectId: "node-js-f6307",
  storageBucket: "node-js-f6307.appspot.com",
  messagingSenderId: "1049857126020",
  appId: "1:1049857126020:web:97528800f4d7111deb1cd1",
  measurementId: "G-4D2P5TP3HS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();

$("form").on("submit", (e) => {
  e.preventDefault();
});

$("#login").click((e) => {
  console.log(e);
  let email = $("#email").val();

  let password = $("#password").val();

  if (email != "" && password !== "") {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        alert("Sign in successfully");
        console.log(response);
      })
      .catch(function (error) {
        alert(error.message);
      });
  } else {
    alert("Sign prorpely ");
  }
});

$("#logout").click((e) => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          window.location.href = "/html/signin.html";
        }
      });
    })
    .catch(function (error) {
      alert(error.message);
    });
});

$("#register").click((e) => {
  let email = $("#email").val();

  let password = $("#password").val();
  let cpassword = $("#Confrimpassword").val();

  if (email != "" && password != "" && cpassword != "") {
    console.log(cpassword, password);
    if (password == cpassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (response) {
          window.location.assign = "./accountSetting.html";
        })
        .catch(function (error) {
          alert(error.message);
        });
    } else {
      alert("Password and Confirm Password not not match");
    }
  } else {
    alert("Fill in Your Email and password and confirm passwod");
  }
});

console.log("Hello from the index.js file");

$("#res").click((e) => {
  let email = $("#email").val();

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then((data) => {
      alert("Your New Password been sent to Your Email");
      console.log(data);
    })

    .catch((err) => alert(err.message));
});

$("#update").click((e) => {
  let first_name = $("#FirstName").val();
  let second_name = $("#SecondName").val();
  let country = $("#country").val();
  let Phonenum = $("#PhoneNumber").val();
  let Occupation = $("#Occupation").val();

  let Database = firebase.firestore().collection('users')
  let userID = firebase.auth().currentUser.uid;
  let UserRef = Database.add({user :userID});

  let userdata = {
    FirstName: first_name,
    SecondName: second_name,
    PhoneNumber: Phonenum,
    Country: country,
    Occupation: Occupation,
  };
});
