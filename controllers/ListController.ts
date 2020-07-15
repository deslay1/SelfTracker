import firebase from "firebase";
import("firebase/firestore");

// @ts-ignore
unMount = () => null;

interface List {
  name: string;
  color: string;
  items: any;
  id?: string;
}

class ListController {
  public unMount: any;
  public firestore: any;

  getLists(callback: any) {
    this.unMount = this.listsCollection.orderBy("name").onSnapshot((snapshot) => {
      let lists: any = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  addList(list: List) {
    this.listsCollection.add(list);
  }

  updateList(list: List) {
    this.listsCollection.doc(list.id).update(list);
  }

  deleteList(list: List) {
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
}

export default new ListController();
