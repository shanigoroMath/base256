
let mu = 0, g=9.8, h=0.0005, rho0V=0, G=100, k_a=0, k_s=0
let list_xym = []

class obj{
  constructor(init_x,init_y,init_vx,init_vy,init_m,init_col){
    this.x=init_x
    this.y=init_y
    this.vx=init_vx
    this.vy=init_vy
    this.ax=0
    this.ay=0
    this.m=init_m
    this.col=init_col
    list_xym.push([init_x,init_y,init_m])
    this.num=list_xym.length
  }
  update(){
    list_xym[this.num-1]=[this.x,this.y,this.m]
    let Fx = 0
    let Fy = 0
    let m = this.m
    if(this.vx != 0){Fx = -mu*m*g*this.vx/sqrt(this.vx**2+this.vy**2)}
    if(this.vy != 0){Fy = -mu*m*g*this.vy/sqrt(this.vx**2+this.vy**2)}
    Fx += -k_a*this.vx
    Fy += -k_a*this.vy
    Fx += -k_s*this.x
    Fy += -k_s*this.y
    for(let i=1;i<=list_xym.length;i++){
      if(i!=this.num){
        let X = this.x-list_xym[i-1][0]
        let Y = this.y-list_xym[i-1][1]
        let M = list_xym[i-1][2]
        Fx += -G*this.m*M*X/((X**2+Y**2)**1.5)
        Fy += -G*this.m*M*Y/((X**2+Y**2)**1.5)
      }
    }
    if(this.num==1){
      Fx = 0
      Fy = 0
    }
    this.ax = Fx/m
    this.ay = Fy/m
    this.vx += this.ax*h
    this.vy += this.ay*h
    this.x += this.vx*h
    this.y += this.vy*h
  }
  draw(){
    strokeWeight(6*log(this.m+1))
    stroke(this.col,100,100)
    let X = width/2+this.x*10
    let Y = height/2-this.y*10
    point(X,Y)
    strokeWeight(1)
    let VX = 40*this.vx/sqrt(this.vx**2+this.vy**2)
    let VY = -40*this.vy/sqrt(this.vx**2+this.vy**2)
    line(X,Y,X+VX,Y+VY)
    line(X+VX,Y+VY,X+VX-0.2*(VX-VY),Y+VY-0.2*(VX+VY))
    line(X+VX,Y+VY,X+VX-0.2*(VX+VY),Y+VY+0.2*(VX-VY))
    line(X,Y,X+40*this.ax/sqrt(this.ax**2+this.ay**2),Y-40*this.ay/sqrt(this.ax**2+this.ay**2))
    noStroke()
    text("#"+str(this.num)+":"+str(round(this.x,3))+","+str(round(this.y,3)),X,Y)
  }
}

//系
let A = [new obj(0,0,0,0,20000,0)]

function windowResized() {
  resizeCanvas(windowWidth-100, windowHeight-200)
}

function setup() {
  canvas = createCanvas(windowWidth-100,windowHeight-200)
  canvas.position(50,450)//canvasをページの原点に固定
  canvas.style('z-index','-1')//canvasを後ろに移動する
  colorMode(HSB,100)
  for(let i=0;i<=50;i++){
    let r = random(5,60)
    let t = random(0,2*PI)
    let X = r*cos(t)
    let Y = r*sin(t)
    let v = random(5000,7000)
    A.push(new obj(X,Y,-v*Y/((X**2+Y**2)),v*X/((X**2+Y**2)),random(1,10),random(0,99)))
  }
}

function bg(){
  background(255)
  strokeWeight(0.5)
  stroke(0)
  for(let i=50;i<max(height,width)/2;i+=50){
    line(0,height/2+i,width,height/2+i)
    line(0,height/2-i,width,height/2-i)
    line(width/2+i,0,width/2+i,height)
    line(width/2-i,0,width/2-i,height)
    text(i/10,width/2+i,height/2)
    text(-i/10,width/2-i,height/2)
    text(i/10,width/2,height/2-i)
    text(-i/10,width/2,height/2+i)
  }
  strokeWeight(1)
  line(0,height/2,width,height/2)
  line(width/2,0,width/2,height)
}

function draw() {
  bg()
  for(let i=0;i<=A.length-1;i++){
    A[i].update()
    A[i].draw()
  }
  let K=0, i=0
  for(;i<=A.length-1;i++){
    let K_i = A[i].m*(A[i].vx**2+A[i].vy**2)
    fill(60)
    text(round(K_i),0,10*i+10)
    text(round(A[i].m*sqrt(A[i].ax**2+A[i].ay**2)),60,10*i+10)
    K += K_i
  }
  fill(0)
  text(round(K),0,10*(i+2))
}