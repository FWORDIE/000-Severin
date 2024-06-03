import {datoToken} from "$env/static/private";

export async function load({ params }) {
    const query = `
        query {
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
                strictColours
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
