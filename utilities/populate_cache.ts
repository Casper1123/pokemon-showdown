import fs from 'fs';
import path from 'path';

/**
 * Populates the cache by clearing existing files and requiring init.js for each exported mod.
 * @param exportedMods - An array of mod names to process.
 */
export function populateCache(exportedMods: string[]): void {
	console.log("Cache population initialized.");

	const cachePath = path.resolve(__dirname, "../cache");

	// Create cache directory if it doesn't exist
	if (!fs.existsSync(cachePath)) {
		fs.mkdirSync(cachePath);
	}

	// Clear existing cache files
	for (const file of fs.readdirSync(cachePath, { withFileTypes: true })) {
		fs.rmSync(path.join(cachePath, file.name));
	}

	// Create new cache files from mod configs
	const distModsPath = path.resolve(__dirname, '../../dist/data/mods');
	for (const modName of exportedMods) {
		const initPath = path.join(distModsPath, modName, 'init.js'); // TODO: Handle missing init.js with fallback

		console.log(`Processing cache for mod: ${modName}`);

		try {
			delete require.cache[require.resolve(initPath)];
			require(initPath); // This will execute the init script
		} catch (error) {
			console.log(`Failed to process cache for ${modName}:`, error);
		}
	}

	console.log('Cache population completed');
}
