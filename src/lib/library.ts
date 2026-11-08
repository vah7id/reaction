import data from "@/data/library.json";

export type Character = { id: string; name: string; age: number; country: string; clips: number; portrait: string };
export type Clip = { id: string; no: number; emotion: string; video: string; poster: string; character: Character };

export const library = data as { totalClips: number; totalCharacters: number; shelves: [string, number][]; preview: Clip[] };
export const PREVIEW: Clip[] = library.preview;
export const CHARACTERS: Character[] = PREVIEW.map((c) => c.character);

/** Preview clips matching any of the emotions; falls back to all previews when none match. */
export function previewFor(emotions: string[] = []): Clip[] {
  const hit = PREVIEW.filter((c) => !emotions.length || emotions.includes(c.emotion));
  return hit.length ? hit : PREVIEW;
}

export const pad = (n: number) => String(n).padStart(3, "0");
