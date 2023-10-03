// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWS3UHg8Qr0CkHUIKTL9wvKyKPRYtzU7E",
  authDomain: "media-site-app.firebaseapp.com",
  projectId: "media-site-app",
  storageBucket: "media-site-app.appspot.com",
  messagingSenderId: "1066684501949",
  appId: "1:1066684501949:web:0c7fb3071ad01aae8c8cd4",
  measurementId: "G-0HPFYTEV3Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const fileRef = ref(storage, "/Songs/Charm - Rema.m4a");

getDownloadURL(fileRef)
  .then((url) => {
    console.log("File download URL:", url);
    // Use this URL for downloading or streaming the file
  })
  .catch((error) => {
    console.error("Error getting download URL:", error);
  });
