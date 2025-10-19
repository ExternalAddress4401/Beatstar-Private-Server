# Beatstar Private Server

Discord: https://discord.gg/9ST4Qe83bT

A private server for Beatstar which is shutting down on October 31st 2025. This server aims to rebuild initial support for the login sequence as well as any heartbeats and vital packets such as scoring to keep the game playable.

## How the heck do I use this?

In its current state you don't unless you're a power user. If you are keep reading...

## Setup steps

1. Clone this repo
2. Create a file called `token` and paste in your Github PAT with the read packages permission
3. Run `npm install` followed by `npm setup` to install the necessary packages for the server

## Creating an account

1. Start the docker database in website/beatstar with `docker compose up -d`
2. Install dependencies for the website with `pnpm install`
3. Start the site with `pnpm dev`
4. Navigate to http://localhost:5173
5. Create an account then login. You won't see any obvious signs of being logged in.
6. Navigate to http://localhost:5173/profile and download your profile file
7. Place the downloaded file on your device in sdcard/beatstar

### I'm using Beatclone or Externals builds of Beatstar

1. Open (or create and open) your settings.json file in your beatstar folder
2. Set `server_ip` to the IP of your machine hosting the server
3. Set `server_port` to the port of your machine hosting the server
4. Open your modded Beatstar
5. See the notes below

### I'm rooted!

1. Install the Frida CLI tools (frida-tools) and setup the server for Android following https://medium.com/@briskinfosec/getting-started-with-frida-de44d932ae7
2. Start the server (./frida-server in /data/local/tmp)
3. Edit the `host` in `index.ts` to point to your PC's local IP
4. Start `server.ts` with `tsx server.ts`
5. Connect your phone to the host PC and run `frida -U -f com.spaceapegames.beatstar -l index.ts`
6. If done correctly login packets will flow through the custom server. Currently only some of them are implemented
7. See the notes below

### I'm not rooted :(

1. Follow [this](https://github.com/ExternalAddress4401/Beatstar-Script-Android?tab=readme-ov-file#apk-patching) for patching an APK
2. Install the patched APK onto your phone and open the app. It should appear frozen.
3. Edit the `host` in `index.ts` to point to your PC's local IP
4. Start `server.ts` with `tsx server.ts`
5. Start Frida with `frida -U Gadget -l index.ts`
6. If done correctly login packets will flow through the custom server. Currently only some of them are implemented
7. See the notes below

### Notes

Beatstar is not built to allow cleartext traffic. HTTP requests need to flow through a valid HTTPS server with a signed certificate. Self signed certificates will fail.

The easiest way to get around this for local testing is with [ngrok](https://ngrok.com/)

When the ENVIRONMENT variable is set to `dev` the `CMSService` will automatically look for any ngrok tunnels you have openand use the first one. The only requirement is that you have one running. For a server with a proper SSL certificate this behaviour will need to be removed and `HttpServer` will need to be edited to use your certificate.
