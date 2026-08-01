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
        classes: ["kenshiro", "sheet", "actor"],
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
            closeOnSubmit: false
        },
        dragDrop: [{ dragSelector: ".item", dropSelector: "form" }],
        tabs: [
            {
                id: "primary",
                navSelector: '.sheet-tabs',
                contentSelector: ".sheet-body",
                initial: "stats"
            }
        ],
    }

    /** @override */
    static PARTS = {
        sheet: {
            template: "systems/kenshiro/templates/sheets/kenshiro-actor-sheet.hbs"
        }
    }

    /** @override */
    static ACTIONS = {
        throwDice: KenshiroActorSheet._onThrowDice,
    };


    /** @override */
    _onRender(context, options) {
        super._onRender(context, options);

        // tabs navigation
        const html = this.element;
        const tabLinks = html.querySelectorAll('nav[data-group="primary"] .item');

        tabLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.tabGroups.primary = link.dataset.tab;
                this.render();
            });
        });
    }

    /** @override */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);

        context.actor = this.actor;

        context.system = this.actor.system;

        context.actorName = this.actor.name;
        context.activeTab = this.tabGroups.primary || "stats";

        this._prepareItems(context);

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
        if(!statKey)
            return;

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
     * Function use to set actor item (e.g martial arts, equip...)
     * @private
     * @param context
     */
    _prepareItems(context) {
        const martialArts = [];

        for (let i in this.actor.items) {
            if(i.type === "martialArt")
                this._prepareMartialArts(martialArts);
        }

        context.martialArts = martialArts;
    }

    /**
     * Converts item in Martial Arts and add to actor list
     * @private
     * @param martialArts
     */
    _prepareMartialArts(martialArts) {

        const i = {
            id: i.id,
            name: i.name,
            description: i.description,
            img: i.url,
            system: i.system
        }

        martialArts.push(i);
    }
}