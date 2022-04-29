class Player {
    constructor () {
        this.index = 0;
        this.name;
        this.rank = 0;
        this.score = 0;
        this.positionY = 0;
        this.positionX = 0;
       
        this.opponentName;
        this.opponentIndex;

        this.opponentMessage

        this.messagingInfo = createElement("h6")
            .position (width/2 - 450, height/2 - 100)
            .class ("greeting")
        ;
        
        this.messagingInput = createInput ("")
            .attribute("placeholder", "Type Your Message Here")
            .position(width/2 - 100, this.messagingInfo.y + 150)
            .class("messagingInput")
            .hide()
        ;
        
        this.messageButton = createButton("Send")
            .position(width/2 - 75, this.messagingInput.y + 75)
            .class("customButton")  
            .hide ()
        ;
        
        this.messageSetupExecuted = false;
        this.opponentMS = 0;
    }

    trackPlayerCount () {
        var playersRef = firebase.ref ("playerCount");
        playersRef.on ("value", (data) => {
            playerCount = data.val ();
        })
    }

    updatePlayerCount () {
        var playerCountRef = firebase.ref ("/").update({
            playerCount: playerCount,
        });
    }      

    newPlayer () {
        this.index = playerCount;
        this.name = form.nameInput.value ();

        if (this.index == 1) {
            this.positionX = 115; // y = height - 60
            this.opponentIndex = 2;
        }   else {
            this.positionX = 2;
            this.opponentIndex = 1;
        }

        var playerInfoC = `players/player${this.index}`;

        firebase.ref (playerInfoC).set ({
            name: this.name,
            rank: 0,
            score: 0,
            positionX: this.positionX,
            positionY: this.positionY
        });

        console.log (`${this.index} ${this.positionX} ${this.name} ${playerCount}`);
    }

    async messagingSetup () {
        var messageReference = await firebase.ref (`players/player${this.opponentIndex}/name`).once("value")
        if (messageReference.exists()) {
            this.opponentName = messageReference.val ();
            // console.log (this.opponentName)
            // console.log (messageReference);
            console.log (this.messagingSetup());
            // console.log (newVar = await firebase.ref (`players/player${this.opponentIndex}`).once("value")); 
    
            form.greeting.hide ();

            this.messagingInfo.html (`You can now chat with ${this.opponentName}, your opponent`);
            this.messagingInput.show ();
            this.messageButton.show ();
            this.messageButtonClicked ();
            this.messageRecieved ();
        }
    }
    
    messageButtonClicked () { 
        this.messageButton.mouseClicked (() => {
            firebase.ref (`messages/player${this.index}`).set ({
                message : this.messagingInput.value(),
            })
        })   
    }
    
    async messageRecieved () {    
        var messageRecievedReference = await firebase.ref (`messages/player${this.opponentIndex}/message`).once("value");
        
        if (messageRecievedReference.exists()) {
            this.opponentMessage = messageRecievedReference.val();

            var preMessageText = `${this.opponentName} says:`
            this.displayMessage = createElement ("h6")
                .html(`${preMessageText} ${this.opponentMessage}`)
                .position(this.mEX, this.messageButton.y + 20)
                .class("messaging")
            ;
        }
    }

    
    hideMessage () {
        this.messagingInfo.hide();
        this.messageButton.hide();
        this.messagingInput.hide
    }
}