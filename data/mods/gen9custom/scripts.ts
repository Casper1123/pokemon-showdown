import { Dex } from '../../../sim/dex';
import type { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { setMove } from "../../../utilities/mod_alter";

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	init(modPatch: ModPatch | undefined = undefined) {
		// Movepool changes!
		// Very shoddy script for adding Hidden Power to mons that don't get it (gen8, gen9)
		// Add Hidden Power to all Pokémon introduced after gen7, because the move was dexited in gen8. Might be risky with Regieleki :/
		const dex = Dex.mod('gen9custom');
		for (const species of dex.species.all()) {
			if (species.gen >= 8) {
				const id = species.id;
				if (!this.data.Learnsets[id]) {
					continue;
				} else if (!this.data.Learnsets[id].learnset) {
					this.data.Learnsets[id].learnset = {};
				} else if (this.data.Learnsets[id].learnset.hiddenpower) continue; // Do not alter if it's already there. It shouldn't be, but you know it might just be.

				setMove(this, modPatch, id, "hiddenpower");
			}
		}

		// Overwrites older entries but that shouldn't matter much anyways.
		this.modData("Learnsets", "ampharos").learnset.dracometeor = ["9L1"];
		setMove(this, modPatch, "ampharos", "dracometeor");
	},
};
