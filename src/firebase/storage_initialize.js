const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyC-6g7NQbxB6ncRrRnQCq-zRyStzjq2p1c",
  authDomain: "cloud-minimalistic-ecomm-5fdda.firebaseapp.com",
  projectId: "cloud-minimalistic-ecomm-5fdda",
  storageBucket: "cloud-minimalistic-ecomm-5fdda.appspot.com",
  messagingSenderId: "804946020776",
  appId: "1:804946020776:web:31346cfe89641d5165759d",
  measurementId: "G-LC81676J49",
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

module.exports = { storage, firebase };
