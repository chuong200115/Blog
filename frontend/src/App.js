// import Header from './components/Header';
// import Signup from './components/Signup';
// import { getDatabase } from 'firebase/database';
// import { initializeApp } from 'firebase/app';
// import { database } from 'firebase';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { useEffect } from 'react';
import {
  getDatabase,
  ref,
  child,
  get,
} from 'firebase/database';
import Home from './components/Home';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCObEkSLxrvsvLSZDmMInrjzY4qRSjDRqQ',
//   authDomain: 'dsvnew-f267e.firebaseapp.com',
//   databaseURL: 'https://dsvnew-f267e-default-rtdb.firebaseio.com',
//   projectId: 'dsvnew-f267e',
//   storageBucket: 'dsvnew-f267e.appspot.com',
//   messagingSenderId: '833589424118',
//   appId: '1:833589424118:web:c3361a65de07984e78e1d7',
//   measurementId: 'G-4B9GPKQV11',
// };
function App() {
  // useEffect;
  // const app = initializeApp(firebaseConfig);
  // const database = getDatabase(app);
  // const dbRef = ref(database);
  // get(child(dbRef, 'data')).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log('No data available');
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
