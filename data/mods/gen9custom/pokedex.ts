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
		baseStats: { hp: 100, atk: 75, def: 85, spa: 115, spd: 90, spe: 55 },
	},
	ampharosmega: {
		inherit: true,
		abilities: { 0: "Teravolt" },
		baseStats: { hp: 100, atk: 75, def: 110, spa: 165, spd: 115, spe: 45 },
	},
	jumpluff: {
		inherit: true,
		abilities: { 0: "Chlorophyll", 1: "Huge Power", H: "Infiltrator" },
	},
	// endregion
	// region: Gen3
	absolmega: {
		inherit: true,
		types: ["Dark", "Fairy"],
	},
	breloom: {
		inherit: true,
		baseStats: { hp: 80, atk: 130, def: 90, spa: 60, spd: 70, spe: 70 },
	},
	aggron: {
		inherit: true,
		baseStats: { hp: 80, atk: 110, def: 180, spa: 60, spd: 80, spe: 50 },
	},
	aggronmega: {
		inherit: true,
		baseStats: { hp: 80, atk: 140, def: 230, spa: 40, spd: 80, spe: 50 },
	},
	sceptile: {
		inherit: true,
		types: ["Grass", "Dragon"],
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
	flygon: {
		inherit: true,
		baseStats: { hp: 80, atk: 100, def: 80, spa: 110, spd: 80, spe: 100 },
	},
	empoleon: {
		inherit: true,
		baseStats: { hp: 90, atk: 90, def: 95, spa: 111, spd: 101, spe: 60 },
		abilities: { 0: "Torrent", 1: "Slush Rush", H: "Competitive" },
	},
	shaymin: {
		inherit: true,
		types: ["Grass", "Fairy"],
		baseStats: { hp: 100, atk: 70, def: 110, spa: 110, spd: 110, spe: 100 },
		abilities: { 0: "Natural Cure", 1: "Overgrow", H: "Regenerator" },
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
	durant: {
		inherit: true,
		abilities: { 0: "Defiant", 1: "Hustle", H: "Truant" },
	},
	gigalith: {
		inherit: true,
		baseStats: { hp: 85, atk: 135, def: 130, spa: 60, spd: 100, spe: 25 },
	},
	cobalion: {
		inherit: true,
		abilities: { 0: "Justified", 1: "Competitive" },
		baseStats: { hp: 91, atk: 90, def: 129, spa: 110, spd: 72, spe: 108 },
	},
	virizion: {
		inherit: true,
		abilities: { 0: "Justified", 1: "Competitive" },
		baseStats: { hp: 91, atk: 90, def: 72, spa: 110, spd: 129, spe: 108 },
	},
	zoroark: {
		inherit: true,
		baseStats: { hp: 60, atk: 105, def: 60, spa: 125, spd: 60, spe: 110 },
	},
	zoroarkhisui: {
		inherit: true,
		baseStats: { hp: 60, atk: 105, def: 60, spa: 125, spd: 60, spe: 110 },
	},
	// endregion
	// region: Gen6
	// endregion
	// region: Gen7
	golispod: {
		inherit: true,
		abilities: { 0: "Emergency Exit", H: "Battle Armor" },
	},
	// endregion
	// region: Gen8
	// endregion
	// region: Gen9
	// endregion
};
