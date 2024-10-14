import BackgroundItemSheet from "./item-background-sheet";


export default class OriginItemSheet extends BackgroundItemSheet
{
    async getData()
    {
        let data = await super.getData();
        await data.item.system.equipment.awaitDocuments();
        return data;
    }


    _onDropItem(ev, item)
    {
        return this.item.update({"system.equipment.list" : this.item.system.equipment.add({id : item.id})});
    }

    _onDropTable(ev, table)
    {
        this.item.update({"system.factionTable" : this.item.system.factionTable.set(table)});
    }

    async _onListEdit(ev)
    {
        let id = this._getId(ev);
        let collection = this._getCollection(ev);
        if (collection == "effects")
        {
            return super._onListEdit(ev);
        }
        let item = (await Promise.all(this.item.system.equipment.documents)).find(i => i.id == id);
        item.sheet?.render(true, {editable : false});
    }

    _onListDelete(ev)
    {
        let id = this._getId(ev);
        let collection = this._getCollection(ev);
        if (collection == "effects")
        {
            return super._onListDelete(ev);
        }
        if (id)
        {
            this.item.update({"system.equipment.list" : this.item.system.equipment.removeId(id)});
        }
    }
}