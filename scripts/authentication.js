import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from "firebase/auth"
import { startFirebase } from "./firebase"
import { praiseGod } from "./speech-recongition"

startFirebase()

const auth = getAuth()

const signInButton = document.querySelector(".sign-in")
export const checkIfUserAuthenticated = () => {
	const user = auth.currentUser

	if (user) {
		if (user.email === process.env.AUTHORIZED_USER) {
			praiseGod()
			signInButton.innerText = user.displayName
		} else {
			window.location.href = "index.html"
		}
	} else {
	}
}

export const signIn = () => {
	const provider = new GoogleAuthProvider()
	provider.setCustomParameters({
		prompt: "select_account",
	})

	signInWithPopup(auth, provider)
		.then(result => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential.accessToken
			// The signed-in user info.
			const user = result.user

			checkIfUserAuthenticated()
		})
		.catch(error => {
			// Handle Errors here.
			const errorCode = error.code
			const errorMessage = error.message
			// The email of the user's account used.
			const email = error.email
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error)
			// ...
		})
}

export const signUserOut = () => {
	signOut(auth)
		.then(() => {
			signInButton.innerText = "Sign in"
		})
		.catch(error => {
			aler(error.message)
		})
}

export const signUserInAndOut = () => {
	const user = auth.currentUser
	if (user) {
		signUserOut()
	} else {
		signIn()
	}
}
