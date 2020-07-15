import firebase from "firebase";
import("firebase/firestore");

// import moment from "moment";

export const now = null;

interface Mood {
  day?: number;
  color?: string;
  text?: string;
  id?: any;
}

// @ts-ignore
unMount = () => null;

class MoodController {
  public unMount: any;
  public firestore: any;

  getMoods(callback: any) {
    /* const now = firebase.firestore.Timestamp.fromDate(new Date()).toMillis();
    const lowerLimit = moment(now).startOf("month").valueOf();
    const upperLimit = moment(now).endOf("month").valueOf();
    let moodsRef = this.moodsCollection.where("day", ">", lowerLimit).where("day", "<=", upperLimit); */
    let moodsRef = this.moodsCollection;
    let moodsArray: Mood[] = [];
    this.unMount = moodsRef.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const mood: any = { id: doc.id, ...doc.data() };
        moodsArray.push(mood);
      });
      callback(moodsArray);
    });
  }

  addMood(mood: Mood) {
    this.moodsCollection.add(mood);
  }

  updateMood(mood: Mood, moodUID: any) {
    this.moodsCollection.doc(moodUID).update(mood);
  }

  deleteMood(mood: Mood) {
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
