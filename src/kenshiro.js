import {KenshiroActorSheet} from "./modules/sheets/kenshiro-actor-sheet.js";
import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {MartialArtData} from "./models/items/kenshiro-martial-art-model.js";

Hooks.once("init", async () => {
    console.log("KENSHIRO | System start");

/*    await  foundry.applications.handlebars.loadTemplates([
        "systems/kenshiro/templates/partials/kenshiro-actor-stats.hbs",
        "systems/kenshiro/templates/partials/kenshiro-actor-martial-arts.hbs"
    ])*/

    CONFIG.Actor.dataModels.character = CharacterData;
    CONFIG.Item.dataModels.martialArt = MartialArtData;
    foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, "core", KenshiroActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: game.i18n.localize("KENSHIRO.SheetTitle")
    });

    console.log("Kenshiro | System initialized")
})

Hooks.on("preCreateActor", (actor, data, options, userId) => {
    debugger;
    /*if (game.user.id !== userId)
        return;

    if(actor.items.some(i => i.type === "martialArts"))
        return;*/

    /** @type {MartialArt[]} */
    const baseMartialArts = [
        {
            name: game.i18n.localize("MARTIALARTS.MartialKick"),
            type: "martialArt",
            system: {
                id: "B2",
                type: "C",
                cost: "1",
                requirements: "---",
                level: -2,
                dmg: "C(PV) C(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        }
    ];
    /*actor.createEmbeddedDocuments("Item", baseMartialArts);*/
    actor.updateSource({items: baseMartialArts});
})