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

for (const move in moveData) {
	const moveInfo = moveData[move];
	if (moveInfo?.condition?.duration === undefined) {
		continue;
	}

	let effectId: any = null;
	const duration = moveInfo.condition.duration;
	if (moveInfo.pseudoWeather) {
		effectId = moveInfo.pseudoWeather;
	}
	if (moveInfo.terrain) {
		effectId = moveInfo.terrain;
	}
	if (moveInfo.weather) {
		effectId = moveInfo.weather;
	}
	if (moveInfo.sideCondition) {
		effectId = moveInfo.sideCondition;
	}
	if (moveInfo.slotCondition) {
		effectId = moveInfo.slotCondition;
	}
	if (moveInfo.volatileStatus) {
		effectId = moveInfo.volatileStatus;
	}
	if (moveInfo.status) {
		effectId = moveInfo.status;
	}
	if (!effectId) { effectId = move; } // Default to move id.

	modPatch.conditionsData[effectId] = {
		duration,
	}; // Templating for future additional features.
}
const conditionData = getRawModData(modName, "conditions", compiledOffset);
for (const condition in conditionData) {
	const conditionInfo = conditionData[condition];
	if (conditionInfo?.duration !== undefined) {
		modPatch.conditionsData[condition as Lowercase<string>] = { duration: conditionInfo.duration };
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

import fs from "fs";
import path from "path";

const filepath = path.resolve(__dirname, compiledOffset, '../../../cache');
if (!fs.existsSync(filepath)) {
	fs.mkdirSync(filepath);
}
fs.writeFileSync(`${filepath}/${modName}.json`, JSON.stringify(modPatch, null, 2), 'utf8');
console.log(`Wrote cache for ${modName} to ${filepath}`);
