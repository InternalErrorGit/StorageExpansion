import {DependencyContainer} from "tsyringe";
import {IPostDBLoadMod} from "@spt-aki/models/external/IPostDBLoadMod";
import {IPostAkiLoadMod} from "@spt-aki/models/external/IPostAkiLoadMod";
import {CustomItemService} from "@spt-aki/services/mod/CustomItemService";
import {NewItemFromCloneDetails} from "@spt-aki/models/spt/mod/NewItemDetails";
import {DatabaseServer} from "@spt-aki/servers/DatabaseServer";
import {ItemHelper} from "@spt-aki/helpers/ItemHelper";

import food_case from "./data/food_case.json";
import drinks_case from "./data/drinks_case.json";
import sugar_case from "./data/sugar_case.json";
import explosive_grenades_case from "./data/explosive_grenades_case.json";
import smoke_grenades_case from "./data/smoke_grenades_case.json";
import stun_grenades_case from "./data/stun_grenades_case.json";
import item_container_ammo_Caliber1143x23ACP from "./data/item_container_ammo_Caliber1143x23ACP.json"
import item_container_ammo_Caliber127x55 from "./data/item_container_ammo_Caliber127x55.json"
import item_container_ammo_Caliber12g from "./data/item_container_ammo_Caliber12g.json"
import item_container_ammo_Caliber20g from "./data/item_container_ammo_Caliber20g.json"
import item_container_ammo_Caliber23x75 from "./data/item_container_ammo_Caliber23x75.json"
import item_container_ammo_Caliber366TKM from "./data/item_container_ammo_Caliber366TKM.json"
import item_container_ammo_Caliber46x30 from "./data/item_container_ammo_Caliber46x30.json"
import item_container_ammo_Caliber545x39 from "./data/item_container_ammo_Caliber545x39.json"
import item_container_ammo_Caliber556x45NATO from "./data/item_container_ammo_Caliber556x45NATO.json"
import item_container_ammo_Caliber57x28 from "./data/item_container_ammo_Caliber57x28.json"
import item_container_ammo_Caliber762x25TT from "./data/item_container_ammo_Caliber762x25TT.json"
import item_container_ammo_Caliber762x35 from "./data/item_container_ammo_Caliber762x35.json"
import item_container_ammo_Caliber762x39 from "./data/item_container_ammo_Caliber762x39.json"
import item_container_ammo_Caliber762x51 from "./data/item_container_ammo_Caliber762x51.json"
import item_container_ammo_Caliber762x54R from "./data/item_container_ammo_Caliber762x54R.json"
import item_container_ammo_Caliber86x70 from "./data/item_container_ammo_Caliber86x70.json"
import item_container_ammo_Caliber9x18PM from "./data/item_container_ammo_Caliber9x18PM.json"
import item_container_ammo_Caliber9x19PARA from "./data/item_container_ammo_Caliber9x19PARA.json"
import item_container_ammo_Caliber9x21 from "./data/item_container_ammo_Caliber9x21.json"
import item_container_ammo_Caliber9x33R from "./data/item_container_ammo_Caliber9x33R.json"
import item_container_ammo_Caliber9x39 from "./data/item_container_ammo_Caliber9x39.json"
import knife_case from "./data/knife_case.json"

import config from "../config.json"
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";

class Mod implements IPostDBLoadMod, IPostAkiLoadMod
{
    private customItemService: CustomItemService;
    private databaseService: DatabaseServer;
    private itemHelper: ItemHelper;
    private logger: ILogger;

