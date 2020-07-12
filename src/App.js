import React, { useState } from "react";

import "./App.css";

// Browserify Setup
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDvUfeyRsnzQbC5DXRUoyHlu7JCXsbK2Kk",
  authDomain: "taskman-dd1f1.firebaseapp.com",
  databaseURL: "https://taskman-dd1f1.firebaseio.com",
  projectId: "taskman-dd1f1",
  storageBucket: "taskman-dd1f1.appspot.com",
  messagingSenderId: "258698209343",
  appId: "1:258698209343:web:4a246028f5c6003d62708a",
  measurementId: "G-34SDEXCL2Q",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const submitToFirebase = () => {
    if (title !== "") {
      let suggestionRef = firebase.database().ref("suggestions/");
      suggestionRef.push({
        title: title,
        suggestion: suggestion,
        name: name,
        tel: tel,
        email: email,
      });
      suggestionRef.on("child_added", () => {
        setIsAdded(true);
      });
    }
  };

  return (
    <div className="App">
      <h2>Suggestions and Idea Collection</h2>
      <form>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <textarea
          placeholder="Your suggestion and ideas..."
          onChange={(e) => {
            setSuggestion(e.target.value);
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Telephone number"
          onChange={(e) => {
            setTel(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input type="button" value="Submit" onClick={submitToFirebase}></input>
        <p>{isAdded ? "submited" : ""}</p>
      </form>
    </div>
  );
}

export default App;
