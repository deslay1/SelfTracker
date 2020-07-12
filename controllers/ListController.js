import firebase from "firebase";
import("firebase/firestore");

unMount = () => null;

class ListController {
  getLists(callback) {
    let ref = this.listsCollection.orderBy("name");

    this.unMount = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list) {
    this.listsCollection.add(list);
  }

  updateList(list) {
    this.listsCollection.doc(list.id).update(list);
  }

  deleteList(list) {
    this.listsCollection.doc(list.id).delete();
  }

  get listsCollection() {
    return firebase.firestore().collection("users").doc(this.uid).collection("lists");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  detach() {
    this.unMount();
  }

  get listDB() {
    return this.firestore.collection("lists");
  }
}

export default new ListController();
