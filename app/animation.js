//------------------------------------------------------
// -----------------Options-----------------------------
//------------------------------------------------------

const circlesNumber = 100
const linkDistance = 150
const linkThickness = 30
const animationSpeed = 0.3
const minCircleRadius = 2
const maxCircleRadius = 7

//------------------------------------------------------
// -----------------Setup-------------------------------
//------------------------------------------------------

const width = window.innerWidth // eslint-disable-line
const height = window.innerHeight // eslint-disable-line

const requestAnimationFrame = window.requestAnimationFrame || // eslint-disable-line
                              window.mozRequestAnimationFrame || // eslint-disable-line
                              window.webkitRequestAnimationFrame || // eslint-disable-line
                              window.msRequestAnimationFrame // eslint-disable-line


const canvas = document.createElement('canvas') // eslint-disable-line
  // ctx = canvas.getContext('2d'),
  // cw = canvas.width = 200,
  // ch = canvas.height = 200;


// const canvas = document.getElementById('root') // eslint-disable-line
const ctx = canvas.getContext('2d')

ctx.canvas.width = width
ctx.canvas.height = height
ctx.strokeStyle = '#ff8ea8'
ctx.fillStyle = 'black'

//------------------------------------------------------
// -----------------Helpers-----------------------------
//------------------------------------------------------

function calculateDistance (c1, c2) {
  const a = (c1.x + c1.direction.dirX) - (c2.x + c2.direction.dirX)
  const b = (c1.y + c1.direction.dirY) - (c2.y + c2.direction.dirY)
  return Math.sqrt((a * a) + (b * b))
}

function drawLink (c1, c2) {
  ctx.lineWidth = linkThickness / calculateDistance(c1, c2)
  ctx.beginPath()
  ctx.moveTo(c1.x, c1.y)
  ctx.lineTo(c2.x, c2.y)
  ctx.stroke()
}

//------------------------------------------------------
// -----------------Circle------------------------------
//------------------------------------------------------

class Circle {
  constructor ({ id, x, y, radius, direction }) {
    this.id = id
    this.x = x
    this.y = y
    this.radius = radius
    this.direction = direction
  }

  // change the previous direction of the circle
  changeDirectionX () {
    this.direction.dirX = -this.direction.dirX
  }

  changeDirectionY () {
    this.direction.dirY = -this.direction.dirY
  }

  // move the circle in his direction
  move (circles) {
    circles.forEach((circle) => {
      if (circle !== this) {
        // detect collision with another circle
        if (calculateDistance(circle, this) <= circle.radius + this.radius) {
            this.changeDirectionX()
            this.changeDirectionY()
        }

        // draw the link between circles if in range
        if (calculateDistance(circle, this) <= circle.radius + this.radius + linkDistance) {
          drawLink(this, circle)
        }
      }
    })

    if (this.x + this.direction.dirX + this.radius >= width ||
       (this.x + this.direction.dirX) - this.radius <= 0) {
      this.changeDirectionX()
    }

    if (this.y + this.direction.dirY + this.radius >= height ||
      (this.y + this.direction.dirY) - this.radius <= 0) {
      this.changeDirectionY()
    }

    this.x += this.direction.dirX
    this.y += this.direction.dirY

    ctx.lineWidth = 3
    this.render(canvas, ctx)
    ctx.fill()
  }

  // render the circle
  render (c, context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    context.stroke()
  }
}

//------------------------------------------------------
// -----------------Circle Generators-------------------
//------------------------------------------------------

// generate single circle
function createCircle (number) {
  return new Circle({
    id: number,
    x: Math.floor((Math.random() * (width - maxCircleRadius)) + maxCircleRadius),
    y: Math.floor((Math.random() * (height - maxCircleRadius)) + maxCircleRadius),
    radius: Math.floor((Math.random() * maxCircleRadius) + minCircleRadius),
    direction: { dirX: Math.random() * animationSpeed, dirY: Math.random() * animationSpeed }
  })
}

// generate given number of circles
function generate (elements) {
  const circles = []

  for (let i = 0; i < elements; i += 1) {
    circles.push(i)
  }

  circles.forEach((element) => {
    const id = element
    let circle = createCircle(id)

    circles.forEach((check) => {
      if (check !== circle && typeof check === 'object') {
        while (calculateDistance(circle, check) <= circle.radius + check.radius) {
          circle = createCircle(id)
        }
      }
    })
    circles[id] = circle
  })

  return circles
}

//------------------------------------------------------
// -----------------Animation---------------------------
//------------------------------------------------------

// generate circles array
const circles = generate(circlesNumber)

// animate circles
function animate () {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  circles.forEach((circle) => { circle.move(circles) })
  document.body.style.background = 'url(' + canvas.toDataURL() + ')';
}

animate()


