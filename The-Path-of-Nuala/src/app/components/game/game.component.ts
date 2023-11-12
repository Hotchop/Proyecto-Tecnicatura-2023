import { animationLogic } from './scripts/animationLogic';
import { scorer } from './scripts/scoring';
import { UserbaseService } from 'src/app/services/userbase.service';
import { ChartopiaService } from './../../services/chartopia.service';
import { Component, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js';
import { enemy } from './scripts/commonEnemy';
import { AuthService } from 'src/app/services/auth.service';
import { player } from './scripts/player';
import { mainTitleStyle, nameplateStyle } from './scripts/randomNameGenerator';
import {Howl, Howler} from 'howler';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  private scoring: scorer;

  constructor(private chartopia: ChartopiaService, private auth: AuthService, private userbase: UserbaseService){
    this.scoring = new scorer(auth,userbase);

  }

  private app: PIXI.Application<HTMLCanvasElement> = new PIXI.Application({});
  private animationLogic = new animationLogic(this.app);
  private loadScreen = new PIXI.Graphics();
  private player = new player('');
  private mainMenuOst = new Howl({
      src: ['/assets/music/mainmenuost.mp3',],
      volume: 0.1, // ajusta el volumen según sea necesario
  });
  private battleOst = new Howl({
    src: ['/assets/music/battleost1.mp3',
          '/assets/music/battleost2.mp3',
          '/assets/music/battleost3.mp3',
          
        ],
    volume: 0.1, // ajusta el volumen según sea necesario
});
  ngOnInit(): void {
    document.getElementById('window')!.appendChild(this.app.view);

    //Loading screen for transitions
    this.loadScreen.beginFill(0x000000,1);
    this.loadScreen.drawRect(0, 0, 800, 600); 
    this.loadScreen.endFill();

    //Begin game
    this.startScreen()

  }
  ngOnDestroy(): void {
    // Este método se llama cuando el componente se destruye, es un buen lugar para limpiar recursos
    this.mainMenuOst.stop();
    this.battleOst.stop();
  }
  /**
   * Main title screen of the game
   */
  async startScreen(){

    //Add background image

    //Adds main title
    let title = new PIXI.Text('The Path of Nuala',mainTitleStyle);
    this.mainMenuOst.play()
    title.anchor.set(0.5);
    title.position.set(400,200)

    //Adds subtitle
    let subtitle = new PIXI.Text('Click to Start',nameplateStyle)
    subtitle.anchor.set(0.5);
    subtitle.position.set(title.x,title.y + 100)

    //Renders scene and animations
    this.app.stage.addChild(title,subtitle)
    this.app.stage.render
    this.animationLogic.faddingText(title,0.005);
    this.animationLogic.faddingText(subtitle,0.003);
    
    //Transitions logic with loading screen
    this.app.stage.eventMode = 'static'
    this.app.stage.addEventListener('click', async() =>{
      await this.loadScreenOut()
      this.fight()
    })
  }

  /**
   * Character creation screen
   */
  async createCharacterScreen(){

  }
  
  /**
   * Fight scene
   */
  async fight() {
    const newEnemy = new enemy(100,5,this.chartopia);
    this.app.stage.addChild(newEnemy.sprite,newEnemy.namePlate,newEnemy.nextTurnSprite,newEnemy.currentStatusSprite)
    
    await this.loadScreenEnter();


    
    

    const newPlayer = new player('Test');

    newEnemy.sprite.eventMode = 'static';
    newEnemy.sprite.addEventListener('click',()=>{newEnemy.enemyTurn(newPlayer)})
  }

  /**
   * End Game Screen
   */
  async endScreen(){

  }

  /**
   * Resets stage to add new items and events after transition
   */
  async stageReset(){
    this.app.stage.removeChildren();
    this.app.stage.removeAllListeners();
  }

  /**
   * Exit Screen Transition. Goes in the end screen function with an await.
   */
  async loadScreenOut(){
    this.app.stage.addChild(this.loadScreen)
      this.animationLogic.fadeToBlack(this.loadScreen,0.05)
      await this.animationLogic.timer(2000)
      this.stageReset()
  }

  /**
   * Loading screen loggin when launching a scene. Goes right after loaging the main sprites with an await
   */
  async loadScreenEnter(){
    this.mainMenuOst.stop();
    this.battleOst.play();
    this.app.stage.addChild(this.loadScreen)
    this.animationLogic.fadeFromBlack(this.loadScreen,0.05)
    await this.animationLogic.timer(1000)
    this.app.stage.removeChildAt(this.app.stage.children.length-1)
  }


  
  

}
