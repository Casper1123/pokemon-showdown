import type { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: { [speciesid: string]: ModdedSpeciesData } = {
	// region: Gen1
	gengar: {
		inherit: true,
		abilities: { 0: "Cursed Body", H: "Levitate" },
	},
	slowbromega: {
		inherit: true,
		baseStats: { hp: 95, atk: 75, def: 180, spa: 100, spd: 110, spe: 30 },
	},
	pidgeotmega: {
		inherit: true,
		types: ["Electric", "Flying"],
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
	typhlosion: {
		inherit: true,
		abilities: { 0: "Blaze", 1: "Flash Fire", H: "Drought" },
	},
	typhlosionhisui: {
		inherit: true,
		abilities: { 0: "Blaze", 1: "Frisk", H: "Adaptability" },
	},
	celebi: {
		inherit: true,
		abilities: { 0: "Natural Cure", H: "Chronal Distortion" },
		baseStats: { hp: 120, atk: 50, def: 130, spa: 100, spd: 110, spe: 100 },
	},
	suicune: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Inner Focus", H: "Misty Surge" },
		baseStats: { hp: 100, atk: 75, def: 125, spa: 90, spd: 125, spe: 85 },
	},
	politoed: {
		inherit: true,
		baseStats: { hp: 90, atk: 75, def: 100, spa: 90, spd: 100, spe: 70 },
	},
	raikou: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Inner Focus", H: "Electric Surge" },
	},
	crobat: {
		inherit: true,
		baseStats: { hp: 85, atk: 100, def: 80, spa: 70, spd: 80, spe: 130 },
	},
	meganium: {
		inherit: true,
		abilities: { 0: "Overgrow", 1: "Leaf Guard", H: "Grassy Surge" },
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
		abilities: { 0: "Sturdy", 1: "Rock Head", H: "Sand Force" },
	},
	aggronmega: {
		inherit: true,
		baseStats: { hp: 80, atk: 140, def: 230, spa: 60, spd: 100, spe: 50 },
	},
	sceptile: {
		inherit: true,
		types: ["Grass", "Dragon"],
	},
	deoxysdefense: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Unaware", H: "Regenerator" },
		baseStats: { hp: 70, atk: 60, def: 160, spa: 60, spd: 160, spe: 90 },
	},
	deoxys: {
		inherit: true,
		abilities: { 0: "Pressure", H: "Mold Breaker" },
	},
	metagross: {
		inherit: true,
		abilities: { 0: "Clear Body", 1: "Light Metal", H: "Full Metal Body" },
	},
	cameruptmega: {
		inherit: true,
		baseStats: { hp: 70, atk: 80, def: 120, spa: 145, spd: 125, spe: 20 },
	},
	banettemega: {
		inherit: true,
		abilities: { 0: "Unseen Fist" },
		baseStats: { hp: 64, atk: 165, def: 85, spa: 83, spd: 93, spe: 65 },
	},
	gallade: {
		inherit: true,
		abilities: { 0: "Inner Focus", 1: "Sharpness", H: "Justified" },
	},
	gallademega: {
		inherit: true,
		abilities: { 0: "Sharpness" },
	},
	swampert: {
		inherit: true,
		abilities: { 0: "Torrent", 1: "Damp", H: "Regenerator" },
	},
	latiasmega: {
		inherit: true,
		types: ["Dragon", "Fairy"],
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
	glaceon: {
		inherit: true,
		abilities: { 0: "Snow Cloak", 1: "Snow Warning", H: "Ice Body" },
	},
	dialga: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Telepathy", H: "Chronal Distortion" },
	},
	dialgaorigin: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Telepathy", H: "Chronal Distortion" },
	},
	palkia: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Telepathy", H: "Spacial Distortion" },
	},
	palkiaorigin: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Telepathy", H: "Spatial Distortion" },
	},
	giratina: {
		inherit: true,
		abilities: { 0: "Pressure", 1: "Telepathy", H: "Absolute Distortion" },
	},
	giratinaorigin: {
		inherit: true,
		abilities: { 0: "Levitate", H: "Absolute Distortion" },
	},
	toxicroak: {
		inherit: true,
		baseStats: { hp: 83, atk: 111, def: 85, spa: 91, spd: 85, spe: 85 },
	},
	rotomfrost: {
		inherit: true,
		abilities: { 0: "Levitate", H: "Slush Rush" },
	},
	rotomfan: {
		inherit: true,
		abilities: { 0: "Air Lock" },
	},
	rotom: {
		inherit: true,
		baseStats: { hp: 50, atk: 50, def: 77, spa: 95, spd: 77, spe: 116 },
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
	swanna: {
		inherit: true,
		baseStats: { hp: 80, atk: 100, def: 70, spa: 87, spd: 63, spe: 98 },
		abilities: { 0: "Drizzle", 1: "Big Pecks", H: "Hydration" },
	},
	escavalier: {
		inherit: true,
		abilities: { 0: "Sand Force", 1: "Shell Armor", H: "Overcoat" },
	},
	samurott: {
		inherit: true,
		types: ["Water", "Fighting"],
		abilities: { 0: "Torrent", 1: "Inner Focus", H: "Shell Armor" },
		baseStats: { hp: 95, atk: 110, def: 85, spa: 118, spd: 70, spe: 70 },
	},
	reuniclus: {
		inherit: true,
		baseStats: { hp: 110, atk: 65, def: 85, spa: 125, spd: 95, spe: 30 },
	},
	krookodile: {
		inherit: true,
		abilities: { 0: "Intimidate", 1: "Moxie", H: "Sand Force" },
		baseStats: { hp: 95, atk: 130, def: 90, spa: 65, spd: 75, spe: 92 },
	},
	cofagrigus: {
		inherit: true,
		abilities: { 0: "Mummy", H: "Cursed Body" },
		baseStats: { hp: 58, atk: 50, def: 145, spa: 95, spd: 125, spe: 30 },
	},
	chandelure: {
		inherit: true,
		abilities: { 0: "Flash Fire", 1: "Flame Body", H: "Turboblaze" },
	},
	audinomega: {
		inherit: true,
		abilities: { 0: "Regenerator" },
	},
	beartic: {
		inherit: true,
		baseStats: { hp: 95, atk: 130, def: 80, spa: 70, spd: 80, spe: 70 },
	},
	beheeyem: {
		inherit: true,
		abilities: { 0: "Telepathy", 1: "Psychic Surge", H: "Analytic" },
		baseStats: { hp: 75, atk: 75, def: 95, spa: 125, spd: 95, spe: 40 },
	},
	musharna: {
		inherit: true,
		abilities: { 0: "Misty Surge", 1: "Synchronize", H: "Telepathy" },
	},
	darmanitan: {
		inherit: true,
		abilities: { 0: "Sheer Force", 1: "Gorilla Tactics", H: "Zen Mode" },
	},
	keldeo: {
		inherit: true,
		abilities: { 0: "Justified", 1: "Competitive" },
	},
	keldeoresolute: {
		inherit: true,
		abilities: { 0: "Justified", 1: "Competitive" },
	},
	scolipede: {
		inherit: true,
		abilities: { 0: "Poison Point", 1: "Apex Predator", H: "Speed Boost" },
	},
	basculegionf: {
		inherit: true,
		baseStats: { hp: 120, atk: 80, def: 65, spa: 112, spd: 75, spe: 78 },
	},
	klink: {
		inherit: true,
		abilities: { 0: "Plus", 1: "Levitate", H: "Clear Body" },
	},
	klang: {
		inherit: true,
		abilities: { 0: "Plus", 1: "Levitate", H: "Clear Body" },
	},
	klinklang: {
		inherit: true,
		abilities: { 0: "Plus", 1: "Levitate", H: "Clear Body" },
	},
	// endregion
	// region: Gen6
	noivern: {
		inherit: true,
		types: ["Dragon", "Normal"],
	},
	// endregion
	// region: Gen7
	golispod: {
		inherit: true,
		abilities: { 0: "Emergency Exit", H: "Battle Armor" },
	},
	nihilego: {
		inherit: true,
		abilities: { 0: "Beast Boost", H: "Levitate" },
	},
	necrozma: {
		inherit: true,
		types: ["Dark"],
	},
	xurkitree: {
		inherit: true,
		abilities: { 0: "Beast Boost", H: "Transistor" },
	},
	// endregion
	// region: Gen8
	copperajah: {
		inherit: true,
		abilities: { 0: "Sheer Force", 1: "Sand Force", H: "Heavy Metal" },
	},
	shiinotic: {
		inherit: true,
		abilities: { 0: "Effect Spore", 1: "Rain Dish", H: "Grassy Surge" },
	},
	wooloo: {
		inherit: true,
		abilities: { 0: "Fluffy", 1: "Bulletproof", H: "Frolicking" },
		baseStats: { hp: 60, atk: 70, def: 70, spa: 50, spd: 60, spe: 48 },
	},
	dubwool: {
		inherit: true,
		abilities: { 0: "Fluffy", 1: "Bulletproof", H: "Frolicking" },
		baseStats: { hp: 90, atk: 95, def: 100, spa: 60, spd: 90, spe: 88 },
	},
	// endregion
	// region: Gen9
	// endregion
};
