export class MartialArtData extends foundry.abstract.TypeDataModel {
    /**
     * @override
     * @return DataSchema
     */
    static defineSchema() {
        /** @type{number[]}*/
        const levelChoice = [null, -4, -2, 0, 1, 2, 3];

        const fields = foundry.data.fields;

        return {
            id: new fields.StringField({ required: true, blank: true, initial: "", gmOnly: true }),
            type: new fields.StringField({ required: true, blank: false, initial: "P", gmOnly: true }),
            cost: new fields.StringField({ required: true, blank: false, initial: "1", gmOnly: true }),
            requirements: new fields.SchemaField({
                misc: new fields.StringField({
                    required: false,
                    blank: true,
                    gmOnly: true
                }),
                aura: new fields.NumberField({required: false, min: 0, max: 3, gmOnly: true}),
                defense: new fields.NumberField({required: false, min: 0, max: 3, gmOnly: true}),
                atk: new fields.NumberField({required: false, min: 0, max: 3, gmOnly: true}),
                schools: new fields.SchemaField({
                    hokuto: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    nanto: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    gento: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    koryu: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    jen: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    shura: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                    taishen: new fields.NumberField({required: false, choices: levelChoice, gmOnly: true}),
                }),
            }),
            level: new fields.NumberField({
                required: false,
                integer: true,
                nullable: true,
                initial: null,
                choices: levelChoice }),
            dmg: new fields.StringField({ required: true, blank: true, initial: "---", gmOnly: true }),
            special: new fields.StringField({ required: true, blank: true, initial: "---", gmOnly: true }),
            notes: new fields.StringField({ required: true, blank: true, initial: "---", gmOnly: true }),
            used: new fields.BooleanField({ required: true, initial: false }),
        };
    }

    /**
     * Format requirements to display in actor sheet
     * accessible in JS as item.system.requirementsString
     * accessible in HBS as {{system.requirementsString}}
     * @return {string}
     */
    get requirementsString() {
        const reqs = this.requirements;
        if (reqs === null || reqs.length === 0)
            return "---";

        /** @type {string[]} */
        const parts = [];

        if (reqs.aura && reqs.aura > 0)
            parts.push(`${game.i18n.localize("MARTIALARTS.Requirements.Aura")} ${reqs.aura}`);
        if (reqs.atk && reqs.atk > 0)
            parts.push(`${game.i18n.localize("MARTIALARTS.Requirements.Atk")} ${reqs.atk}`);
        if (reqs.defense && reqs.defense > 0)
            parts.push(`${game.i18n.localize("MARTIALARTS.Requirements.Def")} ${reqs.defense}`);

        if(reqs.schools !== null) {
            for (let school in reqs.schools) {
                if (reqs.schools[school] > 0) {
                    const prefixLocalized = game.i18n.localize("MARTIALARTS.Schools.School");
                    const schoolNameLocalized = game.i18n.localize(`MARTIALARTS.Schools.${school.charAt(0).toUpperCase() + school.slice(1)}`);
                    const text = `${prefixLocalized} ${schoolNameLocalized} ${reqs.schools[school]}`
                    parts.push(text);
                }
            }
        }

        if (reqs.misc !== null && reqs.misc !== "" && reqs.misc !== "---") {}
            parts.push(reqs.misc);

        return parts?.join(", ").replace(/,\s*$/, "") ?? "---";
    }
}