// Dépendances
const term = require('terminal-kit').terminal; // Utilisation de terminal-kit : Demande de texte, Demande d'appuie de touches, Envoie de message dans la console en couleur
const hastebin = require('hastebin.js'); // Utilisation de hastebin : Création de haste
const haste = new hastebin({ /* url: 'hastebin.com */ }); // Utilisation de hastebin : Création de haste
const config = require('./config.json'); // Utilisation de config.json : Traduction

// Informer que Haste.terminal ne fonctionne plus
term.red("Haste.termiinal n'est plus supporté. ")
term.red("Veuillez télécharger et utiliser HasteCLI (")
term.cyan("https://github.com/johan-perso/hastecli")
term.red("). - Johan")

// Code principal
term.white(config.textInput); // Demande de texte
term.inputField(
    function( error , input ){
        
        // Si aucun texte
        if(!input){
             console.log("\n" + config.writeThing);
             return process.exit();
        }
        
        // Crée le lien puis l'envoyer dans la console
        const link = haste.post(input, 'md').then(link => {
            term.white("\n" + config.linkGenerated); term.cyan(link); // Envoie du lien
            
            // Demande pour voir le texte
            function question() {
	term("\n" + config.viewText);
	term.yesOrNo( { yes: config.touchY , no: config.touchN } , function( error , result ) {
	
		if (result) {
			term.cyan("\n" + input + "\n") ;
			process.exit();
		}
		else {
			term.white("\n" + config.shutdown + "\n");
            process.exit();
		}
	} );
}
question();
            
        });
    }
);


