import type { IncomingMessage, ServerResponse } from "http";
import { moddataHandler } from "./moddata";
import { availableModsHandler } from "./available_custom_formats";
import { formatModsHandler } from "./formatmods";

export function handleCustomEndpoints(req: IncomingMessage, res: ServerResponse): boolean {
	if (moddataHandler(req, res)) return true;
	if (availableModsHandler(req, res)) return true;
	if (formatModsHandler(req, res)) return true;
	// if (assetsHandler(req, res)) return true;

	return false;
}
