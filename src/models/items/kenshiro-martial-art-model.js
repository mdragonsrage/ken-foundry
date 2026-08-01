export class MartialArtData extends foundry.abstract.TypeDataModel {
    /**
     * @override
     * @return DataSchema
     */
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            id: new fields.StringField({ required: true, blank: false }),
            type: new fields.StringField({ required: true, blank: false, initial: "P" }),
            cost: new fields.StringField({ required: true, blank: false, initial: "1" }),
            requirements: new fields.StringField({ required: true,
                blank: true, initial: "---" }),
            level: new fields.NumberField({ required: false, integer: true,
                initial: null,
                choices: [null, -4, -2, 0, 1, 2, 3] }),
            dmg: new fields.StringField({ required: true, blank: true, initial: "" }),
            special: new fields.StringField({ required: true, blank: true, initial: "" }),
            notes: new fields.StringField({ required: true, blank: true, initial: "" }),
            used: new fields.BooleanField({ required: true, initial: false }),
        };
    }
}