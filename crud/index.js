const { initializeApp } = require("firebase/app"); 
const {getFirestore, collection, doc, setDoc, addDoc, query, where, getDocs, getDoc, deleteDoc} = require("firebase/firestore/lite");


const firebaseConfig = {
    apiKey: "AIzaSyBWPFJITVeYr9vIo-punAKKABaMcqnkhI0",
    authDomain: "libraryfirebaseconnection.firebaseapp.com",
    projectId: "libraryfirebaseconnection",
    storageBucket: "libraryfirebaseconnection.appspot.com",
    messagingSenderId: "522025067657",
    appId: "1:522025067657:web:a49330cb7d9d1cbca95258",
    measurementId: "G-JQXN6G9GH8"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function save(tableName, id, data) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, tableName, id), data);
        const savedData = {
            ...data,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, tableName), data);
        const savedData = {
            ...data,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(tableName) {
    const tableRef = collection(db, tableName);

    const q = query(tableRef);

    const querySnapshot = await getDocs(q);

    const lista = [];

    querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            id: doc.id
        }
        lista.push(data);
    });
    return lista;
}

async function getById(tableName, id) {
    const docRef = doc(db, tableName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Not found!");
    }

}

async function remove(tableName, id){
    const dado = await deleteDoc(doc(db, tableName, id));
    return {
        message: `${id} deleted`
    }
}

module.exports = {
    save,
    get,
    getById,
    remove
}