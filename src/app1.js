import * as PIXI from 'pixi.js'
const width = 1280 , height = 720;



// loader.add('layout','/assets/layout.json');
// loader.add('AutoPlay','/assets/AutoPlay.png');
// loader.load(()=>{
//     startApp();
// })

export default {
    start : (openApp2 = ()=>{})=>{

        const app = new PIXI.Application({
            width, height,
            backgroundColor: 0x000000,
            resolution: window.devicePixelRatio || 1,
            antialias : true
        })


        document.body.appendChild(app.view);
        app.view.style.position = 'absolute';
        app.view.style.top = '0';
        app.view.style.left = '0';

        const {stage, loader} = app;

        const text = new PIXI.Text('This is APP 1', {fontSize : 80, fill : "#ffffff", fontWeight : "bolder" });
        text.anchor.set(0.5);

        text.x = width / 2;
        text.y = height / 2;

        stage.addChild(text);


        const button = new PIXI.Graphics();
        button.beginFill(0x603100);
        button.drawRoundedRect(-100,-35,200, 70);
        button.endFill();
        button.x = width / 2;
        button.y = height * 0.7
        stage.addChild(button);

        const buttonText = new PIXI.Text('Open app 2', {fontSize : 30, fill : "#ffffff", fontWeight : "bolder" })
        buttonText.x = width / 2;
        buttonText.y = height * 0.7
        buttonText.anchor.set(0.5);
        stage.addChild(buttonText);

        button.interactive = true;
        button.buttonMode = true;
        button.on('click', openApp2);
        button.on('tap', openApp2);

    }
}

