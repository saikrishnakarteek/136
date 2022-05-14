video ="";
objects=[];
status ="";

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video,0,0,480,380);
    if( status != ""){   
     objectDetector.detect(video, GotResult);
    for( i=0; i<objects.length; i++){
    document.getElementById("Status").innerHTML = "Status : Objects Detected";
    document.getElementById("ObjectDetected").innerHTML= "Number of objects detected" + objects.length;
     fill("Blue");
     percent = floor(objects[i].confidence * 100);
     text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
     noFill();
     stroke("red");
     rect(objects[i].x, objects[i].y , objects[i].width , objects[i].height);
     }
    }
 }

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("Status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
 console.log("Model Loaded!")
 video.loop();
 video.voulme(0);
 video.speed(1);
 status= true;
}

function GotResult(error,results){
    if (error){
        console.log(error);
    }

    if (results){
        console.log(results);
        objects = results;
    }
}


