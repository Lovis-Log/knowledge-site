# Landing heading font

Noto Serif SC, weight 500, distributed under the included SIL Open Font License.

Source: https://github.com/google/fonts/tree/main/ofl/notoserifsc

The WOFF2 contains the 363 non-ASCII characters currently used in landing-copy.ts and landing-page.tsx. Regenerate it when Chinese landing copy changes, using the Google Fonts CSS API `text` parameter with the sorted unique non-ASCII characters from those two files. Request `Noto Serif SC:wght@500` and `display=swap`, then download the font URL returned in the CSS. If returned as TTF, convert with fontTools TTFont flavor=woff2. Keep this license with the font.

The local Next.js font loader serves this subset through /_next/static/, including to anonymous readers, without runtime requests to Google Fonts.
