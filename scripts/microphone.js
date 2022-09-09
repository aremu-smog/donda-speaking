import { checkIfUserAuthenticated, signUserInAndOut } from "./authentication"
import { getCounter } from "./firebase"
import { praiseGod } from "./speech-recongition"

let offTheGrid = setInterval(function () {
	if (document.readyState !== "complete") return
	clearInterval(offTheGrid)

	getCounter()
	checkIfUserAuthenticated()
}, 100)

export const signInButton = document.querySelector(".sign-in")
signInButton.addEventListener("click", e => {
	e.preventDefault()

	praiseGod()
})

export const believeWhatIsay = howLong => {
	const ONE_SEC = 1000
	let timeInSec = howLong / ONE_SEC
	console.log(timeInSec)
	// let timer = setInterval(() => {
	// 	console.log(timeInSec)
	// 	timeInSec--
	// }, ONE_SEC)

	// return timer
}
