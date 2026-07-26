export class CharacterData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            bio: new fields.HTMLField({required: true, blank: true, initial: "" }),

            salute: new fields.SchemaField({
                value: new fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
                max: fields.NumberField({required: true, integer: true, initial: 9, min: 0}),
            }),

            statistiche: new fields.SchemaField({
                forza: new fields.NumberField({required: true, integer: true, initial: 1, min: 0, max: 20}),
                destrezza: new fields.NumberField({required: true, integer: true, initial: 2, min: 0, max: 20}),
                mente: new fields.NumberField({required: true, integer: true, initial: 3, min: 0, max: 20}),
            })
        };
    }

    prepareDerivedData() {
        super.prepareDerivedData();
        // Esempio logico futuro: qui potrai calcolare dinamicamente i modificatori delle statistiche
        // senza salvarli fisicamente nel database (es. questo.modificatoreForza = Math.floor((this.statistiche.forza - 10) / 2))
    }
}