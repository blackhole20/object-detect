var img="";

status="";

objects=[];

function preload(){
img=loadImage("dog_cat.jpg");
}

function setup(){
canvas=createCanvas(380,380);
canvas.center();

video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectdetector=ml5.objectDetector("cocossd",modalloaded);
document.getElementById("status").innerHTML="status : detecting objects";
}

function draw(){
image(video,0,0,380,380);

if (status !="") {
    r=random(255);
    g=random(255);
    b=random(255);
    objectdetector.detect(video,gotresult);
   for (i=0; i<objects.length; i++){
       document.getElementById("status").innerHTML="status : objects detected";
       document.getElementById("number_of_objects").innerHTML="number of objects detected are : "+objects.length;
       fill(r,g,b);
       percent= floor(objects[i].confidence*100);
       text(objects[i].label+" "+percent+"%",objects[i].x+10,objects[i].y+20);
       noFill();
       stroke(r,g,b);
       rect(objects[i].x-50,objects[i].y,objects[i].width,objects[i].height);
   } 
}
}

function modalloaded(){
    console.log("modalloaded");
    status=true;
    
}

function gotresult(error,results){
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects=results;
}