import {KenshiroActorSheet} from "./modules/sheets/kenshiro-actor-sheet.js";
import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {MartialArtData} from "./models/items/kenshiro-martial-art-model.js";

Hooks.once("init", async () => {
    console.log("KENSHIRO | System start");

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
    if (actor.type !== "character")
        return;

    /** @type {MartialArt[]} */
    const baseMartialArts = [
        {
            name: game.i18n.localize("MARTIALARTS.Names.MartialKick"),
            type: "martialArt",
            system: {
                id: "B2",
                type: "C",
                cost: "1",
                requirements: "---",
                level: -2,
                dmg: "C(PV) B(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.Charge"),
            type: "martialArt",
            system: {
                id: "B3",
                type: "SP",
                cost: "2",
                requirements: `${game.i18n.localize("MARTIALARTS.Requirements.Charge")} 4m`,
                level: -2,
                dmg: "C(PV) C(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.Immobilize"),
            type: "martialArt",
            system: {
                id: "B5",
                type: "P",
                cost: "2F",
                requirements: "---",
                level: -2,
                dmg: "B(PR)",
                special: "---",
                notes: `${game.i18n.localize("MARTIALARTS.Notes.Immobilize")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.MartialPunch"),
            type: "martialArt",
            system: {
                id: "B6",
                type: "P",
                cost: "1",
                requirements: "---",
                level: -2,
                dmg: "B(PV) D(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.Push"),
            type: "martialArt",
            system: {
                id: "B7",
                type: "P",
                cost: "1F",
                requirements: "---",
                level: -2,
                dmg: "B(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.Crushing"),
            type: "martialArt",
            system: {
                id: "B8",
                type: "P",
                cost: "3F",
                requirements: `${game.i18n.localize("MARTIALARTS.Requirements.Crushing")}`,
                level: -2,
                dmg: "B(PR)",
                special: "---",
                notes: `${game.i18n.localize("MARTIALARTS.Notes.Crushing")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.MartialHeadbutt"),
            type: "martialArt",
            system: {
                id: "B9",
                type: "T",
                cost: "2",
                requirements: "---",
                level: -2,
                dmg: "B(PV) D(PR)",
                special: "---",
                notes: "---",
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.FlyingKick"),
            type: "martialArt",
            system: {
                id: "B1",
                type: "SN",
                cost: "2",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Atk")} 1`,
                level: -2,
                dmg: "D(PV) B(PR)",
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.FlyingKick")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.Endure"),
            type: "martialArt",
            system: {
                id: "B4",
                type: "SP",
                cost: "6",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Def")} 1`,
                level: -2,
                dmg: "D(PV) B(PR)",
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.Endure")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.WeaponTech"),
            type: "martialArt",
            system: {
                id: "B10",
                type: "CO",
                cost: "3",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Atk")} 1`,
                level: -2,
                dmg: `${game.i18n.localize("MARTIALARTS.Dmg.Weapon")}`,
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.Weapon")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.MissileTech"),
            type: "martialArt",
            system: {
                id: "B11",
                type: "CO",
                cost: "1",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Atk")} 1`,
                level: -2,
                dmg: `${game.i18n.localize("MARTIALARTS.Dmg.Weapon")}`,
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.Weapon")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.WeaponWall"),
            type: "martialArt",
            system: {
                id: "B12",
                type: "SP",
                cost: "3F",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Def")} 1`,
                level: -2,
                dmg: "C(PV)",
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.Weapon")}`,
                used: false
            }
        },
        {
            name: game.i18n.localize("MARTIALARTS.Names.ReflexTech"),
            type: "martialArt",
            system: {
                id: "B12",
                type: "SP",
                cost: "3",
                requirements:  `${game.i18n.localize("MARTIALARTS.Requirements.Atk")} 1 - ${game.i18n.localize("MARTIALARTS.Requirements.Def")} 2`,
                level: -2,
                dmg: "---",
                special: "---",
                notes:  `${game.i18n.localize("MARTIALARTS.Notes.Weapon")}`,
                used: false
            }
        }
    ];

    actor.updateSource({items: baseMartialArts});
})