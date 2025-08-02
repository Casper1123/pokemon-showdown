// utilities/populate_cache.cjs
function populateCache(exportedMods) {
	console.log("Cache population initialized.");
	const fs = require("fs");
	const path = require("path");

	const cachePath = path.resolve(__dirname, "../cache");
	// Create if not existent
	if (!fs.existsSync(cachePath)) {
		fs.mkdirSync(cachePath);
	}

	// Empty out cache, then repopulate.
	for (const file of fs.readdirSync(cachePath, { withFileTypes: true })) {
		fs.rmSync(path.join(cachePath, file.name));
	}

	// Find and create new cache files from config mods.
	const distModsPath = path.resolve(__dirname, '../dist/data/mods');
	for (const modName of exportedMods) {
		const initPath = path.join(distModsPath, modName, 'init.js');  // todo: if this doesn't exist, copy a template compiled copy there instead.
		// todo: wait if we're doing that why not just.. write init better to not have to be placed in the mod folder???
		console.log(`Processing cache for mod: ${modName}`);

		try {
			delete require.cache[require.resolve(initPath)];
			require(initPath);
		} catch (error) {
			console.log(`Failed to process cache:`, error);
		}
	}

	console.log('Cache population completed');
}

module.exports = { populateCache };
