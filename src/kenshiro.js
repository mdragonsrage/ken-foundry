import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {KenshiroActorSheet} from "./modules/sheets/kenshiro-actor-sheet.js";

Hooks.once("init", async () => {
    console.log("KENSHIRO | Inizializzazione del sistema in corso");

    CONFIG.Actor.dataModels.character = CharacterData;

    foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, "core", KenshiroActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: "Scheda del personaggio"
    });

    console.log("Kenshiro | Inizializzazione completata")
})