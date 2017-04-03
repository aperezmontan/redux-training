import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBmZofNC0PdjKSVLExigejEH5z5dWNppew",
  authDomain: "ari-redux-project.firebaseapp.com",
  databaseURL: "https://ari-redux-project.firebaseio.com",
  storageBucket: "ari-redux-project.appspot.com",
  messagingSenderId: "948162681702"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 10000
export const usersExpirationLength = 10000