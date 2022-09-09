import { updateCounter } from "./firebase"
import { startChanting, stopChanting, comeToLife } from "./animation"
import { believeWhatIsay, signInButton } from "./microphone"

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent =
	SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var donda_list = ["thunder", "dun da", "dunda", "donda"]
var grammar =
	"#JSGF V1.0; grammar donda_list; public <donda> = " +
	donda_list.join(" | ") +
	" ;"

var recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false
recognition.lang = "en-US"
recognition.interimResults = false
recognition.maxAlternatives = 1

export const praiseGod = () => {
	recognition.start()

	signInButton.innerText = "🗣 Start Speaking"
	signInButton.disabled = "disabled"
	comeToLife(1)
}

recognition.onresult = function (event) {
	const dondaOptions = new RegExp(donda_list.join("|"), "g")

	const resultFromSpeech = event.results[0][0].transcript

	const dondaMentions = resultFromSpeech.match(dondaOptions)

	if (dondaMentions) {
		const noOfDondaMentions = dondaMentions.length || 0

		console.log(noOfDondaMentions)
		updateCounter(noOfDondaMentions)
	} else {
		console.log("Result not matched")
	}
}

const BREAK_TIME = 4000

const ONE_SEC = 1000

recognition.onsoundstart = function () {
	startChanting()
}
recognition.onspeechend = function () {
	recognition.stop()
	comeToLife(0.3)
	stopChanting()

	const TIME_IN_SEC = BREAK_TIME / ONE_SEC

	let timeLeft = TIME_IN_SEC

	signInButton.innerText = `🧘🏼‍♀️ CHILLAX, and get back to it in ${timeLeft}s`
	let timer = setInterval(() => {
		timeLeft--
		signInButton.innerText = `🧘🏼‍♀️ CHILLAX, and get back to it in ${timeLeft}s`
		if (timeLeft === 0) {
			timeLeft = TIME_IN_SEC
			clearInterval(timer)
		}
	}, ONE_SEC)

	setTimeout(() => {
		signInButton.innerText = "🙌🏽🗣 Keep going..."
		recognition.start()
		comeToLife(1)
	}, BREAK_TIME)
}

recognition.onnomatch = function (event) {
	stopChanting()
	comeToLife(0.3)
	console.log("Not Donda")
}

recognition.onerror = function (event) {
	comeToLife(0.3)
	stopChanting()
	signInButton.innerText = "🕺💃 Get Started"
	signInButton.disabled = ""
	console.log("Error", event.error)
}
