return args.data.skill != "stealth" || args.skillItem?.name != "Hide" || (this.actor.itemTypes.protection.filter(i => i.system.isEquipped).length != 0)