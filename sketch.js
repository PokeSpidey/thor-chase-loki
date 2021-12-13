var attackImg, bgImg, destroyerImg, lokiImg, powerUpImg, tesseractImg, thorImg, LitOneImg;
var attck, bg, destroyer, loki, powerUp, tesseract, thor, litOne;
var powerUpGroup, destroyerGroup, attackGroup;
var playState = "rules";
var x, y, z, edges;

function preload() {
    attackImg = loadImage("attackImg2.png")
    bgImg = loadImage("bgImg5.png");
    destroyerImg = loadImage("destroyerImg.png");
    lokiImg = loadImage("lokiImg copy.png");
    powerUpImg = loadImage("powerUpImg.png");
    tesseractImg = loadImage("tesseractImg.png");
    thorImg = loadImage("thorImg.png");
    LitOneImg = loadImage("litOneImg3.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    bg = createSprite(width/2, height/2);
    bg.addImage(bgImg);
    bg.velocityX = -4;
    bg.scale = 1.5;

    thor = createSprite(width -  1280, height/2, 20, 20);
    thor.addImage(thorImg);
    thor.scale =  0.5;
    
    powerUpGroup = new Group();
    destroyerGroup = new Group();
    attackGroup = new Group();
    lokiGroup = new Group();
    litOneGroup = new Group();

    thor.setCollider("circle",0,0,250);
    thor.debug = false;

    x = 0;
    y = 5;
    z = 27;
}
function draw() {
    if (playState == "rules") {
        background(0);
        fill("aqua");
        stroke("yellow");
        strokeWeight(5);
        textSize(200);
        textFont("Times New Roman");
        text("THOR", width/2 - 300, height/2);
        textSize(150);
        text("CHASE LOKI", width/2 - 450, height/2 + 135);
        textSize(75);
        text("PRESS SPACE TO START", width/2 - 415, height/2 + 225)
        textSize(20);
        strokeWeight(2);
        text("UP ARROW: Move Up", 10, 20);
        text("DOWN ARROW: Move Down", 10, 40);
        text("ENTER/RETURN: Shoot", 10, 60);
        text("Collect 50 tesseract particles or hit him 27 times to win!", 490, 20);
        text("Each tesseract particle is guarded by a destroyer, hitting him makes you lose a life. Shoot once to eliminate him!", 490, 40);
        text("TOTAL 5 LIVES!", 490, 62);
        if(keyDown("space")) {
            playState = "play";
        }
    }
    else if (playState == "play") {
        background(200);
        edges = createEdgeSprites();
        thor.collide(edges);
        if (keyDown("enter")) {
            litOne = createSprite(0, 0, 20, 20);
            litOne.addImage(LitOneImg);
            litOne.scale = 0.1;
            litOne.y = thor.y  -  18;
            litOne.x = thor.x + 200;
            litOne.velocityX = 50;
            litOne.lifetime = 300;
            litOneGroup.add(litOne);
        }
        if (keyDown("UP_ARROW")) {
            thor.velocityY = -7
        }
        if (keyDown("DOWN_ARROW")) {
            thor.velocityY = 7
        }
        if (bg.x <= width - 1075)  {
            bg.x = width/2
        }
        if (thor.isTouching(powerUpGroup)) {
            x += 1;
            powerUpGroup.destroyEach();
        }
        if(thor.isTouching(destroyerGroup))  {
            destroyerGroup.destroyEach();
            y -= 1;
        }
        if(thor.isTouching(attackGroup))  {
            attackGroup.destroyEach();
            y -= 1;
        }
        if(lokiGroup.isTouching(litOneGroup)) {
            lokiGroup.destroyEach();
            litOneGroup.destroyEach();
            attackGroup.destroyEach();
            z -= 1;
        }
        if(destroyerGroup.isTouching(litOneGroup)) {
            destroyerGroup.destroyEach();
            litOneGroup.destroyEach();
        }
        if(z < 0 || y < 0) {
            playState = "end1";
        }
        if(x > 50) {
            playState = "end2";
        }
        addTP();
        attackThor();
        drawSprites();
        fill("blue");
        stroke("black");
        strokeWeight(5);
        textSize(30);
        textFont("Times New Roman"); 
        text("Tesseract Particles Collected: " + x, 5, 25);
    }
    else if  (playState == "end1") {
        background(0);
        fill("aqua");
        stroke("yellow");
        strokeWeight(5);
        textSize(25);
        textFont("Times New Roman"); 
        text("YOU FAILED! ASGARD IS NOW IN GRAVE DANGER!", width/2 - 600, height/2)
        textSize(25);
        text("PRESS 1 TO RESTART", width/2 - 300, height/2 + 25);
    }
    else if (playState == "end2") {
        bg.destroy();
        thor.destroy();
        powerUpGroup.destroyEach();
        destroyerGroup.destroyEach();
        lokiGroup.destroyEach();
        attackGroup.destroyEach();
        litOneGroup.destroyEach();
        tesseract = createSprite(200, 200, 0, 0);
        tesseract.addImage(tesseractImg);
        tesseract.scale = 0.5;
        background(0);
        fill("aqua");
        stroke("yellow");
        strokeWeight(5);
        textSize(25);
        textFont("Times New Roman"); 
        text("YOU SUCCEEDED! ASGARD IS SAFE AND LOKI IS FACING JUSTICE!", width/2 - 600, height/2)
        textSize(25);
        text("PRESS 1 TO RESTART", width/2 - 300, height/2 + 25);
        drawSprites();
    }
}

function attackThor() {
    if (x < 50) {
        if(frameCount % 240 == 0) {
            loki = createSprite(1360, 0, 20, 20);
            loki.addImage(lokiImg);
            loki.scale = 0.2;
            loki.y = random(200, height);
            loki.lifetime = 120;
            lokiGroup.add(loki);
            attack = createSprite(0, 0, 1459,  1);
            attack.addImage(attackImg);
            attack.lifetime = 60;
            attack.y = loki.y - 130;
            attack.x = loki.x -  270;
            attack.depth = loki.depth - 1;
            attack.scale = 0.05;
            attack.velocityX = -55;
            attackGroup.add(attack);
        }
    }
}
function addTP()  {
    if (x < 50) {
        if(frameCount % 150 == 0) {
            destroyer = createSprite(1500, 0, 20, 20);
            destroyer.addImage(destroyerImg);
            destroyer.scale = 0.3;
            destroyer.y = random(200, height)
            destroyer.velocityX = -10;
            destroyer.lifetime = 500;
            destroyerGroup.add(destroyer);
            powerUp = createSprite(1650, 0, 20, 20);
            powerUp.addImage(powerUpImg);
            powerUp.y = destroyer.y;
            powerUp.scale = 0.05;
            powerUp.velocityX = -10;
            powerUp.lifetime = 500;
            powerUpGroup.add(powerUp);
        }
    }
}