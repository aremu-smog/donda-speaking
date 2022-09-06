import { checkIfUserAuthenticated, signUserInAndOut } from "./authentication"
import { getCounter } from "./firebase"

let offTheGrid = setInterval(function () {
	if (document.readyState !== "complete") return
	clearInterval(offTheGrid)

	getCounter()
	checkIfUserAuthenticated()
}, 100)

const signInButton = document.querySelector(".sign-in")
signInButton.addEventListener("click", e => {
	e.preventDefault()
	alert("Sign me in!")
	signUserInAndOut()
})
