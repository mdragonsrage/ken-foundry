export class CharacterData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            bio: new fields.HTMLField({required: true, blank: true, initial: "" }),

            salute: new fields.SchemaField({
                value: new fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
                max: new fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
            }),

            statistiche: new fields.SchemaField({
                forza: new fields.NumberField({required: true, integer: true, initial: 1, min: 0, max: 20}),
                destrezza: new fields.NumberField({required: true, integer: true, initial: 2, min: 0, max: 20}),
                mente: new fields.NumberField({required: true, integer: true, initial: 3, min: 0, max: 20}),
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        this.derivated = {};

        this.derivated.modificatori = {
            forza: Math.floor((this.statistiche.forza - 10) / 2),
            destrezza: Math.floor((this.statistiche.destrezza - 10) / 2),
            mente: Math.floor((this.statistiche.mente - 10) / 2)
        };

        this.derivated.difesa = 10 + this.derivated.modificatori.destrezza;

        this.derivated.ki = {
            max: this.statistiche.mente * 2
        };
    }
}