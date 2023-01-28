import { CharacterCombatModel } from "./components/combat";
import { InfluenceModel } from "../shared/influence";
import { ListModel } from "../shared/list";
import { StandardActorModel } from "./standard";
import { HandsModel } from "./components/hands";
import { XPModel } from "./components/xp";
import { ImpMalEffect } from "../../document/effect";
let fields = foundry.data.fields;

export class CharacterModel extends StandardActorModel 
{
    static defineSchema() 
    {
        let schema = super.defineSchema();
        schema.handed = new fields.StringField();
        schema.solars = new fields.NumberField();
        schema.combat = new fields.EmbeddedDataField(CharacterCombatModel);
        schema.xp = new fields.EmbeddedDataField(XPModel);
        schema.details = new fields.SchemaField({
            age : new fields.NumberField(),
            feature : new fields.StringField(),
            eyes : new fields.StringField(),
            hair : new fields.StringField(),
            height : new fields.StringField(),
            weight : new fields.StringField(),
            divination : new fields.StringField()
        });
        schema.goal = new fields.SchemaField({
            short : new fields.StringField(),
            long : new fields.StringField()
        });
        schema.corruption = new fields.NumberField();
        schema.fate = new fields.SchemaField({
            max : new fields.NumberField(),
            value : new fields.NumberField()
        });
        schema.connections = new fields.EmbeddedDataField(ListModel);
        schema.influence = new fields.EmbeddedDataField(InfluenceModel);
        schema.hands = new fields.EmbeddedDataField(HandsModel);
        schema.warp = new fields.SchemaField({
            charge : new fields.NumberField({min: 0}),
        });
        return schema;
    }

    preCreateData(data) 
    {
        let preCreateData = super.preCreateData(data);
        if (!data.prototypeToken)
        {
            mergeObject(preCreateData, {
                "prototypeToken.sight" : {enabled : true},
                "prototypeToken.actorLink" : true,
                "prototypeToken.disposition" : CONST.TOKEN_DISPOSITIONS.FRIENDLY
            });
        }
        return preCreateData;
    }


    computeDerived(items)
    {
        super.computeDerived(items);
        this.hands.getDocuments(items.all);
        this.xp.spent = XPModel.computeSpentFor(this.parent);
        this.xp.available = this.xp.total - this.xp.spent;
        this.combat.superiority = game.impmal.superiority.value;
        this.warp.threshold = this.characteristics.wil.bonus;
    }

    updateChecks()
    {
        this._checkComputedEffects(this.parent);
    }



    _checkComputedEffects(actor)
    {
        let overburdened = actor.hasCondition("overburdened");
        let restrained = actor.hasCondition("restrained");
        let effect;

        if (actor.system.encumbrance.state == 0)
        {
            if (overburdened?.isComputed)
            {
                overburdened.delete();
            }
            if (restrained?.isComputed)
            {
                restrained.delete();
            }
        }

        else if (actor.system.encumbrance.state == 1)
        {
            if (!overburdened)
            {   
                effect = ImpMalEffect.findEffect("overburdened");
            }

            if (restrained?.isComputed)
            {
                restrained.delete();
            }
        }
        else if (actor.system.encumbrance.state == 2)
        {
            if (!restrained)
            {   
                effect = ImpMalEffect.findEffect("restrained");
            }
        }

        if (effect)
        {
            effect["flags.impmal.computed"] = true;
            ImpMalEffect.create(ImpMalEffect.getCreateData(effect), {parent : actor});
        }

    }
}

