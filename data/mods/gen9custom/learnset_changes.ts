import type { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { Dex } from '../../../sim/dex';
import { setMove } from "../../../utilities/mod_alter";

/**
 * A function to apply movepool changes. Works like the script in 'mods/vaporemons'
 * just outside of the scripts.ts file to allow us to easily inject a patch object to track changes applied to the mod.
 * @param data
 * @param modPatch
 */
export function applyChanges(data: ModdedDex, modPatch: ModPatch | undefined = undefined): void {
	// Very shoddy script for adding Hidden Power to mons that don't get it (gen8, gen9)
	// Add Hidden Power to all Pokémon introduced after gen7, because the move was dexited in gen8. Might be risky with Regieleki :/
	const dex = Dex.mod('gen9custom');
	for (const species of dex.species.all()) {
		if (species.gen >= 8) {
			const id = species.id;
			if (!data.data.Learnsets[id]) {
				continue;
			} else if (!data.data.Learnsets[id].learnset) {
				data.data.Learnsets[id].learnset = {};
			} // else if (data.data.Learnsets[id].learnset.hiddenpower) continue; // Do not alter if it's already there. It shouldn't be, but you know it might just be.
			setMove(data, modPatch, id, "hiddenpower");
		}
	}

	// Overwrites older entries but that shouldn't matter much anyways.
	setMove(data, modPatch, "ampharos", "dracometeor");
}
