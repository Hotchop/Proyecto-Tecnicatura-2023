import { Enemy } from 'src/app/interfaces/interfaces';
import { enemy } from './commonEnemy';
import * as PIXI from 'pixi.js';
export class animationLogic{

    app: PIXI.Application<HTMLCanvasElement>

    constructor(private gameApp: PIXI.Application<HTMLCanvasElement>){
        this.app = gameApp
    }

    /**
     * Timer function. Mainly used to wait for animations or transitions to finish
     * @param time Time to wait until progressing whith the game in miliseconds
     * @returns Promise to be catched by an async/await
     */
    timer(time: number) {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, time);
        });
      }

    /**
     * Fade In animations for PIXI.Text
     * @param text PIXI.Text to apply the fadding animation
     * @param speed Speed of the animation
     */
    faddingText(text: PIXI.Text,speed: number){
        let faddin = true;
        text.alpha = 0;

        const faddingTextTicker = (delta: number) => {
            if(faddin === true){
                if(text.alpha < 1){
                    text.alpha += speed * delta
                }
                else{
                    faddin = false
                    this.app.ticker.remove(faddingTextTicker)
                }
            }
        }
        this.app.ticker.add(faddingTextTicker)
    }

    /**
     * Takes the loading screen component and makes it appear
     * @param graphics Loading screen graphic
     * @param speed Speed of the animation
     */
    fadeToBlack(graphics: PIXI.Graphics,speed: number){
        let faddin = true;
        graphics.alpha = 0;

        const fadeToTicker = (delta:number) => {
            if(faddin === true){
                if(graphics.alpha < 1){
                    graphics.alpha += speed * delta
                }
                else{
                    faddin = false
                    return
                }
            }
        }
        this.app.ticker.add(fadeToTicker)

    }
    
    /**
     * Takes the loading screen component and makes it dissapear
     * @param graphics Loading screen graphic
     * @param speed Speed of the animation
     */
    fadeFromBlack(graphics: PIXI.Graphics,speed: number){
        let faddin = true;
        graphics.alpha = 1;

        const fadeFromTicker = (delta:number) => {
            if(faddin === true){
                if(graphics.alpha > 0){
                    graphics.alpha -= speed * delta
                }
                else{
                    faddin = false
                    return
                }
            }
        }
        this.app.ticker.add(fadeFromTicker)

    }

    /**
     * 
     * @param enemy The enemy to animate
     * @param speed Speed of the animation
     */
    enemyAttack(enemy: Enemy,speed: number){
        let animate = true;
        let posX = enemy.sprite.x;
        let destination = posX - 30;

        
        const attackTicker = (delta: number) => {
            if(animate === true){
                if(enemy.sprite.x > destination){
                    enemy.sprite.x -= speed * delta
                    console.log('Attacking');
                }
                if(enemy.sprite.x === destination){
                    animate = false
                    console.log('Stopped');
                }
            }
            if(animate === false){
                if(enemy.sprite.x < posX){
                    enemy.sprite.x += speed * delta
                    console.log('Returning');
                }
                else{
                    if(enemy.sprite.x === posX){
                        console.log('Finished');
                        this.app.ticker.remove(attackTicker)
                    }
                }
            }
        };

        this.app.ticker.add(attackTicker)

    }

    /**
     * 
     * @param enemy The enemy to animate
     * @param speed Speed of the animation
     */
    enemyBuff(enemy: Enemy,speed: number){
        let animate = 0;
        let posX = enemy.sprite.x;
        let destinationLeft = posX - 15;
        let destinationRight = posX + 15;

        
        const buffTicker = (delta: number) => {
           
                if(animate === 0){
                    if(enemy.sprite.x > destinationLeft){
                        enemy.sprite.x -= speed * delta
                        console.log('1');
                    }
                    if(enemy.sprite.x <= destinationLeft){
                        animate = 1
                        console.log('2');
                    }
                }
                if(animate === 1){
                    if(enemy.sprite.x < destinationRight){
                        enemy.sprite.x += speed * delta
                        console.log('3');
                    }
                    if(enemy.sprite.x >= destinationRight){
                        animate = 2
                        console.log('4');
                    }
                }
                if(animate === 2){
                    if(enemy.sprite.x > posX){
                        enemy.sprite.x -= speed * delta
                        console.log('5');
                    }
                    if(enemy.sprite.x === posX){
                        animate = 0
                        console.log('6');
                        this.app.ticker.remove(buffTicker)
                    }
                }
            
        };

        this.app.ticker.add(buffTicker)

    }
    

}