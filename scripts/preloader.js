const preloader = document.querySelector(".preloader")
const preloaderText = document.querySelector(".preloader__text")
const preloaderTextSpan = document.querySelector(".preloader__text span")

document.addEventListener("readystatechange", () => {
	switch (document.readyState) {
		case "interactive":
			setTimeout(() => {
				preloaderTextSpan.style.transitionDuration = "0.7s"
				preloaderTextSpan.style.transform = "translateY(0)"
				preloaderText.classList.add("god__breathed")
			}, 100)

		case "complete":
			setTimeout(() => {
				preloaderTextSpan.style.transform = "translateY(160px)"
			}, 3000)
			setTimeout(() => {
				preloader.style.transform = "scaleX(0)"
			}, 4000)
	}
})
