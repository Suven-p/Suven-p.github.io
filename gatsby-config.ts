import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `portfolio`,
    description: `A personal project for portfolio`,
    siteUrl: `https://suvenpandey.co`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://suven.com.np`,
        stripQueryString: true,
      },
    },
    "gatsby-plugin-emotion",
    "gatsby-plugin-image",
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.svg"
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allFile(filter: {sourceInstanceName: {eq: "pages"}}) {
            edges {
              node {
                name
                modifiedTime
              }
            }
          }
        }`,
        resolvePages: ({
          allSitePage: { nodes: sitePages },
          allFile: { edges: pageFiles }
        }) => {
          return sitePages.map(page => {
            const pageFile = pageFiles.find(({ node }) => {
              const fileName = node.name === 'index' ? '/' : `/${node.name}/`;
              return page.path === fileName;
            });

            return { ...page, lastModified: pageFile?.node?.modifiedTime };
          });
        },
        serialize: ({ path, lastModified }) => {
          return {
            url: path,
            lastmod: lastModified
          };
        },
        createLinkInHead: true,
      },
    }
  ]
};

export default config;
