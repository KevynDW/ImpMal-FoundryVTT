import { ListModel } from "../../shared/list";

let fields = foundry.data.fields;

export class TraitListModel extends ListModel
{
    static defineSchema() 
    {
        let schema = super.defineSchema();
        schema.list = new fields.ArrayField(new fields.SchemaField({
            key : new fields.StringField(),
            value : new fields.StringField({nullable : true})
        }));

        return schema;
    }

    has(key)
    {
        return this.list.find(i => i.key == key);
    }

    removeKey(key)
    {
        let index = this.list.findIndex(i => i.key == key);
        if (index != -1)
        {
            return super.remove(index);
        }
        else 
        {
            return this.list;
        }
    }

    add(traits, {replace=false}={})
    {

        if ((traits instanceof Array) == false)
        {
            traits = [traits];
        }

        // Don't add multiples
        traits = traits.filter(i => i.key && !this.has(key));

        if (replace)
        {
            return traits;
        }
        else 
        {
            return super.add(trait);
        }
    }

    // Combine the given trait model with this one, used for ammo
    combine(traits)
    {
        for(let trait of traits.list)
        {
            let existing = this.has(trait.key);
            if (existing)
            {
                if (Number.isNumeric(existing.value) && Number.isNumeric(trait.value))
                {
                    existing.value = Number(existing.value) + Number(trait.value);
                }
                else 
                {
                    this.list.push(trait);
                }
            }
            else 
            {
                this.list.push(trait);
            }
        }
    }

    getTraitDisplayStrings()
    {
        for (let trait of this.list)
        {
            trait.display = game.impmal.config.weaponArmourTraits[trait.key] || game.impmal.config.itemTraits[trait.key];
            if (trait.value)
            {
                trait.display += ` (${trait.value})`;
            }
        }
    }

    get displayString() 
    {
        return this.list
            .map(i => 
            {
                let display = game.impmal.config.weaponArmourTraits[i.key] || game.impmal.config.itemTraits[i.key];
                if (i.value)
                {
                    display += ` (${i.value})`;
                }
                return display;
            }).join(", ");
    }

}