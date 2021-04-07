var ques=[];
var a,b,c,d,index;
var ai,bi,ci,di;
var score;
var playerCount=0;
var na,submit;
var db;

function preload()
{
    ai=loadImage("a.png");
    bi=loadImage("b.png");
    ci=loadImage("c.png");
    di=loadImage("d.png");


}

function setup()
{
    createCanvas(800,700);

    db=firebase.database();

    na=createInput("Enter Name here: ");
    na.position(width/2-60,height/2);
    na.size(200,30);
    submit=createButton("START");
    submit.position(width/2-20,height/2+50);
    submit.size(80,30);

    index=-1;
    score=0;

    ques=[
        ["Who is Doraemon's best friend?","Nobita","Jian","Suneo","Sizuka",1],
        ["Who is Jian's sister?","Shizuka","Jackio","Mi Chan","None Of These",2],
        ["Which of these statements is correct?","Doraemon is a dogrobot","Doraemon always listens to Nobita.","All Of These","None of these",4],
        ["The time when Nobita used the \n Multiplier bank he had how much money?","Rs 100","Rs 5","Rs 10","Rs 1",3], 
        ["Who likes to sing?","Suneo","Jian","Nobita","Shizuka",2]
    ]

    a=createSprite(300,295,20,20);
    a.addImage(ai);
    a.scale=0.04;
    a.visible=false;
    b=createSprite(300,340,20,20);
    b.addImage(bi);
    b.scale=0.4;
    b.visible=false;
    c=createSprite(300,395,20,20);
    c.addImage(ci);
    c.scale=0.2;
    c.visible=false;
    d=createSprite(300,445,20,20);
    d.addImage(di);
    d.scale=0.3;
    d.visible=false; 

    db.ref("contestantCount").on("value",function(u){
        playerCount=u.val();
    });

   // d.visible=false; 

}

function draw()
{
    console.log(playerCount);
    background(235);

    if(playerCount==2)
    {
        index=0;
    }

    if(index==-1)
    {

        submit.mousePressed(function(){
            na.hide();
            submit.hide();
           var n=na.value();
           playerCount+=1;
           db.ref("/").update({"contestantCount":playerCount});
           db.ref("Players/Player"+playerCount).update({"Name":n});
           index=-1.5;
         
        });
        

    }else if(index==-1.5)
    {
        text("Waiting for Player 2......",width/2,height/2);
    }
    else if(index!=ques.length&&index!=-1)
    {

        a.visible=true;
        b.visible=true;
        c.visible=true;
        d.visible=true;
        textSize(30);
    fill("red");
    text(ques[index][0],200,200);
    textSize(25);
    fill("magenta");
    text(ques[index][1],350,300);
    text(ques[index][2],350,355);
    text(ques[index][3],350,405);
    text(ques[index][4],350,455);

    if(mouseIsOver(a) && mouseWentDown("leftButton"))
    {
        check(1);
    }
    if(mouseIsOver(b) && mouseWentDown("leftButton"))
    {
        check(2);
    }
    if(mouseIsOver(c) && mouseWentDown("leftButton"))
    {
        check(3);
    }
    if(mouseIsOver(d) && mouseWentDown("leftButton"))
    {
        check(4);
    }

    text("Score: "+score,600,50);

    drawSprites();

}  
else {

    textSize(50);
    text("GAME OVER",width/2-170,height/2);
    text("You have scored "+score+"/"+ques.length,width/2-220,height/2+50)

}
}

function check(a)
{
   if(a==ques[index][5])
   {
       score+=1;
       db.ref("Players/Player"+playerCount).update({"Score":score});
   }

   index+=1;
}