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
		// Hidden power for everyone gen8+
		if (species.gen >= 8) {
			const id = species.id;
			if (!data.data.Learnsets[id]) {
				continue;
			} else if (!data.data.Learnsets[id].learnset) {
				data.data.Learnsets[id].learnset = {};
			}
			setMove(data, modPatch, id, "hiddenpower");
		}
		// todo: protect for everyone
		// todo: tera blast for everyone
	}

	// Gen1
	// Gen2
	setMove(data, modPatch, "ampharos", "dracometeor");
	setMove(data, modPatch, "ampharos", "tailglow");
	setMove(data, modPatch, "ampharos", "thunderclap");
	setMove(data, modPatch, "ampharos", "paraboliccharge");
	setMove(data, modPatch, "jumpluff", "trailblaze");
	setMove(data, modPatch, "jumpluff", "floatyfall");
	// Gen3
	setMove(data, modPatch, "absol", "lightofruin");
	setMove(data, modPatch, "absol", "spiritbreak");
	setMove(data, modPatch, "absol", "partingshot");
	setMove(data, modPatch, "flygon", "desertsong"); // Custom signature move.
	setMove(data, modPatch, "flygon", "nastyplot");
	setMove(data, modPatch, "aggron", "hornleech");
	setMove(data, modPatch, "aggron", "slackoff");
	setMove(data, modPatch, "manectric", "icebeam");
	setMove(data, modPatch, "manectric", "paraboliccharge");
	setMove(data, modPatch, "sceptile", "dracometeor");
	setMove(data, modPatch, "sceptile", "chloroblast");
	setMove(data, modPatch, "sceptile", "nastyplot");
	// Gen4
	setMove(data, modPatch, "hippowdon", "spikes");
	setMove(data, modPatch, "hippowdon", "knockoff");
	setMove(data, modPatch, "empoleon", "auroraveil");
	setMove(data, modPatch, "empoleon", "reflect");
	setMove(data, modPatch, "empoleon", "lightscreen");
	setMove(data, modPatch, "shaymin", "sparklyswirl");
	setMove(data, modPatch, "shaymin", "lightofruin");
	setMove(data, modPatch, "shaymin", "floralhealing");

	// Gen5
	setMove(data, modPatch, "serperior", "mudshot");
	setMove(data, modPatch, "conkeldurr", "steamroller");
	setMove(data, modPatch, "conkeldurr", "fakeout");
	setMove(data, modPatch, "conkeldurr", "meteormash");
	setMove(data, modPatch, "scolipede", "collisioncourse");
	setMove(data, modPatch, "haxorus", "dragonrush");
	setMove(data, modPatch, "durant", "highhorsepower");
	setMove(data, modPatch, "gigalith", "diamondstorm");
	setMove(data, modPatch, "gigalith", "shoreup");
	setMove(data, modPatch, "gigalith", "trickroom");
	setMove(data, modPatch, "boldore", "diamondstorm");
	setMove(data, modPatch, "boldore", "shoreup");
	setMove(data, modPatch, "boldore", "trickroom");
	setMove(data, modPatch, "cobalion", "secretsword");
	setMove(data, modPatch, "cobalion", "nastyplot");
	setMove(data, modPatch, "virizion", "secretsword");
	setMove(data, modPatch, "virizion", "nastyplot");
	setMove(data, modPatch, "terrakion", "accelerock");
	// Gen6
	// Gen7
	// Gen8
	// Gen9
}
