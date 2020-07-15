import FirebaseKeys from "./config";
import firebase from "firebase";
import("firebase/firestore");

//Controllers
import UserController from "./controllers/UserController";
import ListController from "./controllers/ListController";
import MoodController from "./controllers/MoodController";

interface List {
  name: string;
  color: string;
  items: any;
  id?: string;
}

interface Mood {
  day?: number;
  color?: string;
  text?: string;
  id?: any;
}

class FireAPI {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys);
      //firebase.analytics();
    }
  }

  // not utilized
  /*   loadingCheck = () => {
    this.checkAuth();
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase
          .auth()
          .signInAnonymously()
          .catch(function (error) {
            alert(error.message);
          });
      }
    });
  }; */

  // User stuff
  loginUser = (email: string, password: string) => {
    UserController.loginUser(email, password);
  };

  createUser = (user: any) => {
    UserController.createUser(user);
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  /* get user() {
    console.log(UserController.user);
    return UserController.user;
  } */

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  getLists(callback: any) {
    ListController.getLists(callback);
  }

  addList(list: List) {
    ListController.addList(list);
  }

  updateList(list: List) {
    ListController.updateList(list);
  }

  deleteList(list: List) {
    ListController.deleteList(list);
  }

  detach() {
    ListController.detach();
  }

  getMoods(callback: any) {
    MoodController.getMoods(callback);
  }

  /*   addMood(mood, moodsUID) {
    MoodController.addMood(mood, moodsUID);
  } */

  addMood(mood: Mood) {
    MoodController.addMood(mood);
  }

  updateMood(mood: Mood, moodUID: any) {
    MoodController.updateMood(mood, moodUID);
  }

  deleteMood(mood: Mood) {
    MoodController.deleteMood(mood);
  }

  detachMood() {
    MoodController.detach();
  }

  get firestore() {
    return firebase.firestore();
  }

  get firebase() {
    return firebase;
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}

//Fire.shared = new Fire();
const Fire = new FireAPI();
export default Fire;
