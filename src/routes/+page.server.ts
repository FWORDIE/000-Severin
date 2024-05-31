import {datoToken} from "$env/static/private";

export async function load({ params }) {
    const query = `
        query {
            allAlbums (orderBy: date_DESC) {
              id
              title
              _status
              _firstPublishedAt
              pictures {
                alt
                responsiveImage {
                  alt
                  base64
                  aspectRatio
                  bgColor
                  height
                  sizes
                  src
                  srcSet
                  title
                  webpSrcSet
                  width
                }
              }
            }
            siteConfig {
                title
                backLink
                defaultBgColour {
                  hex
                }
                defaultTxtColour {
                  hex
                }
                    defaultHlColour {
                  hex
                }
              }
          }
    `;

    const response = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${datoToken}`,
        },
        body: JSON.stringify({ query }),
    });
    const json = await response.json();

    const returnable = json.data

    return {
        data: returnable
    };
}
