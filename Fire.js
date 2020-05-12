import FirebaseKeys from "./config";
import firebase from "firebase";
import("firebase/firestore");

//Controllers
import UserController from "./controllers/UserController";
import ListController from "./controllers/ListController";

class Fire {
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
  loginUser = (email, password) => {
    UserController.loginUser(email, password);
  };

  createUser = (user) => {
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

  getLists(callback) {
    ListController.getLists(callback);
  }

  addList(list) {
    ListController.addList(list);
  }

  updateList(list) {
    ListController.updateList(list);
  }

  deleteList(list) {
    ListController.deleteList(list);
  }

  detach() {
    ListController.detach();
  }

  get firestore() {
    return firebase.firestore();
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
