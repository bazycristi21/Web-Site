    var timesPressed = 0 ;
    
    function removeImage()
    {
        var element = document.getElementById("removeMe");
        setTimeout(function(){ element.removeChild(element.childNodes[4]); }, 3000);
        
    }
    function swap()
    {
        timesPressed ++;
        localStorage.setItem('swapTimes', timesPressed);
        console.log(localStorage.getItem('swapTimes'));
        var i = 0;
        var colors = ['#00a8ff','#8c7ae6','#273c75','#44bd32','#e84118'];
        i = Math.floor(Math.random()*(colors.length-1));
        while(colors[i] == document.getElementsByTagName('P')[0].style.color)
            i = Math.floor(Math.random()*(colors.length-1));
        var paragraphs = document.getElementsByTagName('P');
        paragraphs[0].style.color=colors[i];
        var theCSSprop = window.getComputedStyle(paragraphs[0], null).getPropertyValue("color");
        for(var j = 1 ; j < paragraphs.length; j++)
        {
            paragraphs[j].style.color = theCSSprop;
        }
        var singleplayer = document.getElementById("singleplayer");
        var multyplayer = document.getElementById("multyplayer");
        singleplayer.setAttribute('onclick', "f2()");
        multyplayer.setAttribute('onclick', "f1()");
    }
    function f2()
    {
        window.location.href = "1vs1";
        document.getElementsByClassName("multiplayer").style.position = "absolute";
    } 
    function f1()
    {
        window.location.href = "breakout";
        document.getElementsByClassName("singleplayer").style.position = "absolute";
    } 
    function changeLink() {
        var link = document.getElementById("mylink");
        window.open(
        link.href,
        '_blank'
        );
        if(link.innerHTML == "Paypal")
        {
            link.innerHTML = "Paysafe";
            link.setAttribute('href', "https://www.paysafecard.com/ro-ro/");
            link.style.color= "red";
        }  
        else{
            link.innerHTML = "Paypal";
            link.setAttribute('href', "https://www.paypal.com/ro/home");
            link.style.color= "red";
        } 
        return false;
    }