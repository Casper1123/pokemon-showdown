import type { IncomingMessage, ServerResponse } from "http";

export function handleCustomEndpoints(req: IncomingMessage, res: ServerResponse): boolean {
	return false;

	// Deprecated.
	// if (moddataHandler(req, res)) return true;
	// if (availableModsHandler(req, res)) return true;
	// if (formatModsHandler(req, res)) return true;
	// if (assetsHandler(req, res)) return true;
}
