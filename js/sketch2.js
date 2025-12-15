function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
  
function setup() {
    canvas = createCanvas(windowWidth,windowHeight)
    canvas.position(0,0)//canvasをページの原点に固定
    canvas.style('z-index','-1')//canvasを後ろに移動する
    background(0);
    colorMode(HSB, 360, 100, 100, 100)
}

let i=0

function draw() {
    frameRate(30)
    i += 1
    stroke(i*10%360,100,100,100)
    strokeWeight(20)
    point(mouseX,mouseY)
}