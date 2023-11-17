import * as PIXI from 'pixi.js';
import { menuButtons } from 'src/app/enums/enums';

export class fightMenuClass{
    attackButton:PIXI.Sprite;
    guardButton:PIXI.Sprite;
    itemButton:PIXI.Sprite;
    runButton:PIXI.Sprite;
    menuBack:PIXI.Sprite;
    static menuDescrpStyle: PIXI.TextStyle = new PIXI.TextStyle({
        fill: "rgba(255, 255, 255, 0.5)",
        fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
        fontVariant: "small-caps",
        fontSize:25
    });
    
    constructor(){
        this.attackButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.ATTACK));
        this.setterSize(this.attackButton);
        this.attackButton.x=95;
        this.attackButton.y=415;
        this.guardButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.GUARD));
        this.setterSize(this.guardButton)
        this.guardButton.x=95;
        this.guardButton.y=457;
        this.itemButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.ITEM));
        this.setterSize(this.itemButton)
        this.itemButton.x=95;
        this.itemButton.y=499;
        this.runButton=new PIXI.Sprite(PIXI.Texture.from(menuButtons.RUN));
        this.setterSize(this.runButton)
        this.runButton.x=95;
        this.runButton.y=541;
        this.menuBack=new PIXI.Sprite(PIXI.Texture.from(menuButtons.MENUBACK));
        this.menuBack.width=540;
        this.menuBack.height=180;
        this.menuBack.x=170;
        this.menuBack.y=418;
    }

    private setterSize(button:PIXI.Sprite){
        button.width=140;
        button.height=51;
    }

    static setPositionMenuTXT(txt:PIXI.Text){
        txt.position.set(240,460)

    }
}