import { SkillTestDialog } from "./skill-dialog";

export class AttackDialog extends SkillTestDialog
{  
    subTemplate = `systems/impmal/templates/apps/test-dialog/attack-fields.hbs`;

    async getTemplateFields() 
    {
        let data = await super.getTemplateFields();
        data.hitLocations = {
            "roll" : "IMPMAL.Roll",
            "head" : "IMPMAL.Head",
            "body" : "IMPMAL.Body",
            "leftArm" : "IMPMAL.LeftArm",
            "rightArm" : "IMPMAL.RightArm",
            "leftLeg" : "IMPMAL.LeftLeg",
            "rightLeg" : "IMPMAL.RightLeg",
        };
        data.showTraits = this.showTraits;
        return data;
    }

    get isAttack()
    {
        return !this.actor.defendingAgainst;
    }

    computeFields() 
    {
        super.computeFields();

        if (this.fields.hitLocation != "roll")
        {
            this.disCount++;
            this.tooltips.addDisadvantage(1, "Targeting Location");
        }

        if (this.fields.rapidFire)
        {
            this.advCount++;
            this.tooltips.addAdvantage(1, "Rapid Fire");
        }

        if (this.fields.burst)
        {
            this.fields.SL++;
            this.tooltips.addSL(1, "Burst");
        }

        if (this.traits.has("shoddy"))
        {
            this.fields.SL--;
            this.tooltips.addSL(-1, "Shoddy");
        }

        if (this.traits.has("defensive") && this.actor.defendingAgainst)
        {
            this.advCount++;
            this.tooltips.addAdvantage(1, "Defensive");
        }

        if (this.data.context.twf)
        {
            this.disCount++;
            this.tooltips.addDisadvantage(1, "Two Weapon Fighting");
        }
    }

    get showTraits() 
    {
        return {
            burst : this.traits.has("burst") || this.traits.has("rapidFire"),
            rapidFire : this.traits.has("rapidFire"),
            supercharge : this.traits.has("supercharge")
        };
    }

    get traits() 
    {
        return this.data.item.system.traits || this.data.item.system.attack.traits;
    }

    _defaultFields() 
    {
        let fields = super._defaultFields();
        fields.hitLocation = "roll";
        return fields;
    }

    _onInputChanged(ev)
    {
        // Can't have both burst and rapidFire active
        let multiplier = game.settings.get("impmal", "countEveryBullet") ? 5 : 1;
        if (ev.currentTarget.name == "burst")
        {
            if (this.data.item.type == "weapon" &&  multiplier > this.data.item.system.mag.current)
            {
                ev.currentTarget.checked = false;
                ui.notifications.warn(game.i18n.localize("IMPMAL.NotEnoughAmmo"));
            }
            delete this.fields.rapidFire;
        }
        else if (ev.currentTarget.name == "rapidFire")
        {
            if (this.data.item.type == "weapon" && (Number(this.traits.has("rapidFire").value) * multiplier) > this.data.item.system.mag.current)
            {
                ev.currentTarget.checked = false;
                ui.notifications.warn(game.i18n.localize("IMPMAL.NotEnoughAmmo"));
            }
            delete this.fields.burst;
        }
        super._onInputChanged(ev);
    }
}