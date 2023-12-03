import { enemy } from './commonEnemy';
import { Character } from './../../../interfaces/interfaces';
import { Save, User } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { UserbaseService } from "src/app/services/userbase.service";
import { player } from './player';
import { playerSprites } from 'src/app/enums/enums';

export class scorer{

    constructor(private auth: AuthService, private userbase: UserbaseService) {}

    /**
     * Adds score and character to the logged user profile
     * @param character Character used during the game
     * @param score Score of the last game
     */
    addSave(character:player,level:number,levelName:string,enemy:enemy,score:number){
        let savefile: Save = {
            fecha: new Date(Date.now()),
            personaje: character.charName,
            sprite:'',
            clase:character.charClass,
            nivel:level,
            ultimoMapa:levelName,
            ultimoEnemigo:enemy.name,
            puntaje: score,
        }

        switch (savefile.clase) {
            case 'Mage': savefile.sprite = playerSprites.MAGE;
                
                break;

            case 'Rogue': savefile.sprite = playerSprites.ROGUE;
                
                break;
        
            default: savefile.sprite = playerSprites.WARRIOR;
                break;
        }
        
        console.log(savefile);
        const user: User | undefined = this.auth.currentUser;
        if(user !== undefined){
            console.log(user);
            let newScores: Save[] = [...user.partidas,savefile];
            this.userbase.addScore(newScores,user.id!);
        }else{
            alert('Error saving score 1')
        }
      }
}