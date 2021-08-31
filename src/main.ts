type PositiveOrNegative = 1 | -1

let opacity = 1
let oscilator = 0.1
let positiveOrNegative = -1
let darkMode: boolean
let colorFill: string
let backgroundColor: string

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	darkMode = true
	colorFill = '255, 255, 255'
	backgroundColor = '0, 0, 0'
} else {
	darkMode = false
	colorFill = '0, 0, 0'
	backgroundColor = '255, 255, 255'
}

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (event) => {
		if (event.matches) {
			darkMode = true
			colorFill = '0, 0, 0'
			backgroundColor = '255, 255, 255'
		} else {
			darkMode = false
			colorFill = '255, 255, 255'
			backgroundColor = '0, 0, 0'
		}
	})

const theme = document.documentElement
const faviconLink = document.querySelector<HTMLLinkElement>('[rel*="icon"]')!
const svg = document.querySelector<SVGGraphicsElement>('#animate-svg')!
const canvasWrapper = document.querySelector<HTMLElement>('.canvas-grid')!
const toggleThemeButton = document.querySelector<HTMLButtonElement>(
	'[data-toggle="theme"]',
)!
const toggleCanvasButton = document.querySelector<HTMLButtonElement>(
	'[data-toggle="canvas"]',
)!

toggleCanvasButton.innerText = 'Show canvas'

function toggleMode() {
	if (darkMode) {
		toggleThemeButton.innerText = 'Light mode'
	} else {
		toggleThemeButton.innerText = 'Dark mode'
	}
}

const svgPath = `M407.822,43.73L407.822,138.025L678.8,138.025L678.8,631.322C678.8,782.436 609.112,985.634 280.5,820.514C250.043,865.627 228.362,895.887 228.362,895.887C228.362,895.887 327.122,980.27 472.502,980.27C617.881,980.27 687.783,930.029 734.658,871.898C781.534,813.766 795.638,720.471 795.638,655.505L795.638,43.73L407.822,43.73Z`

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')!
const p = new Path2D(svgPath)

canvas.width = 256
canvas.height = 256
ctx.scale(0.25, 0.25)

function draw() {
	ctx.clearRect(0, 0, 1024, 1024)

	if (opacity >= 1 && positiveOrNegative === 1) {
		positiveOrNegative = -1
	}
	if (opacity <= 0 && positiveOrNegative === -1) {
		positiveOrNegative = 1
	}
	opacity = opacity + oscilator * positiveOrNegative

	// Background rectangle
	ctx.beginPath()
	ctx.fillStyle = `rgb(${backgroundColor})`
	ctx.fillRect(0, 0, 1024, 1024)
	ctx.closePath()

	// J fill style
	ctx.beginPath()
	ctx.fillStyle = `rgba(${colorFill}, ${opacity})`
	ctx.fill(p)
	ctx.closePath()
	const data = canvas.toDataURL()
	faviconLink.href = data
}

toggleMode()
setInterval(draw, 200)

toggleThemeButton.addEventListener('click', function () {
	if (darkMode) {
		theme.setAttribute('data-theme', 'light')
		darkMode = false
		colorFill = '0, 0, 0'
		backgroundColor = '255, 255, 255'
	} else {
		theme.setAttribute('data-theme', 'dark')
		darkMode = true
		colorFill = '255, 255, 255'
		backgroundColor = '0, 0, 0'
	}
	toggleMode()
})

toggleCanvasButton.addEventListener('click', function () {
	if (canvasWrapper.hasChildNodes()) {
		canvasWrapper.removeChild(canvas)
		toggleCanvasButton.innerText = 'Show canvas'
		canvasWrapper.setAttribute('data-canvas', 'closed')
	} else {
		canvasWrapper?.appendChild(canvas)
		toggleCanvasButton.innerText = 'Hide canvas'
		canvasWrapper.setAttribute('data-canvas', 'open')
	}
})
