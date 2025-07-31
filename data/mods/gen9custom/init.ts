import { ModdedDex } from "../../../sim/dex";

// mod-required imports
import { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { FormatsData } from "./formats-data";
import { Pokedex } from "./pokedex";
import { Scripts } from "./scripts";
import { Items } from "./items";
import { TypeChart } from "./typechart";
import { Moves } from "./moves";
import { applyChanges } from "./learnset_changes";

// Generates cache file for this custom mode.
const modPatch = new ModPatch();
modPatch.pokedex = Pokedex;
modPatch.formatsData = FormatsData;
modPatch.moves = Moves;
modPatch.typechart = TypeChart;
modPatch.items = Items;

if (Scripts) {
	modPatch.parentMod = Scripts.inherit ? Scripts.inherit : null;
	if (Scripts.init) {
		// Apply changes to this thing's
		applyChanges(new ModdedDex(), modPatch);
	}
}

import fs from "fs";
import path from "path";

const filepath = path.resolve(__dirname, '../../../cache');
if (!fs.existsSync(filepath)) {
	fs.mkdirSync(filepath);
}
fs.writeFileSync(`${filepath}/${__dirname.split("\\").slice(-1)[0]}.json`, JSON.stringify(modPatch, null, 2), 'utf8');
