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
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 2, 2, 2, 2, 2]}), // 0 = healthy, 1 = wounded, 2 = blocked, 3 = lost
                }),
                body: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 0, 0, 2, 0, 0, 2, 2]}),
                }),
                lArm: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 0, 2, 2, 2, 2, 2]}),
                }),
                rArm: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 0, 2, 2, 2, 2, 2]}),
                }),
                lLeg: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 0, 2, 2, 2, 2, 2]}),
                }),
                rLeg: new fields.SchemaField({
                    maArmor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    armor: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    hitPoints: new fields.ArrayField(
                        new fields.NumberField({integer: true, min: 0, max: 3}),
                        {initial: [0, 0, 0, 2, 2, 2, 2, 2]}),
                }),
            }),

            resources: new fields.SchemaField({
                damage: new fields.SchemaField({
                    value: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 6}),
                    maxUnblocked: new fields.NumberField({required: true, integer: true, initial: 1, min: 0, max: 6})
                }),
                resistance: new fields.SchemaField({
                    value: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    maxUnblocked: new fields.NumberField({required: true, integer: true, initial: 6, min: 0, max: 10}),
                }),
                equilibrium: new fields.SchemaField({
                    value: new fields.NumberField({required: true, integer: true, initial: 0, min: 0, max: 10}),
                    maxUnblocked: new fields.NumberField({required: true, integer: true, initial: 6, min: 0, max: 10}),
                }),
            }),

            derived: new fields.SchemaField({
                initiative: new fields.NumberField({ initial: 0 }),
                movement: new fields.NumberField({ initial: 0 }),
                run: new fields.NumberField({ initial: 0 }),
                atk: new fields.SchemaField({
                    physicalHandToHand: new fields.NumberField({initial: 0}),
                    physicalRanged: new fields.NumberField({ initial: 0 }),
                    mechanicalHandToHand: new fields.NumberField({ initial: 0 }),
                    mechanicalRanged: new fields.NumberField({ initial: 0 }),
                }),
                defense: new fields.SchemaField({
                    dodge: new fields.NumberField({initial: 0}),
                    physicalParry: new fields.NumberField({initial: 0}),
                    mechanicalParry: new fields.NumberField({initial: 0}),
                })
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();

        this.reigns.void = -1;

        this.totalMalus = this.calcMalus();

        this.derived.initiative =
            (this.components.instinct ?? 0) +
            (this.abilities.action ?? 0) +
            (this.reigns.human ?? 0) +
            (this.techniques.aura ?? 0) - this.totalMalus;

        this.derived.movement = 8 + (this.techniques.def ?? 0) - this.totalMalus;
        const feats = this.parent.items.filter(item =>  item.type === "feat");
        const run = feats.find(item => item.name === game.i18n.localize("FEATS.Names.Run"));
        this.derived.run = (this.derived.movement + (run?.system.level ?? -4 )) * 3; //TODO: + run feat;

        const baseHth = (this.components.body ?? 0) + (this.abilities.action ?? 0) + (this.techniques.atk ?? 0) - this.totalMalus;
        const baseRanged = (this.components.body ?? 0) + (this.abilities.perception ?? 0) + (this.techniques.atk ?? 0) - this.totalMalus;
        const baseDef = (this.components.body ?? 0) + (this.abilities.action ?? 0) + (this.techniques.defense ?? 0) - this.totalMalus;
        this.derived.atk.physicalHandToHand = baseHth + (this.reigns.human ?? 0);
        this.derived.atk.mechanicalHandToHand = baseHth + (this.reigns.mechanical ?? 0);
        this.derived.atk.physicalRanged = baseRanged + (this.reigns.human ?? 0);
        this.derived.atk.mechanicalRanged = baseRanged + (this.reigns.mechanical ?? 0);
        this.derived.defense.physicalParry = baseDef + (this.reigns.human ?? 0);
        this.derived.defense.mechanicalParry = baseDef + (this.reigns.mechanical ?? 0);
        this.derived.defense.dodge = (this.components.instinct ?? 0) + (this.abilities.perception ?? 0) + (this.techniques.defense ?? 0) - this.totalMalus;
    }

    /**
     * Calculates malus due to various sources: resources, armor ...
     * @return number
     */
    calcMalus() {
      return this.calcResourceMalus() + this.calcArmorMalus();
    }

    /**
     * Calculate Resource malus
     * @return number
     */
    calcResourceMalus() {
        const damageVal = (this.resources.damage?.value ?? 0);
        const malusDamage = damageVal === 5 ? 0 : - damageVal;
        const malusResistance = (this.resources.resistance?.value ?? 0) === 9 ? -1 : 0;
        const malusEquilibrium = (this.resources.equilibrium?.value ?? 0) === 9 ? -1 : 0;
        this.resourceMalus = malusDamage + malusResistance + malusEquilibrium;
        return this.resourceMalus;
    }

    /**
     * Calculate Armor malus
     * @return number
     */
    calcArmorMalus() {
        let totArmorVal = 0;
        for (let location in this.hitLocations) {
            totArmorVal += this.hitLocations[location]?.armor ?? 0;
        }

        this.armorMalus  = Math.floor(totArmorVal / 6);
        return this.armorMalus;
    }
}