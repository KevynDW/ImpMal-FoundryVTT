let weapons = this.actor.itemTypes.weapon.filter(i => i.system.isMelee && i.system.equipped.value && i.system.traits.has("twohanded"))
weapons.forEach(w => w.system.traits.add("rend", {modify: true}));