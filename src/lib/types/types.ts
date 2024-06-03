export interface datocmsdata {
    data: Data;
}

export interface alldatodata {
    data: Data2;
}

export interface Data2 {
    allAlbums: Album[];
    siteConfig: SiteConfig;

}

export interface Data {
    album: Album;
}

export interface Album {
    id: string;
    title: string;
    _status: string;
    _firstPublishedAt: Date;
    pictures: Picture[];
    date: string;
    description: string;
    location: string;
}

export interface Picture {
    alt: null;
    responsiveImage: ResponsiveImage;
}

export interface ResponsiveImage {
    alt: null;
    base64: string;
    aspectRatio: number;
    bgColor: string;
    height: number;
    sizes: string;
    src: string;
    srcSet: string;
    title: null;
    webpSrcSet: string;
    width: number;
}

export interface Siteconfig {
    data: Data3;
}

export interface Data3 {
    siteConfig: SiteConfig;
}

export interface SiteConfig {
    title:            string;
    backLink:         string;
    defaultBgColour:  DefaultColour;
    defaultTxtColour: DefaultColour;
    defaultHlColour:  DefaultColour;
    strictColours: boolean;
}

export interface DefaultColour {
    hex: string;
}