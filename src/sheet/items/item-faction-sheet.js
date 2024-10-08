import BackgroundItemSheet from "./item-background-sheet";


export default class FactionItemSheet extends BackgroundItemSheet
{
    _onDropItemDuty(ev, item)
    {
        this.item.update(this.item.system[item.system.category].duty.add(item));
    }

    async getData() 
    {
        let data = await super.getData();
        return data;
    }

    _onListEdit(ev)
    {
        ev.stopPropagation();
        let id = this._getId(ev);
        let item = this.item.system.talents.documents.find(i => i.id == id);
        item.sheet?.render(true, {editable : false});
    }

    _onListDelete(ev)
    {
        ev.stopPropagation();
        let id = this._getId(ev);
        if (id)
        {
            this.item.update({"system.talents.list" : this.item.system.talents.removeId(id)});
        }
    }
}