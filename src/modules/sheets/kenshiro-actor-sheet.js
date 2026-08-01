/**
 * Character sheet for Kenshiro GDR from Nexus
 * Extends foundry.application.api.ActorSheetV2
 */
export class KenshiroActorSheet extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ActorSheetV2
) {

    /** @override */
    static DEFAULT_OPTIONS = {
        id: "kenshiro-actor-sheet",
        classes: ["kenshiro", "sheet", "actor", "kenshiro-sheet-wrapper"],
        tag: "form",
        window: {
            resizable: true,
            title: "KENSHIRO.SheetTitle"
        },
        position: {
          width: 800,
          height: 600,
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
            scrollable: true
        },
        dragDrop: [{ dragSelector: ".item", dropSelector: "form" }],
        actions: {
            throwDice: KenshiroActorSheet._onThrowDice,
            roll: KenshiroActorSheet._onRollMartialArts,
            //edit: KenshiroActorSheet._onEdit,
            delete: KenshiroActorSheet._onDelete,
        }
    }

    /** @override */
    static PARTS = {
        header: {
            template: "systems/kenshiro/templates/partials/actor/kenshiro-actor-header.hbs"
        },
        tabs: {
            template: "systems/kenshiro/templates/partials/actor/kenshiro-actor-tab-navigation.hbs"
        },
        stats: {
            template: "systems/kenshiro/templates/partials/actor/kenshiro-actor-stats.hbs",
            scrollable: [''],
        },
        ma: {
            template: "systems/kenshiro/templates/partials/actor/kenshiro-actor-martial-arts.hbs",
            scrollable: [''],
        },
        footer: {
            template: "systems/kenshiro/templates/partials/actor/kenshiro-actor-footer.hbs"
        }
    }

    /**
     * @override
     */
    static TABS = {
        primary: {
            tabs: [
                {id: "stats"},
                {id: "ma"}
            ],
            initial: "stats"
        }
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);

        context.actor = this.actor;
        context.system = this.actor.system;
        context.actorName = this.actor.name;

        this._prepareItems(context);

        return context;
    }

    /**
    /** @override */
    async _preparePartContext(partId, context) {
        switch (partId) {
            case "stats":
            case "ma":
                context.tab = context.tabs[partId];
                break;
            default:
        }

        return context;
    }

    /** @override */
    prepareSubmitData(event, form, formData) {
        const submitData = foundry.utils.expandObject(formData.object);

        if (!submitData.name || submitData.name.trim() === "") {
            submitData.name = this.actor.name;
        }

        return submitData;
    }

    /**
     * Function use to set actor item (e.g. martial arts, equip...)
     * @private
     * @param context
     */
    _prepareItems(context) {
        const martialArts = [];
        const items = this.actor.items.contents;

        for (let i of items) {
            if(i.type === "martialArt")
                this._prepareMartialArts(i, martialArts);
        }

        context.martialArts = martialArts;
    }

    /**
     * Converts item in Martial Arts and add to actor list
     * @private
     * @param {MartialArt} martialArt
     * @param {MartialArt[]} martialArts
     */
    _prepareMartialArts(martialArt, martialArts) {

        /** @type {MartialArt} */
        const i= {
            id: martialArt.id,
            name: martialArt.name,
            system: martialArt.system
        }

        martialArts.push(i);
    }

    /**
     * Rolls 2d6 based on selected key stat
     * @param event
     * @param target
     * @return {Promise<void>}
     * @private
     */
    static async _onThrowDice(event, target) {
        event.preventDefault();

        const actor = this.actor;
        const statKey = target.dataset.stat;

        if(!statKey) {
            const roll = await new Roll("2d6").evaluate();
            await roll.toMessage({
                speaker: ChatMessage.getSpeaker({actor: actor}),
                flavor: `${actor.name} - <strong>Rolls 2d6</strong>`
            });
            return;
        }

        const mod = actor.system.derivated.statMod[statKey] || 0;
        const formula = `2d6 + ${mod}`;
        const roll = await new Roll(formula).evaluate();
        const statLabel = game.i18n.localize(`KENSHIRO.Stats.${statKey.charAt(0).toUpperCase() + statKey.slice(1)}`);
        const rollLabel = game.i18n.localize(`KENSHIRO.RollOn`);
        const modLabel = game.i18n.localize(`KENSHIRO.Mod`);

        await roll.toMessage({
            speaker: ChatMessage.getSpeaker({actor: actor}),
            flavor: `${actor.name} - <strong>${rollLabel} ${statLabel}</strong> (${modLabel}: ${mod >= 0? '+': ''}${mod})`
        });
    }

    /**
     * Roll based on martial arts requirements
     * @private
     * @param event
     * @param target
     * @return void
     */
    static async _onRollMartialArts(event, target) {
        event.preventDefault();
        const itemId = target.closest(".martial-art").dataset.id;
        const martialArt = this.actor.items.get(itemId);
        debugger;
        if(!martialArt)
            return;
    }

    /**
     * Delete selected martial art
     * @private
     * @param event
     * @param target
     * @return void
     */
    static async _onDelete(event, target) {
        event.preventDefault();
        const itemId = target.closest(".martial-art").dataset.id;
        const item = this.actor.items.get(itemId);
        if(!item)
            return;

        const title = game.i18n.localize("KENSHIRO.Actions.Delete");
        const message = game.i18n.localize("KENSHIRO.Actions.DeleteText");
        const cancel = game.i18n.localize("KENSHIRO.Actions.Cancel");
        return foundry.applications.api.DialogV2.confirm({
            title: title,
            message: `${message} ${item.name} ?`,
            yesText: title,
            cancelText: cancel,
            yes: () => item.delete()
        })
    }
}