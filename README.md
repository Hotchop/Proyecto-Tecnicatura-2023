# The Path of Nuala
The Path of Nuala is a web turn-based game created using Angular with the integrations of PIXI.js and Howler.js

## How To Play
To be able to play, be sure to register your account in the profile section.
Once you've done that, head over to Play.
There you will be able to create your own character, selecting a difficulty and class that will impact your health and damage, as well as a name for your hero.
Once that's done, the game will begin.

The objective of the game is to beat as many enemies as possible in a single run. You and the enemy will be taking turns choosing actions.
The player can choose to attack to deal damage, defend to resist more damage or use an item to heal.
The enemy will telegraph its next action before its turn, so plan accordingly!
The enemy can attack, defend, lower your attack, or increase its attack. It can also use stronger versions of its actions, as noted by a yellow border.
Once you defeat the enemy, you'll be able to continue to the next stage and fight the next enemy.
If you are defeated or decide to run away, the game will end and you will be able to save your score in your profile.

## Dependencies
This project uses the following libraries to work:
    </br>"@angular/animations": "^16.2.0",
    </br>"@angular/common": "^16.2.0",
    </br>"@angular/compiler": "^16.2.0",
    </br>"@angular/core": "^16.2.0",
    </br>"@angular/forms": "^16.2.0",
    </br>"@angular/platform-browser": "^16.2.0",
    </br>"@angular/platform-browser-dynamic": "^16.2.0",
    </br>"@angular/router": "^16.2.0",
    </br>"@pixi/events": "^7.3.2",
    </br>"howler": "^2.2.4",
    </br>"pixi.js": "^7.3.2",
    </br>"rxjs": "~7.8.0",
    </br>"tslib": "^2.3.0",
    </br>"zone.js": "~0.13.0"
    </br></br>
To install the main libraries use the following commands </br>
**npm i (Install node packages)</br>**
**npm install -g @angular/cli@(16.2.0)(Install angular client)</br>**
**npm install -g json-server (Install json server)**
**npm install pixi.js@7.3.2 (Install PIXI.js)</br>**
**npm install @pixi/events@7.3.2 (Install PIXI Events Package)</br>**
**npm install howler@2.2.4 (Install Howler)</br>**

## Running the Project
To run the project, open two terminals. In one of them, open the JSON server with **npm run backend**</br>
In the second one, run the project with **ng serve -o**</br>
Wait for the project to load and you should see it working in the browser.

## Credits
This project was the work of Abigail Alegre, Lautaro Elian Burgos, and Nicolás Martin Miranda in full-stack development, as well as Lucia Ferrario who worked with us on the graphic design for the game.
This was the final project for the University Technician in Programming at the UTN in Mar del Plata 2023
