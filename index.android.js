import firebase from 'firebase';
import App from './app/index';


const app = new App();
const config = {
  databaseURL: "https://new-sevgok.firebaseio.com",
  projectId: "new-sevgok",
};

firebase.initializeApp(config);
app.start();
