import { wcagColors } from "$lib/wcagColors";
import invert from "invert-color";

export function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
export const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));



export const getTxt = (imageHex: string) => {
    var colours = wcagColors
        .getAll({
            color: invert(imageHex),
            minHueDiff: 0,
            maxHueDiff: 10,
            stepHue: 5,
            minSaturation: 0.4,
            maxSaturation: 1,
            stepSaturation: 0.05,
            minLightness: 0,
            maxLightness: 1.001,
            stepLightness: 0.05,
        })
        .pluck({
            color: imageHex,
            minContrast: 4,
        })
        .sortBy("s")
        .getHexArray();

    let colour = colours[Math.floor(random(0, colours.length))];
    return colour;
};