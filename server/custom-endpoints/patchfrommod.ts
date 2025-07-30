import path from 'path';
import fs from 'fs';

function loadModPatch(modid: string) {
	const modPath = path.resolve(__dirname, '../../mods', modid);

	// Helper to import a file if it exists
	function tryImport(file: string) {
		const fullPath = path.join(modPath, file);
		if (fs.existsSync(fullPath)) {
			// Use dynamic import or require depending on your setup
			return require(fullPath);
		}
		return null;
	}

	// Load patch data files if present
	const pokedex = tryImport('pokedex.ts')?.Pokedex || {};
	const learnsets = tryImport('learnsets.ts')?.Learnsets || {};
	const formatsData = tryImport('formats-data.ts')?.FormatsData || {};

	// Load scripts and get parent mod info
	const scripts = tryImport('scripts.ts')?.Scripts;
	const parentMod = scripts?.inherit || null;

	// Optionally, you can run scripts.init() here if needed to apply runtime patching
	if (scripts?.init) {
		// You might want to mock a "this" context for modData patching if required
		// Or you can export from scripts.ts a function that returns patch data after init
		scripts.init();
	}

	return {
		parentMod,
		patch: {
			pokedex,
			learnsets,
			formatsData,
		},
	};
}
