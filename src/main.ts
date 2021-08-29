let counter = 1
let colorFill: string
let colorStroke: string
let darkMode: boolean

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
	darkMode = true
	colorFill = 'black'
	colorStroke = 'white'
} else {
	darkMode = false
	colorFill = 'white'
	colorStroke = 'black'
}

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (event) => {
		if (event.matches) {
			darkMode = true
			colorFill = 'black'
			colorStroke = 'white'
		} else {
			darkMode = false
			colorFill = 'white'
			colorStroke = 'black'
		}
	})

const preAppend = `data:image/svg+xml;base64,`
const WINDOW_URL = window.URL || window.webkitURL || window
const faviconLink = document.querySelector<HTMLLinkElement>('[rel*="icon"]')!
const svg = document.querySelector<SVGGraphicsElement>('#animate-svg')!
const toggleButton = document.querySelector<HTMLButtonElement>('button')!
const theme = document.documentElement

const svgPath = `M407.822,43.73L407.822,138.025L678.8,138.025L678.8,631.322C678.8,782.436 609.112,985.634 280.5,820.514C250.043,865.627 228.362,895.887 228.362,895.887C228.362,895.887 327.122,980.27 472.502,980.27C617.881,980.27 687.783,930.029 734.658,871.898C781.534,813.766 795.638,720.471 795.638,655.505L795.638,43.73L407.822,43.73Z`

const canvas = document.createElement('canvas')
// const canvas = document.querySelector('canvas')!
const ctx = canvas.getContext('2d')!
const p = new Path2D(svgPath)
canvas.width = 256
canvas.height = 256
ctx.lineWidth = 40
ctx.lineCap = 'round'
ctx.lineJoin = 'round'
ctx.scale(0.25, 0.25)

function draw() {
	ctx.strokeStyle = colorStroke
	ctx.fillStyle = colorFill
	if (counter > 10000) {
		counter = 1
	}
	counter += 200
	ctx.fillRect(0, 0, 1024, 1024)
	ctx.lineDashOffset = counter
	ctx.setLineDash([3100, 400])
	ctx.stroke(p)
	const data = canvas.toDataURL()
	faviconLink.href = data
}

let interval = setInterval(draw, 300)

toggleButton.addEventListener('click', function () {
	if (darkMode) {
		theme.setAttribute('data-theme', 'light')
		darkMode = false
		colorFill = 'white'
		colorStroke = 'black'
	} else {
		theme.setAttribute('data-theme', 'dark')
		darkMode = true
		colorFill = 'black'
		colorStroke = 'white'
	}
})
