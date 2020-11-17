let video, click
var myFont;
let poseNet;
let pose;
let skeleton;
let d1, d2, k, wingR;
let maskH, start;
let mask = 0;
let offset = 0;

function setup() {
  createCanvas(640, 480);
  myFont = loadFont("knewave.otf");
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  click = new Clickable();
  
  click.text = "Change Mask"
  click.textFont = "myFont";
  click.cornerRadius = 14;
  click.strokeWeight = 0;
  click.x = 50;
  click.y = 400;
  
  click.width = 100;
  click.height = 40;
  click.onPress = function () {
  if (mask === 0){
      mask = 1;
      pt1 = loadImage('h1.png');
      pt2 = loadImage('h2.png');
      pt3 = loadImage('h3.png');
      pt4 = loadImage('h4.png');
      pt5 = loadImage('h5.png');
      pt6 = loadImage('h6.png');
      click.color = "#f5e9ab";
  } else if (mask === 1) {
      mask = 0;
      pt1 = loadImage('1.png');
      pt2 = loadImage('2.png');
      pt3 = loadImage('3.png');
      pt4 = loadImage('4.png');
      pt5 = loadImage('5.png');
      pt6 = loadImage('6.png');
      click.color = "#e3e3e3";
  }}
    
  if (mask === 0){
  pt1 = loadImage('1.png');
  pt2 = loadImage('2.png');
  pt3 = loadImage('3.png');
  pt4 = loadImage('4.png');
  pt5 = loadImage('5.png');
  pt6 = loadImage('6.png');
  click.color = "#e3e3e3";
}}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);
    
  if (pose) {
    print(pose);
      
    if (pose.nose.confidence > 0.6) {
    let earL = pose.leftEar;
    let eyeL = pose.leftEye;
    let eyeR = pose.rightEye;
    let earR = pose.rightEar;
    let nose = pose.nose;
    if (eyeL.y > eyeR.y) {
        maskH = (nose.y - eyeR.y)*3.5;
        start = eyeR.y - maskH/1.8;
    } else if (eyeR.y >= eyeL.y) {
        maskH = (eyeL.y - nose.y)*3.5;
        start = eyeR.y - maskH/1.8;
    }
      
    if (mask === 1){
        offset = 30;
    }
    if (mask === 0){
        offset = 0;
    }
          d1 = eyeR.x-earR.x;
          d2 = earL.x-eyeL.x;
          wing = (d1-d2)*0.2;

    if (d2 < (d1/2.5)){
      image(pt1, earR.x-50+d1*2/3-wing+offset, start+offset/3, 50+wing-offset, maskH);
      image(pt2, earR.x+d1*2/3, start+offset/3, d1*1/3, maskH);
    } else {
      image(pt1, earR.x-50+d1/7-wing+offset, start+offset/3, 50+wing-offset, maskH);
      image(pt2, earR.x+d1/7, start+offset/3, d1*6/7, maskH);
    }
      image(pt3, eyeR.x, start+offset/3, nose.x-eyeR.x, maskH);
      image(pt4, nose.x-3, start+offset/3, eyeL.x-nose.x+5, maskH);
    if (mask === 0){
    if (d1 < (d2/2)){
      image(pt5, eyeL.x, start+offset/3, d2*2/3, maskH);
      image(pt6, earL.x-d2*1/3, start+offset/3, 50-wing, maskH);
    } else {
      image(pt5, eyeL.x, start+offset/3, d2*6/7, maskH);
      image(pt6, earL.x-d2/7, start+offset/3, 50-wing, maskH);
    }}
}}
  click.draw();
    //image(pt2, 58, 400, 42, 40);
}