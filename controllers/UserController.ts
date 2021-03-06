import firebase from "firebase";
import("firebase/firestore");

class UserController {
  loginUser = async (email: string, password: string) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .catch((error) => {
          // @ts-ignore
          alert(error.message);
        });
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    }
  };

  uploadPhotoAsync = async (uri: string, filename: string) => {
    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(filename).put(file);

      upload.on(
        "state_changed",
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  createUser = async (user: any) => {
    let remoteUri = null;

    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch((error) => {
        // @ts-ignore
        alert(error.message);
      });

    try {
      // add to firestore collection
      const db = this.userCollection.doc(this.uid);
      console.log(this.uid);
      db.set({
        username: user.username,
        email: user.email,
        image: null,
      });

      // if there is am image, upload it to file storage + add uri to user
      if (user.image) {
        remoteUri = await this.uploadPhotoAsync(user.image, `images/${this.uid}`);

        db.set({ image: remoteUri }, { merge: true });
      }
    } catch (error) {
      // @ts-ignore
      alert(error.message);
    }
  };

  /*   get user() {
    const user = null;
    this.userCollection
      .doc(this.uid)
      .get()
      .then((doc) => {
        user = doc.data();
      });
    return user;
  } */

  get userCollection() {
    return firebase.firestore().collection("users");
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new UserController();
