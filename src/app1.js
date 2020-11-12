import * as PIXI from 'pixi.js'
const width = 1280 , height = 720;



// loader.add('layout','/assets/layout.json');
// loader.add('AutoPlay','/assets/AutoPlay.png');
// loader.load(()=>{
//     startApp();
// })
document.addEventListener("visibilitychange", function() {
    console.log(document.visibilityState);
    addLog('visibilitychange + ' + document.visibilityState)
});

let logText = null;
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

        const text = new PIXI.Text('Visibility change logs', {fontSize : 18, fill : "#ffffff", fontWeight : "bolder", align : 'center'});
        text.anchor.set(0.5, 0);

        text.x = width / 2;
        text.y = 20;

        logText = text;

        stage.addChild(text);
    }
}



function addLog(text) {
    logText.text += '\n - Visibility change ' + text + ' ' + new Date().toLocaleString()
}
