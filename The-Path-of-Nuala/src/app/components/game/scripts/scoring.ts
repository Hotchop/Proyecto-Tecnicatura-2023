import { Personaje } from './../../../interfaces/interfaces';
import { Partida, User } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { UserbaseService } from "src/app/services/userbase.service";

export class scorer{

    constructor(private auth: AuthService, private userbase: UserbaseService) {}

    /**
     * Adds score and character to the logged user profile
     * @param character Character used during the game
     * @param score Score of the last game
     */
    addSave(character:Personaje,score:number){
        const savefile: Partida = {
            fecha: new Date(Date.now()),
            personaje: character,
            puntaje: score,
        }

        const user: User | undefined = this.auth.currentUser;
        if(user !== undefined){
            let newScores: Partida[] = [...user.partidas,savefile];
            this.userbase.addScore(newScores,user.id!);
        }else{
            alert('Error saving score')
        }
      }
}