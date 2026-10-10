#!/bin/bash

fuser -k 2000/tcp 2001/tcp 2002/tcp 2003/tcp 2004/tcp 6660/tcp 6661/tcp 6662/tcp>/dev/null 2>&1 || true

concurrently --kill-others --names "NEKO,BRIDGE,WEB,DISCORD,DARK_BRIDGE,FINDER,LUMEN" \
  "nodemon --watch core --ext ts --exec 'npx tsx core/neko.ts'" \
  "nodemon --watch bridge --ext ts --exec 'npx tsx bridge/bridge.ts'" \
  "nodemon --watch web --ext ts --exec 'npx tsx web/server.ts'" \
  "nodemon --watch discord --ext ts --exec 'npx tsx discord/discord.ts'" \
  "nodemon --watch dark-bridge --ext ts --exec 'npx tsx dark-bridge/dark-bridge.ts'" \
  "nodemon --watch finder --ext ts --exec 'npx tsx finder/finder.ts'" \
  "nodemon --watch finder --ext ts --exec 'npx tsx lumen-db/lumen-db.ts'" \
  "browser-sync start ..."
    --proxy http://localhost:2002 \
    --files 'neko' \
    --no-inject-changes \
    --no-open \
    --no-notify"