#!/bin/bash

fuser -k 2000/tcp 2001/tcp 2002/tcp >/dev/null 2>&1 || true

concurrently --kill-others --names "NEKO,BRIDGE,WEB,DISCORD,LIVE" \
  "nodemon --watch core --ext ts --exec 'npx tsx core/neko.ts'" \
  "nodemon --watch bridge --ext ts --exec 'npx tsx bridge/socket.ts'" \
  "nodemon --watch web --ext ts --exec 'npx tsx web/server.ts'" \
  "nodemon --watch discord --ext ts --exec 'npx tsx discord/discord.ts'" \
  "browser-sync start ..."
    --proxy http://localhost:2002 \
    --files 'neko' \
    --no-inject-changes \
    --no-open \
    --no-notify"