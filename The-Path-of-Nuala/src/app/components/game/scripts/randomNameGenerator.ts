import { chartNumber } from "src/app/enums/enums";
import { Chart } from "src/app/interfaces/interfaces";
import { ChartopiaService } from "src/app/services/chartopia.service";
import * as PIXI from 'pixi.js';

/**
 * Primary function for the use of the Roll chart API form Chartopia
 * @param chartNumber The chartNumber from which the names will be selected
 * @param chartopia The chartopia service for use of the API
 * @param callback The function to resolve in the entity constructor. On success apply result, on other is recomended to set a default value.
 */
export function getRandomName(chartNumber:chartNumber,chartopia:ChartopiaService,callback: (error: Error | null, result?: string) => void){
        chartopia.rollChart(chartNumber).subscribe(
          (response: Chart) => {
            if(response){
               callback(null,response.results[0]);
            }else{
              callback(new Error('No response'), undefined)
            }
        }
    )
}


/**
 * PIXI Style element for the entities nameplates. Can be assigned during construction.
 */
export const nameplateStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: "#ffffff",
    fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
    fontVariant: "small-caps"
});

export const mainTitleStyle = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAngle: 1.1,
  dropShadowBlur: 7,
  fill: "#ffffff",
  fillGradientStops: [
      0.5
  ],
  fontFamily: "Abhaya Libre",
  fontSize: 70,
  strokeThickness: 1
});

export const endTitleStyle = new PIXI.TextStyle({
  dropShadow: true,
  dropShadowAngle: 1.1,
  dropShadowBlur: 7,
  fill: ["#ff0000","#570000"],
  fillGradientStops: [
      0.5
  ],
  fontFamily: "Abhaya Libre",
  fontSize: 50,
  strokeThickness: 1,
  fontWeight: 'bold',
});

export const turnTitleStyle = new PIXI.TextStyle({
  align: "center",
  breakWords: true,
  dropShadow: true,
  dropShadowAngle: 1.1,
  dropShadowBlur: 7,
  fill: "#ffffff",
  fillGradientStops: [
      0.5
  ],
  fontFamily: "Abhaya Libre",
  fontSize: 40,
  lineHeight: 50,
  strokeThickness: 1
});

/**
 * PIXI Text Constants
 */

export const playerTurnTitle = new PIXI.Text(`Player\nTurn`,turnTitleStyle);
    playerTurnTitle.anchor.set(0.5)
    playerTurnTitle.position.set(400,100)
    playerTurnTitle.alpha = 0;
    
export const enemyTurnTitle = new PIXI.Text(`Enemy\nTurn`,turnTitleStyle);
    enemyTurnTitle.anchor.set(0.5)
    enemyTurnTitle.position.set(400,100)
    enemyTurnTitle.alpha = 0;