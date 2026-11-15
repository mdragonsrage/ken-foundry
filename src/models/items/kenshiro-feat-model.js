export class FeatData extends foundry.abstract.TypeDataModel {
    /**
     * @override
     * @return DataSchema
     */
    static defineSchema() {
        /** @type{number[]}*/
        const levelChoice = [null, -4, -2, 0, 1, 2, 3];

        const fields = foundry.data.fields;

        return {
            level: new fields.NumberField({
                required: false,
                integer: true,
                nullable: true,
                initial: null,
                choices: levelChoice }),
            used: new fields.BooleanField({ required: true, initial: false }),
        };
    }
}