// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

import {addDoc,collection,deleteDoc,doc,getDoc,getFirestore,onSnapshot,updateDoc,getDocs,query,where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJu3QozojTmo-nZr_dfvTEDJsVk6olmaM",
    authDomain: "tareas-b52ff.firebaseapp.com",
    projectId: "tareas-b52ff",
    storageBucket: "tareas-b52ff.appspot.com",
    messagingSenderId: "881649359887",
    appId: "1:881649359887:web:44693e7ef30ef8db8c977a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


/* Se exporta de la base de dato el guardar ademas de asignarlo a una funcion de flecha, añadiendolo a una funcion */
export const save = (emp) => {
    return addDoc(collection(db,'Tareas'),emp)
}

/* Se exporta de la base de dato el obtener informacion para rellenar la tabla, añadiendolo a una funcion*/
export const getData = (data) =>{
    onSnapshot(collection(db,'Tareas'),data)
}
/* Se exporta de la base de dato el eliminar ademas de asignarlo a una funcion de flecha, añadiendolo a una funcion */
export const eliminar = (id) =>{
    deleteDoc(doc(db,'Tareas',id))
}
/* Se exporta el nombre de los documentos para utilizarlos en una funcion para evitar duplicacion de nombres */
export const obtener = (nom) => { return getDoc(doc(db,'Tareas',nom))}

/* Se exporta de la base de dato el actualizar para modificar datos en la base de datos*/
export const update = (nom,tarea) =>{
    return updateDoc(doc(db,'Tareas',nom),tarea)
}
/* Se exporta de la base de dato el guardar ademas de asignarlo a una funcion de flecha */
export const nomrepetido = async (nombre) => {
    const querySnapshot = await getDocs(query(collection(db, 'Tareas'), where('nom', '==', nombre)))
    return !querySnapshot.empty
}

