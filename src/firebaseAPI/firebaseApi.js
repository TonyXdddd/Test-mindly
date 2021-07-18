import firebase from "firebase";
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCNgUK_HyBQWqSzhsUVzBxE6XfuC_IOA-s",
  authDomain: "visitinfostorage.firebaseapp.com",
  projectId: "visitinfostorage",
  storageBucket: "visitinfostorage.appspot.com",
  messagingSenderId: "716146352587",
  appId: "1:716146352587:web:a726e1750b9eb677a8564e"
});

export const firestore = firebase.firestore();
