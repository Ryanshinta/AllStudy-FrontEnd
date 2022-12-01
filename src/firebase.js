import firebase from "firebase/compat/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBUgLJbb8ITUTSwRhWHR2aJHPJ0v2WfYlI",
    authDomain: "fyp-allstudy.firebaseapp.com",
    databaseURL: "https://fyp-allstudy-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fyp-allstudy",
    storageBucket: "fyp-allstudy.appspot.com",
    messagingSenderId: "725102997701",
    appId: "1:725102997701:web:6ecc846581286bcaed80ac",
    measurementId: "G-5C0DHYSXXN"
};

firebase.initializeApp(firebaseConfig);

export default firebase;