import type { IncomingMessage, ServerResponse } from 'http';

export function availableModsHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/data/availablemods')) return false;

	const url = new URL(req.url, `https://${req.headers.host}`);

	try {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end(JSON.stringify(Config.exportedMods));
	} catch (err) {
		res.statusCode = 400;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: `Exported mods list could not be loaded due to internal error.` }));
	}
	return true;
}
