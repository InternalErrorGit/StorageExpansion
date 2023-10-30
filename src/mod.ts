import {DependencyContainer} from "tsyringe";
import {IPostDBLoadMod} from "@spt-aki/models/external/IPostDBLoadMod";
import {IPostAkiLoadMod} from "@spt-aki/models/external/IPostAkiLoadMod";
import {CustomItemService} from "@spt-aki/services/mod/CustomItemService";
import {NewItemFromCloneDetails} from "@spt-aki/models/spt/mod/NewItemDetails";
import {DatabaseServer} from "@spt-aki/servers/DatabaseServer";
import {Grid} from "@spt-aki/models/eft/common/tables/ITemplateItem";
import {ItemHelper} from "@spt-aki/helpers/ItemHelper";

class Mod implements IPostDBLoadMod, IPostAkiLoadMod
{
    private customItemService: CustomItemService;
    private databaseService: DatabaseServer;
    private itemHelper: ItemHelper;

    private resolve(container: DependencyContainer): void
    {
        this.customItemService = container.resolve<CustomItemService>("CustomItemService")
        this.databaseService = container.resolve<DatabaseServer>("DatabaseServer")
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper")
    }

    postAkiLoad(container: DependencyContainer): void
    {
        this.resolve(container);
    }

    postDBLoad(container: DependencyContainer): void
    {
        this.resolve(container);
        for (const ammoBox of this.createAmmoBoxes())
        {
            this.customItemService.createItemFromClone(ammoBox)
        }

    }

    private createAmmoBoxes(): NewItemFromCloneDetails[]
    {
        const calibers = {
            "Caliber1143x23ACP": ".45 ACP",
            "Caliber127x55": "12.7x55mm",
            "Caliber12g": "12/70",
            "Caliber20g": "20/70",
            "Caliber23x75": "23x75mm",
            "Caliber366TKM": ".366 TKM",
            "Caliber46x30": "4.6x30mm",
            "Caliber545x39": "5.45x39mm",
            "Caliber556x45NATO": "5.56x45mm",
            "Caliber57x28": "5.7x28mm",
            "Caliber762x25TT": "7.62x25mm",
            "Caliber762x35": ".300 Blackout",
            "Caliber762x39": "7.62x39mm",
            "Caliber762x51": "7.62x51mm",
            "Caliber762x54R": "7.62x54mm",
            "Caliber86x70": ".338 Lapua Magnum",
            "Caliber9x18PM": " 9x18mm",
            "Caliber9x19PARA": "9x19mm",
            "Caliber9x21": "9x21mm",
            "Caliber9x33R": ".357 Magnum",
            "Caliber9x39": "9x39mm"
        };

        const objects: NewItemFromCloneDetails[] = [];

        for (const caliber in calibers)
        {
            const newItemFromCloneDetails = this.createAmmoBox(caliber, calibers[caliber]);
            objects.push(newItemFromCloneDetails)
        }

        return objects;
    }

    private createAmmoBox(caliber: string, name: string): NewItemFromCloneDetails
    {
        const filters: string[] = [];
        for (const itemId in this.databaseService.getTables().templates.items)
        {
            const item = this.databaseService.getTables().templates.items[itemId];
            if (item._parent == "5485a8684bdc2da71d8b4567" && item._props.Caliber == caliber)
            {
                filters.push(itemId)
            }
        }

        const grids: Grid[] = [];

        for (let i = 0; i < filters.length; i++)
        {
            const filter: string = filters[i];

            grids.push({
                _id: "item_container_ammo_" + caliber + "_" + i,
                _name: "item_container_ammo_" + caliber + "_" + i,
                _parent: "5aafbde786f774389d0cbc0f",
                _proto: "55d329c24bdc2d892f8b4567",
                _props: {
                    cellsH: 1,
                    cellsV: 10,
                    isSortingTable: false,
                    maxCount: 0,
                    minCount: 0,
                    maxWeight: 0,
                    filters: [
                        {
                            ExcludedFilter: [],
                            Filter: [
                                filter
                            ]
                        }
                    ]
                }
            })
        }

        return {
            fleaPriceRoubles: 45000,
            handbookParentId: "5b5f6fa186f77409407a7eb7",
            handbookPriceRoubles: 45000,
            itemTplToClone: "5aafbde786f774389d0cbc0f",
            locales: {
                "en": {
                    name: name + " Ammunition case",
                    description: "The Kiba Arms International ammunition storage case.",
                    shortName: name + " Ammo"
                }
            },
            newId: "item_container_ammo_" + caliber,
            overrideProperties: {
                Grids: grids
            },
            parentId: "5795f317245977243854e041"
        }
    }

}

module.exports = {mod: new Mod()}