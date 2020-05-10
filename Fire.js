import FirebaseKeys from "./config";
import firebase from "firebase";
import("firebase/firestore");

//Controllers
import UserController from "./controllers/UserController";

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

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get firestore() {
    return firebase.firestore();
  }

  get timestamp() {
    return Date.now();
  }

  off() {
    this.listDB.off();
  }

  get listDB() {
    return this.firestore.collection("lists");
  }
}

Fire.shared = new Fire();
export default Fire;
