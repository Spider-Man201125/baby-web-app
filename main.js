song = "";
status = "";
objects = [];

function preload(){
    song = loadImage('alert.mp3');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO); 
    video.size(380,380); 
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(img, 0, 0, 640, 420);


        if(status !="")
        {
            for (i = 0; i < objects.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Object Detected";

                fill("#FF0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);                noFill();
                stroke("#FF0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                if(objects[i].label == "person") { document.getElementById("number_of_objects").innerHTML = "Baby Found"; console.log("stop"); song.stop(); } else { document.getElementById("number_of_objects").innerHTML = "Baby Not Found"; console.log("play"); song.play(); } } if(objects.length == 0) { document.getElementById("number_of_objects").innerHTML = "Baby Not Found"; console.log("play"); song.play();
                }
        }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
