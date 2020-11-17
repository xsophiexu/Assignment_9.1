let video;
let poseNet;
let pose;
let skeleton;
let d1, d2, k, wingR;
let maskH, start;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  pt1 = loadImage('1.png');
  pt2 = loadImage('2.png');
  pt3 = loadImage('3.png');
  pt4 = loadImage('4.png');
  pt5 = loadImage('5.png');
  pt6 = loadImage('6.png');
}

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
    } else if (eyeR.y >= eyeL.y) {
        maskH = (eyeL.y - nose.y)*3.5;
    }     start = eyeR.y - maskH/1.8;
          d1 = eyeR.x-earR.x;
          d2 = earL.x-eyeL.x;
          wing = (d1-d2)*0.2;
    /*k = abs(d1/d2);
    text(k, 20, 40);
    if(eyeL.y-eyeR.y > 20){
        rotate(PI/4);
        translate(80, -300);
    }*/
    if (d2 < (d1/2)){
      image(pt1, earR.x-50+d1*2/3-wing, start, 50+wing, maskH);
      image(pt2, earR.x+d1*2/3, start, d1*1/3, maskH);
    } else {
      image(pt1, earR.x-50+d1/7-wing, start, 50+wing, maskH);
      image(pt2, earR.x+d1/7, start, d1*6/7, maskH);
    }

      image(pt3, eyeR.x, start, nose.x-eyeR.x, maskH);
      image(pt4, nose.x-3, start, eyeL.x-nose.x+5, maskH);
    if (d1 < (d2/2)){
      image(pt5, eyeL.x, start, d2*2/3, maskH);
      image(pt6, earL.x-d2*1/3, start, 50-wing, maskH);
    } else {
      image(pt5, eyeL.x, start, d2*6/7, maskH);
      image(pt6, earL.x-d2/7, start, 50-wing, maskH);
    }
        

    //let d = dist(earR.x, earR.y, earL.x, earL.y);
    //fill(255, 0, 0, 50);
    //ellipse(pose.nose.x, pose.nose.y, d, d*1.25);
    
    //nose, leftEye, rightEye, ear/shoulder/elbow/wrist
    /*for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      if (pose.keypoints[i].score > .5) {
        ellipse(x, y, 16, 16);
      }
    }*/
}}
}
