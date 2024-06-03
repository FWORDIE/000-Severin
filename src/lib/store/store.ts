import { writable } from "svelte/store";

export const imageNum = writable(0);

export const siteName = writable('Albums')

export const forcedColours = writable(false)