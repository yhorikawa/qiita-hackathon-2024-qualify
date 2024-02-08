#!/bin/sh

# General Settings
pnpm config set store-dir /home/node/.local/share/pnpm/store

## Install dependencies
pnpm install

# /backend

## Create wrangler.toml
if [ ! -f "./backend/wrangler.toml" ]; then
  pnpm -C backend run generate:wrangler
fi

## migration
pnpm -C backend run migrate:local
