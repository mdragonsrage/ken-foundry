export class KenshiroMartialArtSheet extends foundry.applications.api.HandlebarsApplicationMixin(
    foundry.applications.sheets.ItemSheetV2
) {
    /** @override */
    static DEFAULT_OPTIONS = {
        id: "kenshiro-martial-art-sheet",
        classes: ["kenshiro", "sheet", "kenshiro-item-wrapper", "kenshiro-martial-art-sheet"],
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
            closeOnSubmit: false,
            scrollable: true
        }
    }

    /** @override */
    static PARTS = {
        header: {
            template: "systems/kenshiro/templates/partials/martial-arts/kenshiro-martial-art-header.hbs"
        },
        tabs: {
            template: "systems/kenshiro/templates/partials/martial-arts/kenshiro-martial-art-tab-navigation.hbs"
        },
        info: {
            template: "systems/kenshiro/templates/partials/martial-arts/kenshiro-martial-art-info.hbs",
            scrollable: ['']
        },
        req: {
            template: "systems/kenshiro/templates/partials/martial-arts/kenshiro-martial-art-requirements.hbs",
            scrollable: ['']
        }
    }

    /** @override */
    static TABS = {
        primary: {
            tabs: [
                {id: "info"},
                {id: "req"}
            ],
            initial: "info"
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

    /** @override */
    async _preparePartContext(partId, context) {
        switch (partId) {
            case "info":
            case "req":
                context.tab = context.tabs[partId];
                break;
            default:
        }

        return context;
    }

}
