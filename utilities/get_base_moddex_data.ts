import * as fs from 'fs';
import * as path from 'path';

export function getRawModData(modName: string, filename: string) {
	const modPath = path.join(__dirname, '../data/mods', modName);
	const rawData: any = {};

	// Read each mod file directly
	const filePath = path.join(modPath, filename);
	if (fs.existsSync(filePath)) {
		// Use require to get the raw exports
		delete require.cache[require.resolve(filePath)];
		const moduleData = require(filePath);
		rawData[filename.replace('.ts', '')] = moduleData;
	}

	return rawData;
}
