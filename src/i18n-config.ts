export const i18n = {
  defaultLocale: "uk-UA",
  locales: ["uk-UA", "en-US"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
