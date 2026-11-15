export class KenshiroFeatSheet extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ItemSheetV2
) {
    static DEFAULT_OPTIONS = {
        id: "kenshiro-feat-sheet",
        classes: ["kenshiro", "sheet", "kenshiro-item-wrapper", "kenshiro-feat-sheet"],
        tag: "form",
        window: {
            resizable: true,
            title: "ITEMS.Feats.Title"
        },
        position: {
            width: 450,
            height: 250,
        },
        form: {
            submitOnChange: true,
            closeOnSubmit: false,
            scrollable: true
        }
    }

    /** @override */
    static PARTS = {
        header: {
            template: "systems/kenshiro/templates/partials/feats/kenshiro-feat-header.hbs"
        },
        info: {
            template: "systems/kenshiro/templates/partials/feats/kenshiro-feat-info.hbs",
            scrollable: ['']
        }
    }


    /** @override */
    async _prepareContext(options) {
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