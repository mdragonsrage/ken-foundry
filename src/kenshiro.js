import {KenshiroActorSheet} from "./modules/sheets/actors/kenshiro-actor-sheet.js";
import {CharacterData} from './models/actors/kenshiro-actor-model.js';
import {MartialArtData} from "./models/items/kenshiro-martial-art-model.js";
import {FeatData} from "./models/items/kenshiro-feat-model.js";
import {KenshiroMartialArtSheet} from "./modules/sheets/items/kenshiro-martial-art-sheet.js";
import {KenshiroFeatSheet} from "./modules/sheets/items/kenshiro-feat-sheet.js";

Hooks.once("init", async () => {
    console.log("KENSHIRO | System start");

    registerHandlebars();
    CONFIG.Actor.dataModels.character = CharacterData;
    CONFIG.Item.dataModels.martialArt = MartialArtData;
    CONFIG.Item.dataModels.feat = FeatData;

    foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Actor, "core", foundry.applications.sheets.ActorSheetV2);
    foundry.applications.apps.DocumentSheetConfig.unregisterSheet(Item, "core", foundry.applications.sheets.ItemSheetV2);

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Actor, "core", KenshiroActorSheet, {
        types: ["character"],
        makeDefault: true,
        label: game.i18n.localize("KENSHIRO.SheetTitle")
    });

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Item, "core", KenshiroMartialArtSheet, {
        types: ["martialArt"],
        makeDefault: true,
        label: game.i18n.localize("ITEMS.MartialArts.Title")
    });

    foundry.applications.apps.DocumentSheetConfig.registerSheet(Item, "core", KenshiroFeatSheet, {
        types: ["feat"],
        label: game.i18n.localize("ITEMS.Feats.Title")
    });

    console.log("Kenshiro | System initialized")
})

Hooks.on("preCreateActor", (actor, data, options, userId) => {
    if (actor.type === "character")
    {
        /** @type {MartialArt[]} */
        const _baseMartialArts = [
            {
                name: game.i18n.localize("MARTIALARTS.Names.MartialKick"),
                type: "martialArt",
                system: {
                    id: "B2",
                    type: "C",
                    cost: "1",
                    requirements: null,
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
                    requirements: {
                        misc: `${game.i18n.localize("MARTIALARTS.Requirements.Charge")} 4m`
                    },
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
                    requirements: null,
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
                    requirements: null,
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
                    requirements: null,
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
                    requirements: {
                        misc: `${game.i18n.localize("MARTIALARTS.Requirements.Crushing")}`
                    },
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
                    requirements: null,
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
                    requirements: {
                        atk: 1
                    },
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
                    requirements: {
                        defense: 1
                    },
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
                    requirements: {
                        atk: 1
                    },
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
                    requirements: {
                        atk: 1
                    },
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
                    requirements: {
                        defense: 1
                    },
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
                    requirements: {
                        atk: 1,
                        defense: 2
                    },
                    level: -2,
                    dmg: "---",
                    special: "---",
                    notes:  `${game.i18n.localize("MARTIALARTS.Notes.Weapon")}`,
                    used: false
                }
            }
        ];
        /** @type {Feat[]} */
        const _baseFeats = [
            {
                name: game.i18n.localize("FEATS.Names.Melee"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Ranged"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Thrown"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Athletics"),
                type: "feat",
                system: {
                    level: 0,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Ride"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Search"),
                type: "feat",
                system: {
                    level: -2,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Commerce"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Concentration"),
                type: "feat",
                system: {
                    level: 0,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Run"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Geography"),
                type: "feat",
                system: {
                    level: -2,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Drive"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Teach"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Leadership"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Read"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Medicine"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Oratory"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.FirstAid"),
                type: "feat",
                system: {
                    level: -2,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Deceive"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Brawl"),
                type: "feat",
                system: {
                    level: 0,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Survival"),
                type: "feat",
                system: {
                    level: -2,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Spy"),
                type: "feat",
                system: {
                    level: -4,
                    used: false
                }
            },
            {
                name: game.i18n.localize("FEATS.Names.Camouflage"),
                type: "feat",
                system: {
                    level: -2,
                    used: false
                }
            },
        ];

        actor.updateSource({items: _baseMartialArts.concat(_baseFeats)});
    }
})

/**
 * @private
 */
function registerHandlebars() {
    const STAT_ICONS = {
        body: "fas fa-fist-raised",
        instinct: "fas fa-eye",
        hearth: "fas fa-heart",
        mind: "fas fa-brain",
        perception: "fas fa-search",
        action: "fas fa-running",
        desire: "fas fa-fire",
        resistance: "fas fa-shield-alt",
        mineral: "fas fa-gem",
        vegetable: "fas fa-leaf",
        animal: "fas fa-paw",
        human: "fas fa-user",
        mechanical: "fas fa-cog",
        void: "fas fa-circle-notch",
        power: "fas fa-bolt",
        speed: "fas fa-wind",
        precision: "fas fa-crosshairs",
        atk: "fas fa-sword",
        def: "fas fa-shield-halved",
        aura: "fas fa-yin-yang"
    };

    //Handlebars.registerHelper("isNull", (value) => value === null);
    Handlebars.registerHelper("capitalize", function (value = "") {
        return value.charAt(0).toUpperCase() + value.slice(1);
    });
    Handlebars.registerHelper("statIcon", function (key = "") {
        return STAT_ICONS[key] || "fas fa-question";
    })
}

