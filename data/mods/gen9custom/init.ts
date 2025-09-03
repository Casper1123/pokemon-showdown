import { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { getRawModData } from "../../../utilities/get_base_moddex_data";
import { Scripts } from "./scripts";
import { applyChanges } from "./learnset_changes";

// Generates cache file for this custom mode.
const modName = path.basename(__dirname);
const modPatch = new ModPatch();
console.log(`Creating Cache file for ${modName} ...`);

let compiledOffset = ".."; // If this is a compiled file, go up one more layer.
if (require.main === module) {
	compiledOffset = ""; // Do not compensate if ran manually.
}

modPatch.pokedex = getRawModData(modName, "pokedex", compiledOffset);
modPatch.formatsData = getRawModData(modName, "formats-data", compiledOffset);
const moveData = getRawModData(modName, "moves", compiledOffset);
modPatch.moves = moveData;
modPatch.typechart = getRawModData(modName, "typechart", compiledOffset);
modPatch.items = getRawModData(modName, "items", compiledOffset);
modPatch.abilities = getRawModData(modName, "abilities", compiledOffset);

// Construct Conditions data. Note: currently only does Duration.
for (const move of moveData) {
	const moveInfo = moveData[move];
	if (moveInfo?.condition?.duration && moveInfo.pseudoWeather) {
		modPatch.conditionsData[moveInfo.pseudoWeather] = { duration: moveInfo.duration };
	}
	if (moveInfo?.condition?.duration && moveInfo.terrain) {
		modPatch.conditionsData[moveInfo.terrain] = { duration: moveInfo.duration };
	}
}
const conditionData = getRawModData(modName, "conditions", compiledOffset);
for (const condition of conditionData) {
	const conditionInfo = conditionData[condition];
	if (conditionInfo?.duration) {
		modPatch.conditionsData[condition] = { duration: conditionInfo.duration };
	}
}

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
