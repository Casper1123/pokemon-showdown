import * as fs from 'fs';
import * as path from 'path';

/**
 * Reads the .ts file data of a given mod's file and returns it. Skips Dex Inheritance and is used for modpatching.
 * @param modName The name of the mod.
 * @param filename The name of the file inside the mod's folder.
 * @param compiledOffset .. if Compiled (not manually ran) and empty if not.
 * Should be passed in from a caller script, and is used to distinguish between the file being placed in dist or not. (a manually ran ts file is not)
 */
export function getRawModData(modName: string, filename: string, compiledOffset: string) {
	const modPath = path.join(__dirname, compiledOffset, '../data/mods', modName);
	const filePath = path.join(modPath, filename + ".ts");
	console.log("Checking file existance");
	if (!fs.existsSync(filePath)) {
		console.log("File not found at", filePath);
		return {};
	}
	const fileContent = fs.readFileSync(filePath, 'utf8');
	// Extract just the export object using regex
	const exportMatch = /export\s+const\s+\w+\s*:\s*[^=]*=\s*(\{[\s\S]*?\n\};)/.exec(fileContent);

	if (exportMatch) {
		try {
			const objectLiteral = exportMatch[1].replace(/\};$/, '}');
			// I think I know what I'm doing.
			// I hate it too okay.
			// eslint-disable-next-line no-eval
			return eval(`(${objectLiteral})`);
		} catch (e) {
			console.log("Error evaluating", modName, filename);
			return {};
		}
	}
	console.log("No match found");
	return {};
}
