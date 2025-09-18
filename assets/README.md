# Assets
The assets folder is where your custom assets should go.
You can organize your own file structure here, as long as it's consistent with your mod's custom assets specification
(for example, if you were to save your fakemon sprites in a subfolder called pokemon, do direct the path correctly inside the mod entry).

Items in this folder of types `png, gif, wav, mp3` can be requested. If you want to change this, find the source code in `~/server/custom_endpoints/assets.ts`

These files won't be cached as they'll be served directly to any client requesting them.
This means they can technically be accessed if you place them in here, even if your mod doesn't currently use them.
The client will only get (and cache) them if they're requested. A list of available files *is* cached to allow the client to efficiently redirect it's asset request.
