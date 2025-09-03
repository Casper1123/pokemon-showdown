import type { ModdedTypeDataTable } from "../../../sim/dex-data";

export const TypeChart: ModdedTypeDataTable = {
	fairy: {
		inherit: true,
		damageTaken: {
			Bug: 0, // Neutrality
			Dark: 2,
			Dragon: 3,
			Electric: 0,
			Fairy: 0,
			Fighting: 2,
			Fire: 0,
			Flying: 0,
			Ghost: 0,
			Grass: 0,
			Ground: 0,
			Ice: 0,
			Normal: 0,
			Poison: 1,
			Psychic: 0,
			Rock: 0,
			Steel: 1,
			Stellar: 0,
			Water: 0,
		},
	},
};

// 1 = super effective
// 0 = neutral
// 2 = not effective
// 3 = immune
