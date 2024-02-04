#!/bin/sh

# General Settings

## Install dependencies
pnpm install

# /backend

## Create wrangler.toml
if [ ! -f "./backend/wrangler.toml" ]; then
  pnpm -C backend run generate:wrangler
fi

## migration
pnpm -C backend run migrate:local
