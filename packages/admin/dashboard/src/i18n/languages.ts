<<<<<<< HEAD
import {
  de,
  enUS,
  es,
  fr,
  it,
  ja,
  pl,
  ptBR,
  th,
  tr,
  uk,
  ro,
  mk,
  mn,
  ar,
  zhCN,
  faIR,
  cs,
  ru
} from "date-fns/locale"
=======
import { de, enUS, es, fr, it, pl, ptBR, th, tr ,ar} from "date-fns/locale"
>>>>>>> b4c4f36c2c (feat(dashboard): set `ltr` to false + add changeset)
import { Language } from "./types"

export const languages: Language[] = [
  {
    code: "ar",
<<<<<<< HEAD
    display_name: "عربي",
=======
    display_name: "العربية",
>>>>>>> b4c4f36c2c (feat(dashboard): set `ltr` to false + add changeset)
    ltr: false,
    date_locale: ar,
  },
  {
    code: "en",
    display_name: "English",
    ltr: true,
    date_locale: enUS,
  },
  {
    code: "es",
    display_name: "Español",
    ltr: true,
    date_locale: es,
  },
  {
    code: "de",
    display_name: "Deutsch",
    ltr: true,
    date_locale: de,
  },
  {
    code: "fr",
    display_name: "Français",
    ltr: true,
    date_locale: fr,
  },
  {
    code: "it",
    display_name: "Italiano",
    ltr: true,
    date_locale: it,
  },
  {
    code: "ja",
    display_name: "日本語",
    ltr: true,
    date_locale: ja,
  },
  {
    code: "pl",
    display_name: "Polski",
    ltr: true,
    date_locale: pl,
  },
  {
    code: "ptBR",
    display_name: "Português (Brasil)",
    ltr: true,
    date_locale: ptBR,
  },
  {
    code: "tr",
    display_name: "Türkçe",
    ltr: true,
    date_locale: tr,
  },
  {
    code: "th",
    display_name: "ไทย",
    ltr: true,
    date_locale: th,
  },
  {
    code: "uk",
    display_name: "Українська",
    ltr: true,
    date_locale: uk,
  },
  {
    code: "ro",
    display_name: "Română",
    ltr: true,
    date_locale: ro,
  },
  {
    code: "mk",
    display_name: "Македонски",
    ltr: true,
    date_locale: mk,
  },
  {
    code: "mn",
    display_name: "Монгол",
    ltr: true,
    date_locale: mn,
  },
  {
    code: "ar",
    display_name: "العربية",
    ltr: false,
    date_locale: ar,
  },
  {
    code: "zhCN",
    display_name: "简体中文",
    ltr: true,
    date_locale: zhCN,
  },
  {
    code: "fa",
    display_name: "فارسی",
    ltr: false,
    date_locale: faIR,
  },
  {
    code: "cs",
    display_name: "Čeština",
    ltr: true,
    date_locale: cs,
  },
  {
    code: "ru",
    display_name: "Русский",
    ltr: true,
    date_locale: ru,
  },
]
