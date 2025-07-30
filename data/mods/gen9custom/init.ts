import { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { FormatsData } from "./formats-data";
import { Pokedex } from "./pokedex";
import { Scripts } from "./scripts";
import { Items } from "./items";
import { TypeChart } from "./typechart";
import { Moves } from "./moves";

// Generates cache file for this custom mode.
const modPatch = new ModPatch();
modPatch.pokedex = Pokedex;
modPatch.formatsData = FormatsData;
modPatch.moves = Moves;
modPatch.typechart = TypeChart;
modPatch.items = Items;

if (Scripts?.init) {
	Scripts.init(modPatch);
}
