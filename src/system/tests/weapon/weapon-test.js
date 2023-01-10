import { SkillTest } from "../skill/skill-test";
import { TargetCalculator } from "../target-calculator";
import { WeaponTestContext } from "./weapon-context";
import { WeaponTestEvaluator } from "./weapon-evaluator";

export class WeaponTest extends SkillTest
{

    static contextClass = WeaponTestContext;
    static evaluatorClass = WeaponTestEvaluator;
    testDetailsTemplate = "systems/impmal/templates/chat/rolls/details/weapon-test.hbs";

    computeTarget() 
    {
        return TargetCalculator.compute({
            actor : this.actor, 
            type : "weapon", 
            data : this.context.weapon, 
            modifier : this.data.modifier, 
            difficulty : this.data.difficulty
        });
    }

    async postRoll()
    {
        await super.postRoll();
        
        try 
        {
            let ammo = this.item.system.ammo.document;
            if (this.item.system.attackType == "ranged" && ammo && !this.context.ammoUsed)
            {
                this.item.update(this.item.system.useAmmo());
                ammo.update(ammo.system.decrease());
                this.context.ammoUsed = true;
            }
        }
        catch(e)
        {
            ui.notifications.error(`${game.i18n.localize("IMPMAL.ErrorAmmoUse")}: ${e}`);
        }
    }

    get item() 
    {
        return this.context.weapon;
    }


    static _getDialogTestData(data)
    {
        let testData = super._getDialogTestData(data);
        testData.hitLocation = data.hitLocation;
        return testData;
    }


    _defaultData() 
    {
        let data = super._defaultData();
        data.hitLocation = "roll";
        return data;
    }
}