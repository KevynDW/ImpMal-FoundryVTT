import "../style/impmal.scss";
import { ImpMalActor } from "./document/actor";
import { ImpMalItem } from "./document/item";
import { CharacterModel } from "./model/actor/character";
import { NPCModel } from "./model/actor/npc";
import { PatronModel } from "./model/actor/patron";
import { AmmoModel } from "./model/item/ammo";
import { AugmeticModel } from "./model/item/augmetic";
import { BoonLiabilityModel } from "./model/item/boonLiability";
import { DutyModel } from "./model/item/duty";
import { EquipmentModel } from "./model/item/equipment";
import { FactionModel } from "./model/item/faction";
import { ModificationModel } from "./model/item/modification";
import { OriginModel } from "./model/item/origin";
import { PowerModel } from "./model/item/power";
import { ProtectionModel } from "./model/item/protection";
import { RoleModel } from "./model/item/role";
import { ForceFieldModel } from "./model/item/forceField";
import { SpecialisationModel } from "./model/item/specialisation";
import { TalentModel } from "./model/item/talent";
import { WeaponModel } from "./model/item/weapon";
import {IMPMAL, IM_CONFIG} from "./system/config";
import registerHandlebars from "./system/handlebars";
import registerSettings from "./system/settings";
import ImpMalCharacterSheet from "./sheet/actors/character-sheet";
import ImpMalItemSheet from "./sheet/items/item-sheet";
import ProtectionItemSheet from "./sheet/items/item-protection-sheet";
import registerHooks from "./system/hooks";
import { CharacteristicTest } from "./system/tests/characteristic/characteristic-test";
import { SkillTest } from "./system/tests/skill/skill-test";
import { WeaponTest } from "./system/tests/weapon/weapon-test";
import { PowerTest } from "./system/tests/power/power-test";
import { TraitTest } from "./system/tests/trait/trait-test";
import SuperiorityManager from "./system/superiority";
import { ImpMalEffect } from "./document/effect";
import ImpMalPatronSheet from "./sheet/actors/patron-sheet";
import ImpMalNPCSheet from "./sheet/actors/npc-sheet";
import { CorruptionModel } from "./model/item/corruption";
import { InjuryModel } from "./model/item/injury";
import { CriticalModel } from "./model/item/critical";
import { TraitModel } from "./model/item/trait";
import TraitItemSheet from "./sheet/items/item-trait-sheet";
import WeaponItemSheet from "./sheet/items/item-weapon-sheet";
import ModificationItemSheet from "./sheet/items/item-modification-sheet";
import ImpMalUtility from "./system/utility";
import { ChoiceConfig } from "./apps/choice-config";
import OriginItemSheet from "./sheet/items/item-origin-sheet";
import RoleItemSheet from "./sheet/items/item-role-sheet";
import FoundryOverrides from "./system/overrides";
import AmmoItemSheet from "./sheet/items/item-ammo-sheet";
import FactionItemSheet from "./sheet/items/item-faction-sheet";
import DutyItemSheet from "./sheet/items/item-duty-sheet";
import debug from "./system/debug";
import ImpmalActiveEffectConfig from "./apps/effect-config";
import { VehicleModel } from "./model/actor/vehicle";
import ImpMalVehicleSheet from "./sheet/actors/vehicle-sheet";
import TagManager from "./system/tag-manager";
import { ItemUse } from "./system/tests/item/item-use";
import { ImpMalChatMessage } from "./system/chat-message";
import TalentItemSheet from "./sheet/items/item-talent-sheet";
import { AvailabilityTest } from "./system/tests/availability/availability-test";
import ImpMalTables from "./system/tables";
import loadScripts from "../loadScripts.js";
import tokenHelpers from "./system/token-helpers.js";
import { ImpMalActiveEffectModel } from "./model/effect/effect.js";
import Migration from "./system/migration.js";
import { ImpMalMessageModel } from "./model/message.js";
import ZoneConfig from "./apps/zone-config.js";

