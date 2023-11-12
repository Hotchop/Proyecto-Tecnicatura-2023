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
     * @param speed Speed of the animation (0< speed <1)
     */
    faddingText(text: PIXI.Text,speed: number){
        let faddin = true;
        text.alpha = 0;

        this.app.ticker.add((delta) => {
            if(faddin === true){
                if(text.alpha < 1){
                    text.alpha += speed * delta
                }
                else{
                    faddin = false
                    return
                }
            }
        })
    }

    /**
     * Takes the loading screen component and makes it appear
     * @param graphics Loading screen graphic
     * @param speed Speed of the animation (0< speed <1)
     */
    fadeToBlack(graphics: PIXI.Graphics,speed: number){
        let faddin = true;
        graphics.alpha = 0;

        this.app.ticker.add((delta) => {
            if(faddin === true){
                if(graphics.alpha < 1){
                    graphics.alpha += speed * delta
                }
                else{
                    faddin = false
                    return
                }
            }
        })

    }
    
    /**
     * Takes the loading screen component and makes it dissapear
     * @param graphics Loading screen graphic
     * @param speed Speed of the animation (0< speed <1)
     */
    fadeFromBlack(graphics: PIXI.Graphics,speed: number){
        let faddin = true;
        graphics.alpha = 1;

        this.app.ticker.add((delta) => {
            if(faddin === true){
                if(graphics.alpha > 0){
                    graphics.alpha -= speed * delta
                }
                else{
                    faddin = false
                    return
                }
            }
        })

    }

    

}