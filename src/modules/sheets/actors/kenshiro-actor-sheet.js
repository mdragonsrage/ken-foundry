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
          width: 930,
          height: 810,
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
            scrollable: true
        },
        dragDrop: [{ dragSelector: ".item", dropSelector: "form" }],
        actions: {
            cycleHealth: KenshiroActorSheet._onCycleHealthState,
            setTrack: KenshiroActorSheet._onSetTrack,
            toggleUsed: KenshiroActorSheet._onToggleUsed,
            throwDice: KenshiroActorSheet._onThrowDice,
            roll: KenshiroActorSheet._onRoll,
            edit: KenshiroActorSheet._onEdit,
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

        context.statIcons = {
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
            atk: "fas fa-sword", // Nota: in FontAwesome 5/6 usa "fas fa-gavel" o "fas fa-fist-raised" se non hai FA Pro
            def: "fas fa-shield-halved",
            aura: "fas fa-yin-yang"
        };

        await this._prepareTrack(context);
        this._prepareItems(context);

        return context;
    }

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
                martialArts.push(this._prepareMartialArts(i));
        }

        context.martialArts = martialArts;
    }

    /**
     * Function use to set track bar for resources (i.e. damage, resistance, equilibrium)
     * @private
     * @param context
     */
    async _prepareTrack(context) {
        const system = this.actor.system;

        const damageLabels = { 0: "0", 1: "-1", 2: "-2", 3: "-3", 4: "-4", 5: game.i18n.localize("Various.Coma").toUpperCase() };
        context.damagePointsBoxes = Array.from({ length: 6 }, (_, i) => ({
            value: i,
            label: damageLabels[i],
            isTextBox: i === 5,
            isFilled: i <= (system.resources.damage?.value ?? 0),
            isLocked: i < (system.resources.damage?.maxUnblocked ?? 0)
        }));

        context.resistancePointsBoxes = Array.from({ length: 11 }, (_, i) => ({
            value: i,
            label: i === 10 ? "-1 " + game.i18n.localize("Various.Ko").toUpperCase() : `${10 - i}`,
            isTextBox: i === 10,
            isFilled: i <= (system.resources.resistance?.value ?? 0),
            isLocked: i < (system.resources.resistance?.maxUnblocked ?? 0)
        }));

        context.equilibriumPointsBoxes = Array.from({ length: 11 }, (_, i) => ({
            value: i,
            label: i === 10 ? game.i18n.localize("Various.Crazy").toUpperCase() : `${10 - i}`,
            isTextBox: i === 10,
            isFilled: i <= (system.resources.equilibrium?.value ?? 0),
            isLocked: i < (system.resources.equilibrium?.maxUnblocked ?? 0)
        }));

        return context;
    }

    /**
     * Change health circles status
     * Only GM can deactivate/activate other health points via UI
     * @private
     * @param event mouse click
     * @param target event target
     */
    static async _onCycleHealthState(event, target) {
        event.preventDefault();
        const actionTarget = target || event.currentTarget || event.target.closest('[data-action="cycleHealth"]');
        const location = actionTarget.dataset.location;
        const index = parseInt(actionTarget.dataset.index);
        const currentState = parseInt(actionTarget.dataset.state);

        if(currentState > 1 && !game.user.isGM) {
            return;
        }

        let nextState = (currentState + 1) % 4;

        if (currentState === 1 && !game.user.isGM) {
            nextState = 0;
        }

        const currentArray = [... this.actor.system.hitLocations[location].hitPoints];
        currentArray[index] = nextState;

        const updatedData = {
            [`system.hitLocations.${location}.hitPoints`]: currentArray
        };

        await this.actor.update(updatedData);
    }

    /**
     * Change resource level
     * Only GM can block/unblock further resource points via UI
     * @private
     * @param event mouse click
     * @param target event target
     */
    static async _onSetTrack(event, target) {
        event.preventDefault();

        const actionTarget = target || event.currentTarget || event.target.closest('[data-action="setTrack"]');
        if (!actionTarget) return;

        let actor = this.actor;
        const isGM = game.user.isGM;
        const property = actionTarget.dataset.prop;
        const root = actionTarget.dataset.root;
        const clickedValue = parseInt(actionTarget.dataset.value);
        if (!property || isNaN(clickedValue)) return;

        if (event.shiftKey && event.altKey) {
            await KenshiroActorSheet.setTrackValue(clickedValue, property, root, actor);
            return;
        }

        if(!isGM) {
            return;
        }

        if (event.altKey) {
            await KenshiroActorSheet.unblockTrackValue(clickedValue, actor, property, root);
            return;
        }

        await KenshiroActorSheet.blockTrackValue(clickedValue, actor, property, root);
    }

    static async unblockTrackValue(clickedValue, actor, property, root) {
        await actor.update({
                [`system.${root}.${property}.maxUnblocked`]: clickedValue,
                [`system.${root}.${property}.value`]: clickedValue
        });
    }

    static async blockTrackValue(clickedValue, actor, property, root) {
        await actor.update({
            [`system.${root}.${property}.maxUnblocked`]: clickedValue + 1,
            [`system.${root}.${property}.value`]: clickedValue + 1
        });
    }

    static async setTrackValue(clickedValue, property, root, actor) {
        await actor.update({
            [`system.${root}.${property}.value`]: clickedValue
        });
    }

    /**
     * Converts item in Martial Arts and add to actor list
     * @private
     * @param {MartialArt} martialArt
     * @return {MartialArt}
     */
    _prepareMartialArts(martialArt) {
        return {
            id: martialArt.id,
            name: martialArt.name,
            system: martialArt.system
        }
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
    static async _onRoll(event, target) {
        event.preventDefault();
        const itemId = target.closest(".martial-art").dataset.itemId;
        const martialArt = this.actor.items.get(itemId);
        if(!martialArt)
            return;
    }

    /**
     * Roll based on martial arts requirements
     * @private
     * @param event
     * @param target
     * @return void
     */
    static async _onEdit(event, target) {
        event.preventDefault();

        const itemId = target.closest(".martial-art").dataset.itemId;
        const martialArt = this.actor.items.get(itemId);

        if(!martialArt)
            return;

        const level = martialArt.system.level;
        const levelField = martialArt.system.schema.fields.level;
        const choicesEntries = levelField.choices;
        const htmlContent = KenshiroActorSheet._getMartialArtsEditContent(choicesEntries, level, martialArt);

        await new foundry.applications.api.DialogV2({
            window: {
                title: `${game.i18n.localize("KENSHIRO.MartialArts.Edit")}: ${martialArt.name}`,
                id: `edit-martial-art-${martialArt.id}`,
                resizable: false
            },
            content: htmlContent,
            buttons: [
                {
                    action: "save",
                    label: game.i18n.localize("KENSHIRO.Actions.Confirm"),
                    class: "ok",
                    callback: async (event, button) => {
                        const dialogHtml = button.form;
                        const rawLevel = dialogHtml.querySelector("#ma-edit-level").value;

                        let newLevel = (rawLevel === "" || rawLevel === "null") ? null : parseInt(rawLevel, 10);
                        await martialArt.update({"system.level": newLevel});
                    }
                },
                {
                    action: "cancel",
                    label: game.i18n.localize("KENSHIRO.Actions.Cancel"),
                    class: "cancel"
                }
            ],
            renderProcessed: (html) => html.querySelector("#ma-edit-level")?.focus()
        }).render({ force: true });
    }


    /**
     *
     * @param {number[]} choicesEntries
     * @param {number|null} level
     * @param {MartialArt} martialArt
     * @return {string}
     * @private
     */
    static _getMartialArtsEditContent(choicesEntries, level, martialArt) {
        let selectOptions = "";

        for (const value of choicesEntries) {
            const isSelected = value === level ? "selected" : "";
            selectOptions += `<option value="${value}" ${isSelected}>${value ?? 'X'}</option>`;
        }

        return `
            <div class="kenshiro-martial-arts-dialog-wrapper">
                <p class="text">
                    ${game.i18n.localize("KENSHIRO.MartialArts.EditText")} <strong style="color: #fff;">${martialArt.name}</strong>
                </p>

                <div class="form-group">
                    <label>
                        ${game.i18n.localize("KENSHIRO.MartialArts.Level")}
                    </label>
                    <select id="ma-edit-level">
                        ${selectOptions}
                    </select>
                </div>
            </div>
        `;
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
        const itemId = target.closest(".martial-art").dataset.itemId;
        const item = this.actor.items.get(itemId);
        if(!item)
            return;

        const del = game.i18n.localize("KENSHIRO.Actions.Delete");
        const cancel = game.i18n.localize("KENSHIRO.Actions.Cancel");
        const message = game.i18n.localize("KENSHIRO.Actions.DeleteText");
        return foundry.applications.api.DialogV2.confirm({
            buttons: [
                {
                    label: del,
                    action: "yes",
                    class: "danger",
                },
                {
                    label: cancel,
                    action: "no",
                    default: true,
                }
            ],
            content: `${message} ${item.system.id} ${item.name} ?`,
            rejectClose: true,
            modal: true,
            submit: (val) => val === "yes" ? item.delete() : "",
        })
    }

    /**
     * @private
     * @param event
     * @param target
     * @return void
     */
    static async _onToggleUsed(event, target) {
        event.stopPropagation();

        const itemId = target.closest("input").dataset.itemId;
        if (!itemId)
            return;
        const item = this.actor.items.get(itemId);
        if(!item)
            return;

        await item.update({"system.used": target.checked});
    }

    /**
     *
     * @return {DragDrop[]}
     * @override
     */
    _createDragDropHandlers() {
        return this.options.dragDrop.map(options => {
            return new foundry.applications.ux.DragDrop({
                dragSelector: options.dragSelector,
                dropSelector: options.dropSelector,
                callbacks: {
                    dragstart: this._onItemDragStart.bind(this),
                    drop: this._onItemDrop.bind(this)
                }
            });
        });
    }

    /**
     * @override
     */
    async _onDrop(event) {
        event.preventDefault();

        try {
            const rawData = event.dataTransfer.getData("text/plain");
            if (!rawData) return;
            const data = JSON.parse(rawData);
            if (!data || data.type !== "Item") return;

            const item = await Item.fromDropData(data);
            if (!item) return false;

            if (item.type !== "martialArt")
                return false;

            if (this.document.items.some(i => i.name.toLowerCase() === item.name.toLowerCase()))
                return false;

            const itemData = item.toObject();
            await this.document.createEmbeddedDocuments("Item", [itemData]);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * @override
     */
    _onDragStart(event) {
        const li = event.currentTarget;
        if (li.classList.contains("martial-art-header")) return;

        const item = this.document.items.get(li.dataset.itemId);
        if (!item) return;

        const dragData = item.toDragData();
        if (!dragData) return;

        event.dataTransfer.setData("text/plain", JSON.stringify(dragData));
    }
}