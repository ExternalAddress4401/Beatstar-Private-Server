# Beatstar Private Server

A private server for Beatstar which is shutting down on October 31st 2025. This server aims to rebuild initial support for the login sequence as well as any heartbeats and vital packets such as scoring to keep the game playable.

## How the heck do I use this?

In its current state you don't unless you're a power user. If you are keep reading...

### I'm rooted!

1. Install the Frida CLI tools (frida-tools) and setup the server for Android following https://medium.com/@briskinfosec/getting-started-with-frida-de44d932ae7
2. Start the server (./frida-server in /data/local/tmp)
3. Edit the `host` in `index.ts` to point to your PC's local IP
4. Start `server.ts` with `tsx server.ts`
5. Connect your phone to the host PC and run `frida -U -f com.spaceapegames.beatstar -l index.ts`
6. If done correctly login packets will flow through the custom server. Currently only some of them are iplemented

### I'm not rooted :(

1. Follow [this](https://github.com/ExternalAddress4401/Beatstar-Script-Android?tab=readme-ov-file#apk-patching) for patching an APK
2. Install the patched APK onto your phone and open the app. It should appear frozen.
3. Edit the `host` in `index.ts` to point to your PC's local IP
4. Start `server.ts` with `tsx server.ts`
5. Start Frida with `frida -U Gadget -l index.ts`
6. If done correctly login packets will flow through the custom server. Currently only some of them are implemented
