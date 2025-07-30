import type { ModdedLearnsetDataTable, ModdedSpeciesData, ModdedSpeciesFormatsDataTable } from "../../sim/dex-species";
import type { ModdedMoveDataTable } from "../../sim/dex-moves";
import type { ModdedItemDataTable } from "../../sim/dex-items";
import type { ModdedAbilityDataTable } from "../../sim/dex-abilities";
import type { ModdedTypeDataTable } from "../../sim/dex-data";

export class ModPatch {
	parentMod: string | null = null;
	pokedex: { [speciesid: string]: ModdedSpeciesData } = {};
	abilities: ModdedAbilityDataTable = {};
	moves: ModdedMoveDataTable = {};
	items: ModdedItemDataTable = {};
	typechart: ModdedTypeDataTable = {};
	learnsets: ModdedLearnsetDataTable = {};
	formatsData: ModdedSpeciesFormatsDataTable = {};
}
