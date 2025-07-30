import { Dex } from '../../../sim/dex';

export const Scripts: ModdedBattleScriptsData = {
	inherit: 'gen9',
	gen: 9,
	/**
	 * On initialization does stuff with the passed dex like altering the learnset of pokémon
	 * @param dex the dex to mutate. By default uses the dex of the current mod.
	 */
	init(dex = Dex.mod('gen9custom')) {
		// Movepool changes!
		// Very shoddy script for adding Hidden Power to mons that don't get it (gen8, gen9)
		// Add Hidden Power to all Pokémon introduced after gen7, because the move was dexited in gen8. Might be risky with Regieleki :/
		for (const species of dex.species.all()) {
			if (species.gen >= 8) {
				const id = species.id;
				if (!this.data.Learnsets[id]) {
					continue;
				} else if (!this.data.Learnsets[id].learnset) {
					this.data.Learnsets[id].learnset = {};
				}
				if (this.data.Learnsets[id].learnset.hiddenpower) continue; // Do not alter if it's already there. It shouldn't be, but you know it might just be.
				this.data.Learnsets[id].learnset.hiddenpower = ["9L1"];
			}
		}

		// Overwrites older entries but that shouldn't matter much anyways.
		this.modData("Learnsets", "ampharos").learnset.dracometeor = ["9L1"];
	},
};
