import * as fs from 'fs';
import * as path from 'path';

export function getRawModData(modName: string, filename: string) {
	const modPath = path.join(__dirname, '../data/mods', modName);
	const filePath = path.join(modPath, filename + ".ts");

	if (!fs.existsSync(filePath)) {
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
			return {};
		}
	}

	return {};
}
