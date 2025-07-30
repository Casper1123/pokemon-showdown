import path from 'path';
import fs from 'fs';
import type { ModdedSpeciesData } from "../../sim/dex-species";

export class ModPatch {
	parentMod: string | null = null;
	pokedex: { [speciesid: string]: ModdedSpeciesData } = {};
	abilities = new Map<string, any>();
	moves = new Map<string, any>();
	items = new Map<string, any>();
	typechart = new Map<string, any>();
	learnsets = new Map<string, any>();
	formatsData = new Map<string, any>();

	static fromMod(modName: string): ModPatch {
		const modPath = path.resolve(__dirname, '../../../data/mods', modName);
		console.log(modPath);
		function tryImport(file: string) {
			const fullPath = path.join(modPath, file);
			if (fs.existsSync(fullPath)) {
				return require(fullPath);
			}
			return null;
		}

		const modPatch = new ModPatch();

		if (!fs.existsSync(modPath)) {
			console.log("Mod not found");
			return modPatch;
		}

		modPatch.pokedex = tryImport('pokedex.ts')?.Pokedex || {};
		modPatch.learnsets = tryImport('learnsets.ts')?.Learnsets || {};
		modPatch.formatsData = tryImport('formats-data.ts')?.FormatsData || {};
		modPatch.typechart = tryImport('typechart.ts')?.Typechart || {};
		modPatch.items = tryImport('items.ts')?.Items || {};
		modPatch.moves = tryImport('moves.ts')?.Moves || {};
		modPatch.abilities = tryImport('abilities.ts')?.Abilities || {};

		const scripts = tryImport('scripts.ts')?.Scripts;
		modPatch.parentMod = scripts?.inherit || null;
		if (scripts?.init) {
			scripts.init(modPatch);
		}

		return modPatch;
	}
}
