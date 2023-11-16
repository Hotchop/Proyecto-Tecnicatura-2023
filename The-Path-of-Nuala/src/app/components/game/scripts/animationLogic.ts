import { Enemy } from 'src/app/interfaces/interfaces';
import { enemy } from './commonEnemy';
import * as PIXI from 'pixi.js';
import { player } from './player';


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
                }
                if(enemy.sprite.x <= destination){
                    animate = false
                }
            }
            if(animate === false){
                if(enemy.sprite.x < posX){
                    enemy.sprite.x += speed * delta
                }
                else{
                    if(enemy.sprite.x >= posX){
                        enemy.sprite.x = posX
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
                    }
                    if(enemy.sprite.x <= destinationLeft){
                        animate = 1
                    }
                }else{
                    if(animate === 1){
                        if(enemy.sprite.x < destinationRight){
                            enemy.sprite.x += speed * delta
                        }
                        if(enemy.sprite.x >= destinationRight){
                            animate = 2
                        }
                    }else{
                        if(animate === 2){
                            if(enemy.sprite.x > posX){
                                enemy.sprite.x -= speed * delta
                            }
                            if(enemy.sprite.x <= posX){
                                animate = 0
                                enemy.sprite.x = posX
                                this.app.ticker.remove(buffTicker)
                            }
                        }

                    }

                }

        };

        this.app.ticker.add(buffTicker)

    }

    /**
     * 
     * @param player The enemy to animate
     * @param speed Speed of the animation
     */
    characterAttack(player: player,speed: number){
        let animate = true;
        let posX = player.currentTurnSprite.x;
        let destination = posX + 30;

        
        const attackTicker = (delta: number) => {
            if(animate === true){
                if(player.currentTurnSprite.x < destination){
                    player.currentTurnSprite.x += speed * delta
                }
                if(player.currentTurnSprite.x >= destination){
                    animate = false
                }
            }
            if(animate === false){
                if(player.currentTurnSprite.x > posX){
                    player.currentTurnSprite.x -= speed * delta
                }
                else{
                    if(player.currentTurnSprite.x <= posX){
                        player.currentTurnSprite.x = posX
                        this.app.ticker.remove(attackTicker)
                    }
                }
            }
        };

        this.app.ticker.add(attackTicker)

    }

    /**
     * 
     * @param player The enemy to animate
     * @param speed Speed of the animation
     */
    characterBuff(player: player,speed: number){
        let animate = 0;
        let posX = player.currentTurnSprite.x;
        let destinationLeft = posX - 15;
        let destinationRight = posX + 15;

        
        const buffTicker = (delta: number) => {
           
                if(animate === 0){
                    if(player.currentTurnSprite.x > destinationLeft){
                        player.currentTurnSprite.x -= speed * delta
                    }
                    if(player.currentTurnSprite.x <= destinationLeft){
                        animate = 1
                    }
                }else{
                    if(animate === 1){
                        if(player.currentTurnSprite.x < destinationRight){
                            player.currentTurnSprite.x += speed * delta
                        }
                        if(player.currentTurnSprite.x >= destinationRight){
                            animate = 2
                        }
                    }else{
                        if(animate === 2){
                            if(player.currentTurnSprite.x > posX){
                                player.currentTurnSprite.x -= speed * delta
                            }
                            if(player.currentTurnSprite.x <= posX){
                                animate = 0
                                player.currentTurnSprite.x = posX
                                this.app.ticker.remove(buffTicker)
                            }
                        }

                    }

                }
        };

        this.app.ticker.add(buffTicker)

    }
    
    /**
     * Fade out animation for the hit sprite when attacking entities
     * @param icon The hit icon that is goind to be animated, be it the enemy icon or the player icon
     * @param speed Speed of the animation
     */
    hitIconAnimation(icon: PIXI.Sprite,speed: number){
        const defaultWidht = icon.width;
        const defaultHeight = icon.height;
        icon.alpha = 1;

        const hitTicker = (delta:number) => {
            if(icon.alpha > 0){
                icon.width -= speed * delta;
                icon.height -= speed * delta;
                icon.alpha -= speed * delta;
                console.log('hitanimation');
            }else{
                this.app.ticker.remove(hitTicker);
                icon.width = defaultWidht;
                icon.height = defaultHeight;
            }
        } 

        this.app.ticker.add(hitTicker);
    }

    turnTextAnimation(text: PIXI.Text,speed: number){
        let elapsedTime = 0;
        let animate = true;
        const turnTextTicker = (delta:number) => {
            elapsedTime += delta;
            if(animate === true){
                if(text.alpha < 1){
                    text.alpha += speed * delta;
                }else{
                    if(text.alpha >= 1 && elapsedTime > 100){
                        animate = false
                    }
                }
            }else{
                if(text.alpha  > 0){
                     text.alpha -= speed * delta;
                }else{
                    if(text.alpha <= 0){
                         this.app.ticker.remove(turnTextTicker)
                    }
                }

            }
        } 

        this.app.ticker.add(turnTextTicker);
    }

    deathAnimation(creature: PIXI.Sprite,speed: number){
        const deathTicker = (delta:number) => {
            if(creature.alpha > 0){
                creature.alpha -= speed * delta;
                creature.rotation += speed / 4 * delta;
                creature.width -= speed * 100 * delta;
                creature.height -= speed * 100 * delta;
                
            }else{
                this.app.ticker.remove(deathTicker);
            }
        }

        this.app.ticker.add(deathTicker);
    }

    nextLevelAnimation(menu: PIXI.Sprite,texto:PIXI.Text,texto2:PIXI.Text,speed: number, background?: PIXI.Graphics){
        menu.alpha = 0

        const menuTicker = (delta:number) => {
            if(menu.y < 300){
                if(texto.y<150){
                    texto.y+=speed*delta;
                    texto.alpha += speed * delta
                    texto2.y+=speed*delta;
                    texto.alpha+=speed*delta
                }
                menu.y += speed * delta
                menu.alpha += speed * delta
            }else{
                if(menu.alpha < 1){
                    texto.alpha+=speed*delta
                    texto2.alpha+=speed*delta
                    menu.alpha += speed * delta
                   
                }else{
                    this.app.ticker.remove(menuTicker);
                }
            }
        }
    

        this.app.ticker.add(menuTicker);

        if(background){
            
            background.alpha = 0;

            const backgroundTicker = (delta:number) => {
            if(background.alpha < 0.75){
                    background.alpha += speed/10 * delta
                
            }else{
                this.app.ticker.remove(backgroundTicker);
                }
            }
            this.app.ticker.add(backgroundTicker);
        }
    }

}      


