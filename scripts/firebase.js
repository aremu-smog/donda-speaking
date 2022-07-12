// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, increment, update } from "firebase/database"

const dotSeparation = number => {
  const commaSeparated = number.toLocaleString()

  const dotSeperated = commaSeparated.replace(",", ".")

  return dotSeperated
}

const firebaseConfig = {
  apiKey: "AIzaSyBVfCwskoFtmkUfydbPJFaYmPYntn8hbP4",
  authDomain: "donda-project-dev.firebaseapp.com",
  databaseURL: "https://donda-project-dev-default-rtdb.firebaseio.com",
  projectId: "donda-project-dev",
  storageBucket: "donda-project-dev.appspot.com",
  messagingSenderId: "80315066249",
  appId: "1:80315066249:web:75f81031ce8466753d6358",
  measurementId: "G-4XS60Z3HQB"
}

// Initialize Firebase
export const startFirebase = () => initializeApp(firebaseConfig)

startFirebase()

const db = getDatabase()
const dbRef = ref(db)
const dondaCounter = ref(db, "counter")
export const getCounter = () =>
  onValue(dondaCounter, snapshot => {
    const data = snapshot.val()

    const counterTag = document.querySelector(".counter")

    counterTag.innerText = dotSeparation(data)
  })

export const updateCounter = amount => {
  const updates = {}
  updates["counter"] = increment(amount)

  update(dbRef, updates)
}
