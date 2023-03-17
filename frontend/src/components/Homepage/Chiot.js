import './Chiot.css';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  child,
  get,
} from 'firebase/database';
import { useState, React } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyCObEkSLxrvsvLSZDmMInrjzY4qRSjDRqQ',
  authDomain: 'dsvnew-f267e.firebaseapp.com',
  databaseURL: 'https://dsvnew-f267e-default-rtdb.firebaseio.com',
  projectId: 'dsvnew-f267e',
  storageBucket: 'dsvnew-f267e.appspot.com',
  messagingSenderId: '833589424118',
  appId: '1:833589424118:web:c3361a65de07984e78e1d7',
  measurementId: 'G-4B9GPKQV11',
};
function Slider() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const dbRef = ref(database);
  const [heartBeat, setHeartbeat] = useState(0);
  get(child(dbRef, 'data')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      setHeartbeat(snapshot.val());
    } else {
      console.log('No data available');
    }
  }).catch((error) => {
    console.error(error);
  });
  return (
    <div className="body">
      <div className="heart" />
      <div className="hien-nhip-tim">{`nhip tim cua ban la ${heartBeat} nhip tren mot phut`}</div>
    </div>
  );
}

export default Slider;
