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
            maxHueDiff: 359,
            stepHue: 15,
            minSaturation: 0,
            maxSaturation: 0.01,
            stepSaturation: 0.05,
            minLightness: 0,
            maxLightness: 1.001,
            stepLightness: 0.05,
        })
        .pluck({
            color: imageHex,
            minContrast: 5,
        })
        .sortBy("s")
        .getHexArray();
    
        console.log(colours)
    let colour = colours[0];
    return colour;
};


export const pickTextColorBasedOnBgColorSimple = (bgColor:string , lightColor = '#ffffff', darkColor = '#000000') =>{
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }