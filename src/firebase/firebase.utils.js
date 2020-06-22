import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBJ3Qu52RX4GjI9YbgpeM61t_YCPDCE2gY',
  authDomain: 'crwn-clothing-db-01.firebaseapp.com',
  databaseURL: 'https://crwn-clothing-db-01.firebaseio.com',
  projectId: 'crwn-clothing-db-01',
  storageBucket: 'crwn-clothing-db-01.appspot.com',
  messagingSenderId: '662341111940',
  appId: '1:662341111940:web:421de447198030c17af2d1',
  measurementId: 'G-HQXXHZ7MVS',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
