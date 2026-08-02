export class KenshiroMartialArtSheet extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ItemSheetV2
) {
    /** @override */
    static DEFAULT_OPTIONS = {
        id: "kenshiro-martial-art-sheet",
        classes: ["kenshiro", "sheet", "item"],
        tag: "form",
        window: {
            resizable: true,
            title: "ITEMS.MartialArts.Title"
        },
        position: {
            width: 450,
            height: 500,
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false
        }
    }

    /** @override */
    static PARTS = {
        form: {
            template: "systems/kenshiro/templates/sheets/kenshiro-martial-art-sheet.hbs"
        }
    }

    /**
     * @override
     */
    async _prepareContext(options) {
        debugger;
        const context = await super._prepareContext(options);

        const item = this.document;
        context.item = item;
        context.system = item.system;
        context.itemName = item.name;

        const levelField = item.system.schema.fields.level;
        context.levelChoices =  levelField.choices ?? [];

        return context;
    }
}
