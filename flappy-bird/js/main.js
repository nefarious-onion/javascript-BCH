$(document).ready(function(){
    var windowHeight = $(window).height();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makePipe(){
        return {
            pipeId: null,
            pipeSize: null,
            leftOffset: null,
            movementRatio: null,
            flip: false,
            addPipe: function(){
                var _newPipe = document.createElement('img');
                _newPipe.src = 'assets/images/pipe.png';
                _newPipe.id = this.pipeId;
                _newPipe.style.height = this.pipeSize + 'px';               
                _newPipe.style.left = this.leftOffset + 'px';

                if (this.flip) {
                    _newPipe.style.top = 0;
                    _newPipe.style.transform = 'rotate(180deg)';
                } else {
                    _newPipe.style.top = windowHeight - this.pipeSize + 'px';
                }

                document.body.appendChild(_newPipe);
            },
            moveLeft: function(scrollDistance){
                document.getElementById(this.pipeId).style.left = this.leftOffset - scrollDistance / this.movementRatio + 'px';
            },
            init: function(flip){
                this.pipeId = 'pipe_' + getRandomInt(0, 12345);
                this.pipeSize = getRandomInt(100, 500);
                this.movementRatio = this.pipeSize / 10;
                this.leftOffset = getRandomInt(200, 2000);
                this.flip = (flip === true);
                this.addPipe();
            }
        };
    }

    function makeBird(){
        return {
            birdId: null, // bird_XXXX
            birdSize: null, // integer
            movementRatio: null, // to be divided from scrolling pixels
            topOffset: null,
            bounceRate: null,
            addBird: function(){
                var _newBird = document.createElement('img');
                
                _newBird.src = 'assets/images/bird.png';
                _newBird.className = 'bird';
                _newBird.id = this.birdId;

                _newBird.style.width = this.birdSize + 'px';
                _newBird.style.left = this.birdSize + 'px';
                _newBird.style.top = this.topOffset + '%';
                _newBird.style.filter = 'hue-rotate(' + getRandomInt(0, 270) +'deg)';

                document.body.appendChild(_newBird);
            },
            fly: function(scrollDistance){
                document.getElementById(this.birdId).style.left = this.birdSize + scrollDistance / this.movementRatio + 'px';

                if (!$('#' + this.birdId).is(':animated')) {
                    $('#' + this.birdId).animate({ 'top': '+=100px' }, this.bounceRate).animate({ 'top': '-=100px' }, this.bounceRate);
                }
            },
            init: function(){
                this.topOffset = getRandomInt(10, 70);
                this.movementRatio = getRandomInt(10, 50);
                this.birdId = 'bird_' + getRandomInt(0, 12345);
                this.birdSize = getRandomInt(10, 500); // 500px
                this.bounceRate = getRandomInt(100, 300);
                this.addBird();
            }
        };
    }

    var pipe1 = makePipe(),
        pipe2 = makePipe(),
        pipe3 = makePipe(),
        pipe4 = makePipe(),
        pipe5 = makePipe(),
        pipe6 = makePipe(),
        pipe7 = makePipe();

    pipe1.init();
    pipe2.init();
    pipe3.init();
    pipe4.init();
    pipe5.init();
    pipe6.init();
    pipe7.init(true);

    var bird1 = makeBird(),
        bird2 = makeBird(),
        bird3 = makeBird(),
        bird4 = makeBird();

    bird1.init();
    bird2.init();
    bird3.init();
    bird4.init();
    
    $(window).scroll(function(event) {
        var offset = $(window).scrollTop();
        // $(window).scrollTop gives you the distance
        // to the top of the page
        var imgX = offset / 50;
        
        console.log(imgX);
        // move these elements sideway
        $('#background').css('background-position', imgX + 'px 0px');
        bird1.fly(offset);
        bird2.fly(offset);
        bird3.fly(offset);
        bird4.fly(offset);

        pipe1.moveLeft(offset);
        pipe2.moveLeft(offset);
        pipe3.moveLeft(offset);
        pipe4.moveLeft(offset);
        pipe5.moveLeft(offset);
        pipe6.moveLeft(offset);

        $(document).on('click', flyUp);
    
        function flyDown(){
            $('#bird').attr('style', 'transform: rotate(45deg)');
            $('#bird').animate({ 'top': '+=100px' }, 500 ); 
        }
    
        function flyUp(){ 
            $('#bird').animate({ 'top': '-=100px' }, 500 ); 
            flyDown();
        }
    });    
});