export class CharacterData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            bio: new fields.HTMLField({required: true, blank: true, initial: "" }),

            health: new fields.SchemaField({
                value: new fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
                max: new fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
            }),

            stats: new fields.SchemaField({
                strength: new fields.NumberField({required: true, integer: true, initial: 1, min: 0, max: 20}),
                dexterity: new fields.NumberField({required: true, integer: true, initial: 2, min: 0, max: 20}),
                mind: new fields.NumberField({required: true, integer: true, initial: 3, min: 0, max: 20}),
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        this.derivated = {};

        this.derivated.statMod = {
            strength: Math.floor((this.stats.strength - 10) / 2),
            dexterity: Math.floor((this.stats.dexterity - 10) / 2),
            mind: Math.floor((this.stats.mind - 10) / 2)
        };

        this.derivated.defense = 10 + this.derivated.statMod.dexterity;

        this.derivated.ki = {
            max: this.stats.mind * 2
        };
    }
}