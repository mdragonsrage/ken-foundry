/**
 * Character sheet for Kenshiro GDR from Nexus
 * Extends foundry.application.api.ActorSheetV2
 */

export class KenshiroActorSheet extends foundry.applications.api.ApplicationV2 {

    static DEFAULT_OPTIONS = {
        id: "kenshiro-actor-sheet",
        classes: ["kenshiro", "sheet", "actor"],
        tag: "form",
        window: {
            resizable: true,
            title: "KENSHIRO.SheetTitle"
        },
        actions: {
            throwDice: KenshiroActorSheet._onThrowDice
        },
        form: {
            submitOnChange: true,
            closeOnChange: false,
        }
    }

    static PARTS = {
        scheda: {
            template: ["systems/kenshiro/templates/sheets/kenshiro-actor-sheet.hbs"],
        }
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);

        context.system = this.actor.system;

        context.controller = CONFIG.KENSHIRO;
    }

    static async onThrowDice(event, target) {
        event.preventDefault();

        const actor = this.actor;
        const roll = await new Roll("2d6").evaluate();

        await roll.toMessage({
            speaker: "kenshiro-actor-sheet",
            flavor: `Lancio di caratteristica per ${actor.name}`

        });
    }
}