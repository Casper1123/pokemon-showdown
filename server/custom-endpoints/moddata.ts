import type { IncomingMessage, ServerResponse } from 'http';
import { Dex } from '../../sim/dex';

export function moddataHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/moddata')) return false;

	const url = new URL(req.url, `http://${req.headers.host}`);
	const modid = url.searchParams.get('mod') || 'gen9custom';

	try {
		const dex = Dex.mod(modid);
		const output = {
			format: modid,
			pokemon: dex.data.Pokedex,
			moves: dex.data.Moves,
			items: dex.data.Items,
			abilities: dex.data.Abilities,
			types: dex.data.TypeChart,
			learnsets: dex.data.Learnsets,
			formatsData: dex.data.FormatsData,
		};

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.end(JSON.stringify(output));
	} catch (err) {
		res.statusCode = 400;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: `Failed to load mod: ${modid}` }));
	}
	return true;
}
// sockets L346 is where this is implemented. See there.
