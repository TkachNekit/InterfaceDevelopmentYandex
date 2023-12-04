let index = 0
let count = 8
let x1 = null;
let y1 = null;

const handleTouchMove = (e) => {
  if (!x1 || !y1) {
    return false
  }

  let x2 = e.touches[0].clientX;
  let y2 = e.touches[0].clientY;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      like()
    } else {
      nope()
    }
  }

}

const handleTouchStart = (e) => {
  const firstTouch = e.touches[0];

  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;

}

document.querySelector(".cards").addEventListener("touchstart", handleTouchStart)
document.querySelector(".cards").addEventListener("touchmove", handleTouchMove)

function press(t) {
  const button = document.getElementsByClassName(t)[0]
  button.style.boxShadow = '0 0 7px #404040'
  setTimeout(() => {
    button.style.boxShadow = 'none'
  }, 100)
}

function like() {
  press("like")
  const current = document.getElementsByClassName("pig" + index)[0]
  const next = document.getElementsByClassName("pig" + ((index + 1) % count))[0]
  current.style['z-index'] = 2
  next.style['z-index'] = 1
  current.style['left'] = '120vw'
  setTimeout(() => {
    current.style['z-index'] = 0
    current.style['left'] = '0'
  }, 400)
  index = (index + 1) % count
}

function sup() {
  press("super")
  const current = document.getElementsByClassName("pig" + index)[0]
  const next = document.getElementsByClassName("pig" + ((index + 1) % count))[0]
  current.style['z-index'] = 2
  next.style['z-index'] = 1
  current.style['bottom'] = '100vh'
  setTimeout(() => {
    current.style['z-index'] = 0
    current.style['bottom'] = '0'
  }, 400)
  index = (index + 1) % count
}

function nope() {
  press("nope")
  let current = document.getElementsByClassName("pig" + index)[0]
  let next = document.getElementsByClassName("pig" + ((index + 1) % count))[0]
  current.style['z-index'] = 2
  next.style['z-index'] = 1
  current.style['left'] = '-120vw'
  setTimeout(() => {
    current.style['z-index'] = 0
    current.style['left'] = '0'
  }, 400)
  index = (index + 1) % count
}
