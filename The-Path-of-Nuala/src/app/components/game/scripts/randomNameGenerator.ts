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