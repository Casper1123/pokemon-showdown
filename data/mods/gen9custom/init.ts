import { ModPatch } from "../../../server/custom-endpoints/modpatch";
import { FormatsData } from "./formats-data";
import { Pokedex } from "./pokedex";
import { Scripts } from "./scripts";

// Generates cache file for this custom mode.
const modPatch = new ModPatch();
modPatch.pokedex = Pokedex;

if (Scripts?.init) {
	Scripts.init(modPatch);
}
