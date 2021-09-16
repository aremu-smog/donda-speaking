var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

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

document.body.onclick = function () {
  recognition.start()
  console.log("Say Donda")
}

recognition.onresult = function (event) {
  const dondaOptions = new RegExp(donda_list.join("|"), "g")

  const resultFromSpeech = event.results[0][0].transcript

  const dondaMentions = resultFromSpeech.match(dondaOptions)

  const noOfDondaMentions = dondaMentions.length

  console.log(noOfDondaMentions)

  // Do firebase stuffs here
}

const BREAK_TIME = 5000
recognition.onspeechend = function () {
  recognition.stop()
  console.log(`Take a deep breath and get back to it in ${BREAK_TIME} milliseconds`)

  setTimeout(() => {
    console.log("Keep going")
    recognition.start()
  }, BREAK_TIME)
}

recognition.onnomatch = function (event) {
  console.log("Not Donda")
}

recognition.onerror = function (event) {
  console.log(event.error)
}
