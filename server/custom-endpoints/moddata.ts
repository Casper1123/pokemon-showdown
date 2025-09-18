import type { IncomingMessage, ServerResponse } from 'http';
import fs from "fs";
import path from "path";

export function moddataHandler(req: IncomingMessage, res: ServerResponse): boolean {
	if (!req.url?.startsWith('/data/moddata')) return false;

	res.statusCode = 503;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ error: 'Endpoint currently unavailable. This is work in-progress.' }));

	return true;
}
