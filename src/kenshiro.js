import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {KenshiroActorSheet} from "./modules/sheets/kenshiro-actor-sheet.js";

Hooks.once("init", async () => {
    console.log("KENSHIRO | System start");

    await  foundry.applications.handlebars.loadTemplates([
        "systems/kenshiro/templates/partials/kenshiro-actor-stats.hbs",
        "systems/kenshiro/templates/partials/kenshiro-actor-martial-arts.hbs"
    ])

    CONFIG.Actor.dataModels.character = CharacterData;

    foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, "core", KenshiroActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: game.i18n.localize("KENSHIRO.SheetTitle")
    });

    console.log("Kenshiro | System initialized")
})