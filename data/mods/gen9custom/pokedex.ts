import type { ModdedSpeciesData } from "../../../sim/dex-species";

export const Pokedex: { [speciesid: string]: ModdedSpeciesData } = {
	ampharos: {
		inherit: true,
		types: ["Dragon", "Electric"],
		abilities: { 0: "Static", H: "Teravolt" },
	},
};
