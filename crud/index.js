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

async function save(nomeTabela, id, dado) {
    if (id) {
        const referenceEntity = await setDoc(doc(db, nomeTabela, id), dado);
        const savedData = {
            ...dado,
            id: id
        }
        return savedData;
    } else {
        const referenceEntity = await addDoc(collection(db, nomeTabela), dado);
        const savedData = {
            ...dado,
            id: referenceEntity.id
        }
        return savedData;
    }
}

async function get(nomeTabela) {
    const tableRef = collection(db, nomeTabela);

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

async function getById(nomeTabela, id) {
    const docRef = doc(db, nomeTabela, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return new Error("Not found!");
    }

}

async function remove(nomeTabela, id){
    const dado = await deleteDoc(doc(db, nomeTabela, id));
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