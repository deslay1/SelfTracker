import firebase from "firebase";
import("firebase/firestore");

import moment from "moment";

export const now = null;

unMount = () => null;

class MoodController {
  getMoods(callback) {
    /* const now = firebase.firestore.Timestamp.fromDate(new Date()).toMillis();
    const lowerLimit = moment(now).startOf("month").valueOf();
    const upperLimit = moment(now).endOf("month").valueOf();
    let moodsRef = this.moodsCollection.where("day", ">", lowerLimit).where("day", "<=", upperLimit); */
    let moodsRef = this.moodsCollection;
    let moodsArray = [];
    this.unMount = moodsRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        moodsArray.push({ id: doc.id, ...doc.data() });
      });
      callback(moodsArray);
    });
  }

  addMood(mood) {
    this.moodsCollection.add(mood);
  }

  updateMood(mood, moodUID) {
    this.moodsCollection.doc(moodUID).update(mood);
  }

  deleteMood(mood) {
    this.moodsCollection.doc(mood.id).delete();
  }

  get moodsCollection() {
    return firebase.firestore().collection("users").doc(this.uid).collection("moods");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  detach() {
    this.unMount();
  }

  get moodDB() {
    return this.firestore.collection("moods");
  }
}

export default new MoodController();
