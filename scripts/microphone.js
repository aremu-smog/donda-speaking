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
	let timer = setTimeout(() => {
		if (timeInSec === 0) {
			clearTimeout(timer)
		}

		timeInSec = timeInSec - 1
	}, ONE_SEC)

	console.log(timeInSec)
}
