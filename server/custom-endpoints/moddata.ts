import type { IncomingMessage, ServerResponse } from 'http';
import { ModPatch } from "./modpatch";
import fs from "fs";
import path from "path";

export function moddataHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/moddata')) return false;

	const url = new URL(req.url, `http://${req.headers.host}`);
	const modId = url.searchParams.get('mod');

	let exists = false;
	const filepath = path.resolve(__dirname, '../../../cache', `${modId}.json`);
	console.log(filepath);
	try {
		if (!modId || !fs.existsSync(filepath)) { throw new Error("Mod not found"); }
		exists = true;
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
