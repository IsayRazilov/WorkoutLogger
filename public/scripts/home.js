var counter = 0;
function changeBG(){
    var imgs = [ "url(../images/img1.jpg)","url(../images/img2.jpg)",
    "url(../images/img4.jpg)","url(../images/img6.jpg)","url(../images/img5.jpg)" ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 3000);


