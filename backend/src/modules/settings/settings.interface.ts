export interface SiteSettingEntry {
  key: string;
  value: string | number | boolean | null;
}

export type UpdateSettingsBatchPayload =
  | Record<string, string | number | boolean | null>
  | { settings: SiteSettingEntry[] };

