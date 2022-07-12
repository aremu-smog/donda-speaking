import { updateCounter } from "./firebase"
import { startChanting, stopChanting, comeToLife } from "./animation"

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var donda_list = ["thunder", "dun da", "dunda", "donda"]
var grammar = "#JSGF V1.0; grammar donda_list; public <donda> = " + donda_list.join(" | ") + " ;"

var recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = false
recognition.lang = "en-US"
recognition.interimResults = false
recognition.maxAlternatives = 1

export const praiseGod = () => {
  const jail = document.querySelector(".jail")
  jail.addEventListener("click", () => {
    recognition.start()

    comeToLife(1)

    console.log("Start chanting")
  })
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

const BREAK_TIME = 2000

recognition.onsoundstart = function () {
  startChanting()
}
recognition.onspeechend = function () {
  recognition.stop()
  comeToLife(0.3)
  stopChanting()
  console.log(`Take a deep breath and get back to it in ${BREAK_TIME} milliseconds`)

  setTimeout(() => {
    console.log("Keep going")
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
  console.log(event.error)
}
