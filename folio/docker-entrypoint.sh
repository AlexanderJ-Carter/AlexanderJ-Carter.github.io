#!/bin/sh
set -eu

# Named volumes keep host UIDs across rebuilds; ensure nextjs can write SQLite/media.
if [ "$(id -u)" = "0" ]; then
  chown -R nextjs:nodejs /app/data /app/public/media
  chmod -R u+rwX,g+rwX /app/data /app/public/media
  exec su-exec nextjs "$@"
fi

exec "$@"
