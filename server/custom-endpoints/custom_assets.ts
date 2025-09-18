import type { IncomingMessage, ServerResponse } from 'http';
import fs from "fs";
import path from "path";

export function assetHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/data/assets')) return false;

	const url = new URL(req.url, `https://${req.headers.host}`);
	const modId = url.searchParams.get('mod');

	let exists = false;
	const filepath = path.resolve(__dirname, '../../../cache', `${modId}.json`);

	try {
		// modId not given or does not exist within mod files.
		if (!modId || !fs.existsSync(path.join(__dirname, '../../../data/mods', modId)) || !Config.exportedMods.includes(modId)) { throw new Error(); }
		exists = true;
		// File not cached and can thus not be loaded
		if (!fs.existsSync(filepath)) { throw new Error(); }

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end(fs.readFileSync(filepath).toString());
	} catch (err) {
		res.statusCode = exists ? 400 : 404;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: exists ? `Failed to load mod: ${modId}` : `Could not find mod: ${modId}` }));
	}
	return true;
}
// sockets L346 is where this is implemented. See there.
