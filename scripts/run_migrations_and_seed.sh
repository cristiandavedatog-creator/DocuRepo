#!/usr/bin/env bash
set -euo pipefail

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

if [ "${SEED_DB:-false}" = "true" ]; then
  echo "Seeding database..."
  node prisma/seed.js
fi

echo "Migrations (and optional seed) complete."
