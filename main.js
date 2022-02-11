objectIdentifier = "";
img1 = "";
objects=[];
Status = "";
img2 = "";

function preload(){
    img1 = loadImage("dog_cat.jpg");
    img2 = loadImage("dining.jpg")
}

function setup(){
    canvas = createCanvas(640 ,420);
    canvas.center();
    objectIdentifier = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Object";
}

function draw(){
    image(img2,0,0,640,420);
    if(Status != ""){
    document.getElementById("status").innerHTML="Status: Detected Object";
    for(i=0; i<objects.length; i++){
    fill("red");
    percent = floor(objects[i].confidence*100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
    noFill();
    stroke("red");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
    
}

function modelLoaded(){
    console.log("model is loaded");
    Status = true;
    objectIdentifier.detect(img2, gotResults);
}

function gotResults(error , Results){
    if(error){
        console.error(error);
    }
    console.log(Results);
    objects = Results;
}