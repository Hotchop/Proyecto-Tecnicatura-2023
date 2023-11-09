import { inject } from "@angular/core";
import { Partida, User } from "src/app/interfaces/interfaces";
import { AuthService } from "src/app/services/auth.service";
import { UserbaseService } from "src/app/services/userbase.service";

/**
 * Creates a new array of scores including the last's game score and updates the current player scorelist
 * @param score Last score form the game
 */
export function saveScore(score: Partida){
    const userbase = inject(UserbaseService);
    const auth = inject(AuthService);
    const user: User | undefined = auth.currentUser;
    if(user && score){
        let newScores: Partida[] = [...user.partidas,score];
        userbase.addScore(newScores,user.id!);
    }else{
        alert('Error saving score')
    }
}