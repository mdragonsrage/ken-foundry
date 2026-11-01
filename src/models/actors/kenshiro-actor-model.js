export class CharacterData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const fields = foundry.data.fields;

        return {
            bio: new fields.HTMLField({required: true, blank: true, initial: "" }),

            components: new fields.SchemaField({
                body: new fields.NumberField({required: true, integer: true, initial: 1, min: 1, max: 7}),
                instinct: new fields.NumberField({required: true, integer: true, initial: 1, min: 1, max: 7}),
                hearth: new fields.NumberField({required: true, integer: true, initial: 1, min: 1, max: 7}),
                mind: new fields.NumberField({required: true, integer: true, initial: 1, min: 1, max: 7}),
            }),

            abilities: new fields.SchemaField({
                perception: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 5}),
                action: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 5}),
                desire: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 5}),
                resistance: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 5}),
            }),

            reigns: new fields.SchemaField({
                mineral: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                vegetable: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                animal: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                human: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                mechanical: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                void: new fields.NumberField({required: true, integer: true, initial: -1, min: -1, max: -1}),
            }),

            energies: new fields.SchemaField({
                power: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                speed: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                precision: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
            }),

            techniques: new fields.SchemaField({
                atk: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                def: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
                aura: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 3}),
            }),

            hitLocations: new fields.SchemaField({
                head: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                        {initial: [true, true, true, true, false, false, false]}),
                }),
                body: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                        {initial: [false, false, false, false, false, false, false, false, false]}),
                }),
                lArm: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                        {initial: [false, false, false, false, false, false, false, false]}),
                }),
                rArm: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                    {initial: [false, false, false, false, false, false, false, false]}),
                }),
                lLeg: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                        {initial: [false, false, false, false, false, false, false, false]}),
                }),
                rLeg: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(new fields.BooleanField(),
                        {initial: [false, false, false, false, false, false, false, false]}),
                }),
            }),

            derivated: new fields.SchemaField({
                defenseValue: new fields.NumberField({ initial: 0 })
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        this.derivated = {};

        this.reigns.void = -1;
    }
}