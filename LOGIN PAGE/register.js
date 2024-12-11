  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDrJSFR3Yj8z48Yl7tBDOW5MEZj2ZdCtoc",
    authDomain: "finace-52528.firebaseapp.com",
    projectId: "finace-52528",
    storageBucket: "finace-52528.firebasestorage.app",
    messagingSenderId: "866645590247",
    appId: "1:866645590247:web:b74b212ce14dcaa6c2e242",
    measurementId: "G-7PG0LE1F3E"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
 
  const submit = document.getElementById('submit');
  submit.addEventListener("click",function(event){
    event.preventDefault()
    alert(5)
  })