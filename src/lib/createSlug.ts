// src/lib/createSlug.ts
import { GENERATE_SLUG_FROM_TITLE } from '../config';

export default function createSlug(title: string, staticSlug: string): string {
  if (GENERATE_SLUG_FROM_TITLE) {
    return title.toLowerCase().replace(/ /g, '-');
  }
  return staticSlug;
}
