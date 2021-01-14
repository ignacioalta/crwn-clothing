import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCgfVoFQylIl0UxK9CIjGtXHEVw0Riyv0I",
  authDomain: "shop-clothing-589ec.firebaseapp.com",
  projectId: "shop-clothing-589ec",
  storageBucket: "shop-clothing-589ec.appspot.com",
  messagingSenderId: "282942941987",
  appId: "1:282942941987:web:1e7759d86de70f439f3a96"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

