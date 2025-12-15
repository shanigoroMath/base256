function windowResized() {
  resizeCanvas(windowWidth-10, windowHeight)
}

function setup() {
  canvas = createCanvas(windowWidth-10,windowHeight)
  canvas.position(0,300)//canvasをページの原点に固定
  canvas.style('z-index','-1')//canvasを後ろに移動する
  background(0);
}

let angle=0

function draw() {
  frameRate(60);
  background(50);
  angle += 0.1
  for(let i=0;i<6.28;i+=0.157){
    push()
    circle(100*cos(angle),100*sin(angle),100)
    pop()
  }
}