    private cases: NewItemFromCloneDetails[] = [
        food_case,
        drinks_case,
        sugar_case,
        explosive_grenades_case,
        smoke_grenades_case,
        stun_grenades_case,
        item_container_ammo_Caliber1143x23ACP,
        item_container_ammo_Caliber127x55,
        item_container_ammo_Caliber12g,
        item_container_ammo_Caliber20g,
        item_container_ammo_Caliber23x75,
        item_container_ammo_Caliber366TKM,
        item_container_ammo_Caliber46x30,
        item_container_ammo_Caliber545x39,
        item_container_ammo_Caliber556x45NATO,
        item_container_ammo_Caliber57x28,
        item_container_ammo_Caliber762x25TT,
        item_container_ammo_Caliber762x35,
        item_container_ammo_Caliber762x39,
        item_container_ammo_Caliber762x51,
        item_container_ammo_Caliber762x54R,
        item_container_ammo_Caliber86x70,
        item_container_ammo_Caliber9x18PM,
        item_container_ammo_Caliber9x19PARA,
        item_container_ammo_Caliber9x21,
        item_container_ammo_Caliber9x33R,
        item_container_ammo_Caliber9x39,
        knife_case
    ]

    private resolve(container: DependencyContainer): void
    {
        this.customItemService = container.resolve<CustomItemService>("CustomItemService")
        this.databaseService = container.resolve<DatabaseServer>("DatabaseServer")
        this.itemHelper = container.resolve<ItemHelper>("ItemHelper")
        this.logger = container.resolve<ILogger>("WinstonLogger")
    }

    postAkiLoad(container: DependencyContainer): void
    {
        this.resolve(container);
    }

    postDBLoad(container: DependencyContainer): void
    {
        this.resolve(container);
        this.logger.info("StorageExpansion::postDBLoad >> Start")

        for (const itemId in this.databaseService.getTables().templates.items)
        {
            const item = this.databaseService.getTables().templates.items[itemId]
        }

        this.cases.forEach(obj =>
        {
            if (config.enable[obj.newId])
            {
                this.logger.success("Enabled item: " + obj.locales["en"].name)
                this.customItemService.createItemFromClone(obj)
            } else
            {
                this.logger.warning("Disabled item: " + obj.locales["en"].name)
            }
        })

        this.logger.info("StorageExpansion::postDBLoad << End")
    }

    private createCase(): NewItemFromCloneDetails
    {
        return {
            "fleaPriceRoubles": 65000,
            "handbookParentId": "5b5f6fa186f77409407a7eb7",
            "handbookPriceRoubles": 65000,
            "itemTplToClone": "59fb042886f7746c5005a7b2",
            "locales": {
                "en": {
                    "name": "Knife Case",
                    "shortName": "Knifes",
                    "description": "A storage case for various knifes."
                }
            },
            "newId": "knife_case",
            "overrideProperties": {
                "Grids": [
                    {
                        "_id": "knife_case_grid_1",
                        "_name": "knife_case_grid_1",
                        "_parent": "59fb042886f7746c5005a7b2",
                        "_proto": "55d329c24bdc2d892f8b4567",
                        "_props": {
                            "filters": [
                                {
                                    "Filter": [
                                        "54491bb74bdc2d09088b4567",
                                        "57cd379a24597778e7682ecf",
                                        "57e26ea924597715ca604a09",
                                        "57e26fc7245977162a14b800",
                                        "5bc9c1e2d4351e00367fbcf0",
                                        "5bead2e00db834001c062938",
                                        "5bffdc370db834001d23eca8",
                                        "5bffdd7e0db834001b734a1a",
                                        "5bffe7930db834001b734a39",
                                        "5c010e350db83400232feec7",
                                        "5c0126f40db834002a125382",
                                        "5c012ffc0db834001d23f03f",
                                        "5c07df7f0db834001b73588a",
                                        "5fc64ea372b0dd78d51159dc",
                                        "601948682627df266209af05",
                                        "6087e570b998180e9f76dc24",
                                        "63495c500c297e20065a08b1",
                                        "63920105a83e15700a00f168"
                                    ],
                                    "ExcludedFilter": []
                                }
                            ],
                            "cellsH": 8,
                            "cellsV": 8,
                            "minCount": 0,
                            "maxCount": 0,
                            "maxWeight": 0,
                            "isSortingTable": false
                        }
                    }
                ]
            },
            "parentId": "5795f317245977243854e041"
        }
    }


}

module.exports = {mod: new Mod()}