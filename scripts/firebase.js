// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, increment, update } from "firebase/database"

const dotSeparation = number => {
	const commaSeparated = number.toLocaleString()

	const dotSeperated = commaSeparated.replace(",", ".")

	return dotSeperated
}

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.FIREBASE_MEASUREMENT_ID,
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
