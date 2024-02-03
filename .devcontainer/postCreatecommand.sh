#!/bin/sh

# General Settings

## Install dependencies
pnpm install

# /backend

## Create wrangler.toml
if [ ! -f "./backend/wrangler.toml" ]; then
  cat << EOF > ./backend/wrangler.toml
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "qiita-hackathon-2024-qualify"
database_id = "00000000-0000-0000-0000-000000000000" # Note: 0000... UUID is dummy for local development.
preview_database_id = "local-test-db"
EOF
fi

## migration
pnpm -C backend run migrate:local