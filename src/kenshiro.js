import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {KenshiroActorSheet} from "./modules/sheets/kenshiro-actor-sheet.js";

Hooks.once("init", () => {
    console.log("KENSHIRO | Inizializzazione del sistema in corso");

    CONFIG.Actor.dataModels.character = CharacterData;

    Actors.unregisterSheet("core", ActorSheetV2);

    Actors.registerSheet("core", KenshiroActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Scheda del personaggio"
    });

    console.log("Kenshiro | Inizializzazione completata")
})