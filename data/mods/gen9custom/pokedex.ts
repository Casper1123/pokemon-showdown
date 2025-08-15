import type { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: { [speciesid: string]: ModdedSpeciesData } = {
	// region: Gen1
	gengar: {
		inherit: true,
		abilities: { 0: "Cursed Body", H: "Levitate" },
	},
	// endregion
	// region: Gen2
	ampharos: {
		inherit: true,
		types: ["Electric", "Dragon"],
		abilities: { 0: "Static", H: "Teravolt" },
	},
	// endregion
	// region: Gen3
	absolmega: {
		inherit: true,
		types: ["Dark", "Fairy"],
	},
	// endregion
	// region: Gen4
	garchompmega: {
		inherit: true,
		baseStats: { hp: 108, atk: 170, def: 115, spa: 110, spd: 95, spe: 102 },
	},
	hippowdon: {
		inherit: true,
		baseStats: { hp: 113, atk: 112, def: 123, spa: 68, spd: 87, spe: 47 },
		abilities: { 0: "Sand Stream", H: "Intimidate" },
	},
	// endregion
	// region: Gen5
	conkeldurr: {
		inherit: true,
		baseStats: { hp: 115, atk: 160, def: 95, spa: 55, spd: 65, spe: 45 },
	},
	haxorus: {
		inherit: true,
		baseStats: { hp: 78, atk: 147, def: 90, spa: 60, spd: 90, spe: 100 },
		abilities: { 0: "Regenerator", 1: "Mold Breaker", H: "Tough Claws" },
	},
	// endregion
	// region: Gen6
	// endregion
	// region: Gen7
	// endregion
	// region: Gen8
	// endregion
	// region: Gen9
	// endregion
};
