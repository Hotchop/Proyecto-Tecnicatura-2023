import { animationLogic } from './scripts/animationLogic';
import { scorer } from './scripts/scoring';
import { UserbaseService } from 'src/app/services/userbase.service';
import { ChartopiaService } from './../../services/chartopia.service';
import { Component, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js';
import { enemy } from './scripts/commonEnemy';
import { AuthService } from 'src/app/services/auth.service';
import { player } from './scripts/player';
import { endTitleStyle, enemyTurnTitle, mainTitleStyle, nameplateStyle, playerTurnTitle } from './scripts/randomNameGenerator';
import {actionIcons, enemyActions, menuButtons, playerActions } from 'src/app/enums/enums';
import {Howl, Howler} from 'howler';
import { backgroundClass } from './scripts/background';
import { fightMenuClass } from './scripts/fightMenu';
import { healthbar } from './scripts/healthbarLogic';

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
  private score = 0;
  private stageNum=1;
  private difficulty = 1; ///0,75 - 1.00 - 1,25
  private playerHealthBar:healthbar;
  private mainMenuOst = new Howl({
      src: ['/assets/music/mainmenuost.mp3',],
      volume: 0.0, // ajusta el volumen según sea necesario
  });
  private battleOst = new Howl({
    src: ['/assets/music/battleost1.mp3',
          '/assets/music/battleost2.mp3',
          '/assets/music/battleost3.mp3',
        ],
    volume: 0.0, // ajusta el volumen según sea necesario
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

  //GAME SCREENS

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
    /**
     * Background 
     */
    const backSprite= new backgroundClass(this.stageNum);
    const fightMenu=new fightMenuClass();
    this.playerHealthBar=new healthbar();

    const newEnemy = new enemy(this.difficulty,this.chartopia);
    

    this.app.stage.addChild(backSprite.sprite)  //Background
    this.app.stage.addChild(newEnemy.sprite,newEnemy.namePlate,newEnemy.nextTurnSprite,newEnemy.currentStatusSprite,newEnemy.hittedIcon) //Enemy
    this.app.stage.addChild(this.player.currentTurnSprite,this.player.hittedIcon,this.player.currentStatusSprite);
    this.app.stage.addChild(fightMenu.menuBack,fightMenu.attackButton,fightMenu.guardButton,fightMenu.runButton,fightMenu.itemButton) //Action Menu
    this.app.stage.addChild(playerTurnTitle,enemyTurnTitle);  //Turn Titlecards
    this.app.stage.addChild(this.playerHealthBar.barHealth);
    this.app.stage.addChild(this.playerHealthBar.playerHealth);


    await this.loadScreenEnter();
    
    let onFight = true;
    while(onFight === true){
      let playerPlayed;
      //Start Player Turn
      this.animationLogic.turnTextAnimation(playerTurnTitle,0.05);
      await this.animationLogic.timer(1000);

      //Player Turn Logic
      playerPlayed=await this.playerTurn(fightMenu,newEnemy);
      console.log(playerPlayed)
      await this.animationLogic.timer(2000);
      if(newEnemy.getHp <= 0){
        onFight = false;
      }else{
        //Enemy Turn
      if(playerPlayed==true){
          this.menuUnavailable(fightMenu);
          this.animationLogic.turnTextAnimation(enemyTurnTitle,0.05);
          await this.animationLogic.timer(1000);
      //Enemy Turn Logic
        await this.enemyPhaseLogic(newEnemy)
        await this.animationLogic.timer(2000);
        if(this.player.getHp <= 0){
          onFight = false;
        }
      }

      }

    }

    if(this.player.getHp <= 0){
      await this.animationLogic.deathAnimation(this.player.currentTurnSprite,0.05)
      await this.animationLogic.timer(1000);
      await this.loadScreenOut();
      this.endScreen();
    }else{
      if(newEnemy.getHp <= 0){
        this.score += newEnemy.score;
        newEnemy.namePlate.alpha = 0;
        newEnemy.currentStatusSprite.alpha = 0;
        newEnemy.nextTurnSprite.alpha = 0;
        await this.animationLogic.deathAnimation(newEnemy.sprite,0.05)
        await this.animationLogic.timer(1000);
        //Load Next Level Menu
        this.app.stage.addChild(this.loadScreen);
        const nextLevel = PIXI.Sprite.from('/assets/game-assets/gui/continue-button.png')
        nextLevel.anchor.set(0.5)
        nextLevel.position.set(400,-100)
        nextLevel.width = 140;
        nextLevel.height = 51;
        this.app.stage.addChild(nextLevel);
        await this.animationLogic.nextLevelAnimation(nextLevel,2.5,this.loadScreen)
        nextLevel.interactive = true;
        nextLevel.on('mousedown',async() =>{
          await this.loadScreenOut();
          this.fight();
        })
      }
    }

    

    fightMenu.runButton.eventMode = 'static'
    fightMenu.runButton.addEventListener('click',async () => {
      await this.loadScreenOut();
      this.endScreen();
    })

  }

  async playerTurn(fightMenu:fightMenuClass, newEnemy:enemy):Promise<boolean>{
    return new Promise(resolve=>{
      fightMenu.attackButton.eventMode='static';
      fightMenu.attackButton.addEventListener('click',()=>{
          this.player.nextTurn=playerActions.ATTACK;
          this.player.action(newEnemy,this.playerHealthBar);
          this.animationLogic.hitIconAnimation(newEnemy.hittedIcon,0.03)
          resolve(true)
    })
    fightMenu.guardButton.eventMode='static';
    fightMenu.guardButton.addEventListener('click',()=>{
        this.player.nextTurn=playerActions.GUARD;
        this.player.action(newEnemy,this.playerHealthBar);
        resolve(true)
    })

    fightMenu.itemButton.eventMode='static';
    fightMenu.itemButton.addEventListener('click',()=>{
        this.player.nextTurn=playerActions.HEALTH_UP;
        this.player.action(newEnemy,this.playerHealthBar);
        resolve(true)
    })
    fightMenu.runButton.eventMode='static';
    fightMenu.runButton.addEventListener('click',async ()=>{
      await this.loadScreenOut();
      this.endScreen();
    })
    })
  }

  menuUnavailable(fightMenu:fightMenuClass){
    fightMenu.attackButton.eventMode='none';
    fightMenu.guardButton.eventMode='none';
    fightMenu.itemButton.eventMode='none';
    fightMenu.runButton.eventMode='none';
  }
  /**
   * End Game Screen
   */
  async endScreen(){
    
    //Add background image

    //Adds main title
    let title = new PIXI.Text('YOUR LEGEND HAS ENDED',endTitleStyle);
    title.anchor.set(0.5);
    title.position.set(400,200)

    //Adds subtitle
    let subtitle = new PIXI.Text('Save your score',nameplateStyle)
    subtitle.anchor.set(0.5);
    subtitle.position.set(title.x,title.y + 100)

    //Renders scene and animations
    this.app.stage.addChild(title,subtitle)
    this.animationLogic.faddingText(title,0.005);
    this.animationLogic.faddingText(subtitle,0.003);
    
    //Transitions logic with loading screen
    subtitle.eventMode = 'static'
    subtitle.addEventListener('click', async() =>{
      await this.loadScreenOut()
      this.scoring.addSave(this.player.charName,this.score);
      
    })

  }


  //GAME FUNCTIONS

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

  /**
   * The animation and logic for the enemy phase
   * @param enemy The enemy about to take it's turn
   */
  async enemyPhaseLogic(enemy: enemy){
    if(enemy.nextTurn === enemyActions.ATTACK || enemy.nextTurn === enemyActions.STRONG_ATTACK){
      this.animationLogic.enemyAttack(enemy,5)
      await this.animationLogic.hitIconAnimation(this.player.hittedIcon,0.03)
    }else{
      if(enemy.nextTurn === enemyActions.DEBUFF){
        this.animationLogic.enemyAttack(enemy,5)
        this.player.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.DEBUFF);
        this.player.currentStatusSprite.visible = true;
      }else{
        if(enemy.nextTurn === enemyActions.STRONG_DEBUFF){
          this.animationLogic.enemyAttack(enemy,5)
          this.player.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.STRONG_DEBUFF);
          this.player.currentStatusSprite.visible = true;
        }else{
          this.animationLogic.enemyBuff(enemy,5)
        }
      }
    }
    enemy.enemyTurn(this.player,this.playerHealthBar)
  }


  
  

}
