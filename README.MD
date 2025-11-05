# Beatstar Private Server

Discord: https://discord.gg/9ST4Qe83bT

A private server for Beatstar which is shutting down on October 31st 2025. This server aims to rebuild initial support for the login sequence as well as any heartbeats and vital packets such as scoring to keep the game playable.

## Setup

1. Clone this repo
2. Add a Github PAT to a file called `token` in the root directory as well as the `website` directory
3. Run `pnpm run setup` to download dependencies in both the root directory and the `website` directory
4. Start the docker server by running `docker compose up -d` inside the `website` folder
5. Setup the database by running `pnpm prisma migrate reset`

The website is writting in [Svelte](https://svelte.dev/)

Migrations are handled by Prisma and live in `website/beatstar/prisma/migrations`. They can be created by editing `schema.prisma` and adding models then running `pnpm prisma migrate dev`

## Creating an account

1. With docker running the the site started with `pnpm dev` navigate to http://localhost:5173
2. Create an account then login. A test account called `test` password `test` is created by seeds for you should you want it
3. Navigate to http://localhost:5173/profile and download your profile file
4. Place the downloaded file on your device in sdcard/beatstar

### Pointing to a custom instance

1. Open (or create and open) your `settings.json` file in your `beatstar` folder
2. Set `serverIp` to the IP of your machine hosting the server
3. Set `serverPort` to the port of your machine hosting the server
4. Open your modded Beatstar
5. See the notes below

### Notes

Beatstar is not built to allow cleartext traffic. HTTP requests need to flow through a valid HTTPS server with a signed certificate. Self signed certificates will fail.

When the ENVIRONMENT variable is set to `dev` the `CMSService` will automatically start a localtunnel instance for you. For a server with a proper SSL certificate the environment should be set to `prod`

`pnpm install` will not download packages from the github registry without a valid PAT. You will experience issues related to the protobuf package if you don't use the `setup` command.
