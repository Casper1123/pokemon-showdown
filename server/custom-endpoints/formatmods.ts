import type { IncomingMessage, ServerResponse } from 'http';
import { Dex } from "../../sim/dex";

export function formatModsHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/data/formatmods')) return false;
	const url = new URL(req.url, `https://${req.headers.host}`);

	try {
		const customModFormats: { [formatId: string]: string } = {};
		const allFormats = Dex.formats.all();
		for (const format of allFormats) {
			if (!Config.exportedMods.includes(format.mod)) continue;
			customModFormats[format.id] = format.mod;
		}

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end(JSON.stringify(customModFormats)); // returns type { format: modId } for client use to pair mods to formats properly.
		// Should only do so for formats that use customized mods that are available in the moddata endpoint.
	} catch (err) {
		console.log(err);
		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: `Data could not be prepared due to internal error.` }));
	}
	return true;
}
