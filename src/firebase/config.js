import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
const firebaseConfig = {
  apiKey: "AIzaSyANucxm04AxQdQJ2fT2HEQO8y-YR0IrW9g",
  authDomain: "order-milktea.firebaseapp.com",
  databaseURL: "https://order-milktea-default-rtdb.firebaseio.com",
  projectId: "order-milktea",
  storageBucket: "order-milktea.appspot.com",
  messagingSenderId: "362566544685",
  appId: "1:362566544685:web:36122b90b17164a51537a4",
  measurementId: "G-0K6N02JQB1"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };

export default firebase;