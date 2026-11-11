
#!/bin/bash

for port in 2000 2002 2003 2004 6660 6661 6662 7000; do
  fuser -k "$port/tcp" >/dev/null 2>&1 || true
done

sleep 0.5

concurrently --kill-others \
  --names "   NEKO   ,  BRIDGE  ,   WEB    , DISCORD  ,DARKBRIDGE,  FINDER  ,  LUMEN   , BROWSER  " \
  "nodemon --signal SIGTERM --watch core --ext ts --exec 'node --import tsx' core/neko.ts" \
  "nodemon --signal SIGTERM --watch bridge --ext ts --exec 'node --import tsx' bridge/bridge.ts" \
  "nodemon --signal SIGTERM --watch web --ext ts --exec 'node --import tsx' web/server.ts" \
  "nodemon --signal SIGTERM --watch discord --ext ts --exec 'node --import tsx' discord/discord.ts" \
  "nodemon --signal SIGTERM --watch dark-bridge --ext ts --exec 'node --import tsx' dark-bridge/dark-bridge.ts" \
  "nodemon --signal SIGTERM --watch finder --ext ts --exec 'node --import tsx' finder/finder.ts" \
  "nodemon --signal SIGTERM --watch lumen-db --ext ts --exec 'node --import tsx' lumen-db/lumen-db.ts" \
  "browser-sync start --proxy http://localhost:2002 --files 'web/**/*' --no-inject-changes --no-open --no-notify"
