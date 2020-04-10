import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyB7VNq5nFuVe8Pmijvr-tMJja_a9_3cDvk",
    authDomain: "appblog-br.firebaseapp.com",
    databaseURL: "https://appblog-br.firebaseio.com",
    projectId: "appblog-br",
    storageBucket: "appblog-br.appspot.com",
    messagingSenderId: "455083137951",
    appId: "1:455083137951:web:3a3bc4bfced9f2e3277baa",
    measurementId: "G-JDHFPBYSCT"
  };
  
class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email,password);
    }
        logout() {
        return app.auth().signOut();
    }

    async register(nome, email, password) {
       await app.auth().createUserWithEmailAndPassword(email, password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome:nome
        })        
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    async getUserName(callBack) {
        if(!app.auth().currentUser) {
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid).once('value').then(callBack);
    }
}

export default new Firebase();