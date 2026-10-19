# Mac-only experimental AIOStreams fork

**Oracle VPS is untouched.** This tree runs only on your Mac.

## Fork

- GitHub: `Yuno-XC/aiostreams-experimental`
- Branch: `experimental/default-badge-packs`
- Upstream: `Viren070/AIOStreams`

## Experimental feature

`JELLYFIN_DEFAULT_BADGE_PACK_URLS` — instance-default badge pack URLs.

When a signed-in web-app account has **no** pack links under Settings → Playback → Versions, the app loads these URLs automatically.

Does **not** add image badges to Stremio.

## Run on Mac

```bash
cd ~/Documents/aiostreams-experimental
pnpm install
pnpm build
pnpm start
```

Open:

- Configure: http://127.0.0.1:3100/stremio/configure
- Web app: Save & Install → AIOStreams app → Open in browser

Local data: `./data/` (separate from the VPS).

## Importing a VPS config

Mac defaults to `REGEX_FILTER_ACCESS=trusted` with an empty URL allowlist.
Imported regex sync URLs (e.g. `git.tamtaro.de`, GitHub raw) then show
**Forbidden URL(s) in regex configuration** unless:

- `REGEX_FILTER_ACCESS=all` (set in this Mac `.env`), or
- your UUID is in `TRUSTED_UUIDS`, or
- those URLs are added under Dashboard → whitelisted regex pattern sync URLs

Restart AIOS after changing `.env`.
