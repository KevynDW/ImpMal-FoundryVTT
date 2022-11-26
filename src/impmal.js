import { ImpMalActor } from "./document/actor";
import { ImpMalItem } from "./document/item";
import { AmmoModel } from "./model/item/ammo";
import { AugmeticModel } from "./model/item/augmetic";
import { BoonModel } from "./model/item/boon";
import { DutyModel } from "./model/item/duty";
import { EquipmentModel } from "./model/item/equipment";
import { FactionModel } from "./model/item/faction";
import { ModificationModel } from "./model/item/modification";
import { OriginModel } from "./model/item/origin";
import { PowerModel } from "./model/item/power";
import { ProtectionModel } from "./model/item/protection";
import { RoleModel } from "./model/item/role";
import { ShieldModel } from "./model/item/shield";
import { SkillSpecModel } from "./model/item/skill";
import { TalentModel } from "./model/item/talent";
import { WeaponModel } from "./model/item/weapon";

Hooks.once("init", () => 
{

    // #if _ENV == "development"
    CONFIG.debug.impmal = true;
    // #endif

    CONFIG.Actor.documentClass = ImpMalActor;
    CONFIG.Item.documentClass = ImpMalItem;
    CONFIG.ActiveEffect.documentClass = undefined;
    CONFIG.ActiveEffect.sheetClass = undefined;
    DocumentSheetConfig.registerSheet(JournalEntryPage, "impmal", Level4TextPageSheet, { makeDefault: true, label: "Imperium Maledictum Journal Sheet" });

    CONFIG.Actor.systemDataModels["character"] = CharacterActorDataModel;
    CONFIG.Actor.systemDataModels["patron"] = FollowerActorDataModel;
    CONFIG.Actor.systemDataModels["npc"] = StandardActorDataModel;

    CONFIG.Item.systemDataModels["boon"] = BoonModel;
    CONFIG.Item.systemDataModels["origin"] = OriginModel;
    CONFIG.Item.systemDataModels["faction"] = FactionModel;
    CONFIG.Item.systemDataModels["role"] = RoleModel;
    CONFIG.Item.systemDataModels["talent"] = TalentModel;
    CONFIG.Item.systemDataModels["duty"] = DutyModel;
    CONFIG.Item.systemDataModels["skill"] = SkillSpecModel;
    CONFIG.Item.systemDataModels["weapon"] = WeaponModel;
    CONFIG.Item.systemDataModels["ammo"] = AmmoModel;
    CONFIG.Item.systemDataModels["modification"] = ModificationModel;
    CONFIG.Item.systemDataModels["protection"] = ProtectionModel;
    CONFIG.Item.systemDataModels["shield"] = ShieldModel;
    CONFIG.Item.systemDataModels["equipment"] = EquipmentModel;
    CONFIG.Item.systemDataModels["augmetic"] = AugmeticModel;
    CONFIG.Item.systemDataModels["power"] = PowerModel;

    game.impmal = {

    };
});