import { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { getRawModData } from "../../../utilities/get_base_moddex_data";
import { FormatsData } from "./formats-data";
import { Pokedex } from "./pokedex";
import { Scripts } from "./scripts";
import { Items } from "./items";
import { TypeChart } from "./typechart";
import { Moves } from "./moves";
import { Abilities } from "./abilities";
import { applyChanges } from "./learnset_changes";

// Generates cache file for this custom mode.
const modName = __dirname.split("\\").slice(-1)[0];
const modPatch = new ModPatch();
console.log(`Creating Cache file for ${modName} ...`);

let compiledOffset = ".."; // If this is a compiled file, go up one more layer.
if (require.main === module) {
	compiledOffset = ""; // Do not compensate if ran manually.
}

modPatch.pokedex = getRawModData(modName, "pokedex", compiledOffset);
modPatch.formatsData = getRawModData(modName, "formats-data", compiledOffset);
modPatch.moves = getRawModData(modName, "moves", compiledOffset);
// modPatch.typechart = getRawModData(modName, "typeChart", compiledOffset); type chart data is not required.
modPatch.items = getRawModData(modName, "items", compiledOffset);
modPatch.abilities = getRawModData(modName, "abilities", compiledOffset);

import { Dex } from "../../../sim/dex";
if (Scripts) {
	modPatch.parentMod = Scripts.inherit ? Scripts.inherit : null;
	if (Scripts.init) {
		// Apply changes to movesets of this mod to modPatch
		applyChanges(Dex.mod(modName), modPatch);
		// Loading the current mod name just in case. Let's not edit other mods on accident.
	}
}

// Write file
import fs from "fs";
import path from "path";

const filepath = path.resolve(__dirname, compiledOffset, '../../../cache');
if (!fs.existsSync(filepath)) {
	fs.mkdirSync(filepath);
}
fs.writeFileSync(`${filepath}/${modName}.json`, JSON.stringify(modPatch, null, 2), 'utf8');
console.log(`Wrote cache for ${modName} to ${filepath}`);
