const firebaseConfig = {
    apiKey: "AIzaSyA256vpgg8E-oQkoTGqgix4ev6nshlKGmE",
    authDomain: "jwtsp-160b0.firebaseapp.com",
    databaseURL: "https://jwtsp-160b0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jwtsp-160b0",
    storageBucket: "jwtsp-160b0.appspot.com",
    messagingSenderId: "874514334362",
    appId: "1:874514334362:web:63e037047a3711f6115523",
    measurementId: "G-H2TG0W9JJJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function writeDataToFireBase(key, value) {
    database.ref("/" + user_Id + "/" + key).set(value);
}
const getMenuSetting = database.ref("/" + user_Id + "/menuSetting").once('value').then((snapshot) => {
    menuSetting = JSON.parse(snapshot.node_.value_ ?? "{}");
});
const getLessonHistory = database.ref("/" + user_Id + "/lessonHistory").once('value').then((snapshot) => {
    lessonHistory = JSON.parse(snapshot.node_.value_ ?? "[]");
});
const getWordHardHistory = database.ref("/" + user_Id + "/wordHardHistory").once('value').then((snapshot) => {
    wordHardHistory = JSON.parse(snapshot.node_.value_ ?? "[]");
});

Promise.all([getMenuSetting, getLessonHistory, getWordHardHistory]).then(() => {
    startPage();
});
