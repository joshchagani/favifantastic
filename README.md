# ⚡ FaviFantastic

✨ Live URL: [https://favifantastic.com](https://favifantastic.com) ✨

Dynamically changing favicon - working in Chrome and Firefox. No mobile support.

## 🙏 Purpose

The biggest innovation favicon's have had in the last 38 years was expanding support from `ICO` to `PNG`. I wanted to see if it was possible to have a dynamically generated, ever-changing favicon - **Spoiler Alert** - you can!

## 🤓 Technology

No frameworks needed, friends! Every line of code is 100% vanilla goods. Not a single external dependencies needed. I mean... _technically_ TypeScript was used so it isn't _entirely_ vanilla, but I didn't use a single thing that wasn't ES6. OKAY!?!!1!?

## 🤷‍♂️ How is such magic possible?

The "J" was created in Affinity Designer and exported as an SVG path. These paths were used to draw the "J" to `<canvas>`. Having the canvas set to 1024x1024 is mostly arbitrary and more so laziness on my part. When I created the "J" I had set the document size to 1024x1024 and didn't save the original file. Not wanting to re-create the SVG at a more appropriate size I just scaled the `<canvas>` to 25% of its original size. This left it large enough to be nicely shown in the DOM while providing significantly less characters when I call `canvas.toDataURL()`.

`window.requestAnimationFrame` performs the fading animation and a `setInterval` is used to periodically write the canvas dataUrl to the favicon `<link href>`. The interval delay is at 150ms. That was the fastest I was able to update the favicon before the browser stopped showing it entirely.

I added "light" and "dark" modes for extra pizzazz. The files are hosted in an AWS S3 bucket and served to you via CloudFront. All code is automatically deployed when a new tag is push into the branch.

## 🚀 Future enhancements

- [ ] Manage state with XState
- [ ] Animate showing and hiding `<canvas>`
- [ ] Allow user to change aspects of the canvas animation

## 💻 Installation

1. Clone the project locally
2. `npm install`
3. `npm dev`
