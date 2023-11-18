import * as PIXI from 'pixi.js';
import { menuButtons } from 'src/app/enums/enums';

export class fightMenuClass{
    attackButton:PIXI.Sprite;
    guardButton:PIXI.Sprite;
    itemButton:PIXI.Sprite;
    runButton:PIXI.Sprite;
    menuBack:PIXI.Sprite;
    static menuDescrpStyle: PIXI.TextStyle = new PIXI.TextStyle({
        fill: "rgb(255, 255, 255)",
        fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
        fontVariant: "small-caps",
        fontSize:25
    });
    
    constructor(){
        this.attackButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.ATTACK));
        this.setterSize(this.attackButton);
        this.attackButton.x=110;
        this.attackButton.y=415;
        this.guardButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.GUARD));
        this.setterSize(this.guardButton)
        this.guardButton.x=110;
        this.guardButton.y=458;
        this.itemButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.ITEM));
        this.setterSize(this.itemButton)
        this.itemButton.x=110;
        this.itemButton.y=501;
        this.runButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.RUN));
        this.setterSize(this.runButton)
        this.runButton.x=110;
        this.runButton.y=551;
        this.menuBack=new PIXI.Sprite(PIXI.Texture.from(menuButtons.MENUBACK));
        this.menuBack.width=540;
        this.menuBack.height=180;
        this.menuBack.x=170;
        this.menuBack.y=418;
    }

    private setterSize(button:PIXI.Sprite){
        button.width=108;
        button.height=52;
    }

    static setPositionMenuTXT(txt:PIXI.Text){
        txt.position.set(240,460)

    }
}