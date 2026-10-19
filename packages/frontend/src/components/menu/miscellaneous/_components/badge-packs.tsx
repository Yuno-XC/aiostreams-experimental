import { useState } from 'react';
import { useUserData } from '@/context/userData';
import { SettingsCard } from '../../../shared/settings-card';
import { TextInput } from '@aiostreams/ui/text-input';
import { Button } from '@aiostreams/ui/button';
import { IconButton } from '@aiostreams/ui/button';
import { BiTrash, BiPlus } from 'react-icons/bi';

const DEFAULT_PACK =
  'https://raw.githubusercontent.com/kingsizew/badges/main/white_badges.json';

function isHttpUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Experimental fork: import badge-pack JSON URLs into the saved config.
 * Custom clients (sample iOS app) fetch these and match stream filenames.
 */
export function BadgePacks() {
  const { userData, setUserData } = useUserData();
  const packs = userData.badgePackUrls ?? [];
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addPack = (raw: string) => {
    const url = raw.trim();
    if (!url) return;
    if (!isHttpUrl(url)) {
      setError('Enter a valid http(s) URL to a badge pack JSON file.');
      return;
    }
    if (packs.includes(url)) {
      setError('That pack URL is already listed.');
      return;
    }
    setError(null);
    setUserData((prev) => ({
      ...prev,
      badgePackUrls: [...(prev.badgePackUrls ?? []), url],
    }));
    setDraft('');
  };

  const removeAt = (index: number) => {
    setUserData((prev) => ({
      ...prev,
      badgePackUrls: (prev.badgePackUrls ?? []).filter((_, i) => i !== index),
    }));
  };

  return (
    <SettingsCard
      title="Badge Pack URLs"
      id="badgePackUrls"
      description="Import Fusion/Nuvio or AIOStreams badge-pack JSON URLs. Saved with your config. Custom apps (not Stremio) fetch these and draw logos from stream filenames. Save & Install after changing."
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-end">
          <div className="flex-1">
            <TextInput
              label="Pack JSON URL"
              type="url"
              value={draft}
              placeholder={DEFAULT_PACK}
              onValueChange={(value: string) => {
                setDraft(value);
                setError(null);
              }}
            />
          </div>
          <Button
            intent="primary-subtle"
            onClick={() => addPack(draft)}
            className="shrink-0"
          >
            <BiPlus className="w-4 h-4" />
            Import
          </Button>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button intent="gray-outline" onClick={() => addPack(DEFAULT_PACK)}>
          Add Kingsize white pack
        </Button>
        {packs.length === 0 ? (
          <p className="text-sm text-[--muted]">No badge packs imported yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {packs.map((url, index) => (
              <li
                key={url}
                className="flex items-center gap-2 rounded-md border border-[--border] px-3 py-2 text-sm break-all"
              >
                <span className="flex-1 font-mono text-xs">{url}</span>
                <IconButton
                  icon={<BiTrash />}
                  intent="alert-subtle"
                  onClick={() => removeAt(index)}
                  aria-label="Remove pack"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </SettingsCard>
  );
}
