import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pl">
        <Head>
          <meta property="og:url" content="https://www.housekebabpizza.online" />
          <meta property="og:url" content="https://www.housekebabpizza.pl" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="House Kebab & Pizza - Zamów jedzenie online" />
          <meta
            property="og:description"
            content="Najlepsza restauracja z kebabem, pizzą i tureckimi daniami. Szybka dostawa i pyszne jedzenie. Zamów teraz! (Online)"
          />
          <meta property="og:image" content="https://www.housekebabpizza.online/images/house-kebab-pizza.jpeg" />
          <meta property="og:site_name" content="House Kebab & Pizza" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="House Kebab & Pizza - Zamów jedzenie online" />
          <meta
            name="twitter:description"
            content="Najlepsza restauracja z kebabem, pizzą i tureckimi daniami. Szybka dostawa i pyszne jedzenie. Zamów teraz! (Online)"
          />
          <meta name="twitter:image" content="https://www.housekebabpizza.online/images/house-kebab-pizza.jpeg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