Hooks.once("init", () => 
{

    // #if _ENV == "development"
    CONFIG.debug.impmal = true;
    debug();
    // #endif
    
    CONFIG.Actor.documentClass = ImpMalActor;
    CONFIG.Item.documentClass = ImpMalItem;
    CONFIG.ActiveEffect.documentClass = ImpMalEffect;
    CONFIG.ActiveEffect.legacyTransferral = false;
    CONFIG.ChatMessage.documentClass = ImpMalChatMessage;

    Actors.registerSheet("impmal", ImpMalCharacterSheet, { types: ["character"], makeDefault: true });
    Actors.registerSheet("impmal", ImpMalPatronSheet, { types: ["patron"], makeDefault: true });
    Actors.registerSheet("impmal", ImpMalNPCSheet, { types: ["npc"], makeDefault: true });
    Actors.registerSheet("impmal", ImpMalVehicleSheet, { types: ["vehicle"], makeDefault: true });
    Items.registerSheet("impmal", ImpMalItemSheet, { makeDefault: true });
    Items.registerSheet("impmal", ProtectionItemSheet, { types: ["protection"], makeDefault: true });
    Items.registerSheet("impmal", TraitItemSheet, { types: ["trait"], makeDefault: true });
    Items.registerSheet("impmal", TalentItemSheet, { types: ["talent"], makeDefault: true });
    Items.registerSheet("impmal", WeaponItemSheet, { types: ["weapon"], makeDefault: true });
    Items.registerSheet("impmal", ModificationItemSheet, { types: ["modification"], makeDefault: true });
    Items.registerSheet("impmal", DutyItemSheet, { types: ["duty"], makeDefault: true });
    Items.registerSheet("impmal", FactionItemSheet, { types: ["faction",], makeDefault: true });
    Items.registerSheet("impmal", OriginItemSheet, { types: ["origin"], makeDefault: true });
    Items.registerSheet("impmal", RoleItemSheet, { types: ["role"], makeDefault: true });
    Items.registerSheet("impmal", AmmoItemSheet, { types: ["ammo"], makeDefault: true });
    DocumentSheetConfig.registerSheet(ActiveEffect, "impmal", ImpmalActiveEffectConfig, {makeDefault : true});

    // CONFIG.ActiveEffect.sheetClass = undefined;
    // DocumentSheetConfig.registerSheet(JournalEntryPage, "impmal", Level4TextPageSheet, { makeDefault: true, label: "Imperium Maledictum Journal Sheet" });

    CONFIG.Actor.dataModels["character"] = CharacterModel;
    CONFIG.Actor.dataModels["patron"] = PatronModel;
    CONFIG.Actor.dataModels["npc"] = NPCModel;
    CONFIG.Actor.dataModels["vehicle"] = VehicleModel;

    CONFIG.Item.dataModels["boonLiability"] = BoonLiabilityModel;
    CONFIG.Item.dataModels["origin"] = OriginModel;
    CONFIG.Item.dataModels["faction"] = FactionModel;
    CONFIG.Item.dataModels["role"] = RoleModel;
    CONFIG.Item.dataModels["talent"] = TalentModel;
    CONFIG.Item.dataModels["duty"] = DutyModel;
    CONFIG.Item.dataModels["specialisation"] = SpecialisationModel;
    CONFIG.Item.dataModels["weapon"] = WeaponModel;
    CONFIG.Item.dataModels["ammo"] = AmmoModel;
    CONFIG.Item.dataModels["modification"] = ModificationModel;
    CONFIG.Item.dataModels["protection"] = ProtectionModel;
    CONFIG.Item.dataModels["forceField"] = ForceFieldModel;
    CONFIG.Item.dataModels["equipment"] = EquipmentModel;
    CONFIG.Item.dataModels["augmetic"] = AugmeticModel;
    CONFIG.Item.dataModels["power"] = PowerModel;
    CONFIG.Item.dataModels["corruption"] = CorruptionModel;
    CONFIG.Item.dataModels["injury"] = InjuryModel;
    CONFIG.Item.dataModels["critical"] = CriticalModel;
    CONFIG.Item.dataModels["trait"] = TraitModel;

    CONFIG.ActiveEffect.dataModels["base"] = ImpMalActiveEffectModel
    CONFIG.ChatMessage.dataModels["test"] = ImpMalMessageModel;

    game.impmal = {
        config : IMPMAL,
        utility : ImpMalUtility,
        tags : new TagManager(),
        tables : ImpMalTables,
        migration : Migration,
        testClasses : {
            CharacteristicTest,
            SkillTest,
            WeaponTest,
            PowerTest,
            TraitTest,
            ItemUse,
            AvailabilityTest
        },
        apps : {
            ChoiceConfig,
        }
    };

    registerSettings();
    game.impmal.superiority = new SuperiorityManager();
    registerHandlebars();
    
    mergeObject(CONFIG, IM_CONFIG);

});

FoundryOverrides();
registerHooks();
loadScripts();
tokenHelpers()
ZoneConfig.addRegionControls();