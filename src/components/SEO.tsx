import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  communityTitle?: string;
  image?: string;
  canonical?: string;
  shouldExcludeTitleSuffix?: boolean;
  shouldIndexPage?: boolean;
}

export function SEO({
  title,
  description,
  communityTitle,
  image,
  canonical,
  shouldExcludeTitleSuffix = false,
  shouldIndexPage = true,
}: SEOProps): JSX.Element {
  const pageSuffix = communityTitle ? ` | ${communityTitle}` : ' | Headshare';
  const pageTitle = shouldExcludeTitleSuffix ? title : `${title} ${pageSuffix}`;
  const pageImage = image ? `/${image}` : null;

  const canonicalUrl = `https://headshare.app/${canonical || ''}`;

  return (
    <Head data-testid="seo-atom">
      <title>{pageTitle}</title>
      {description && (
        <meta
          data-testid="seo-description"
          name="description"
          content={description}
        />
      )}
      {pageImage && (
        <meta data-testid="seo-image" name="image" content={pageImage} />
      )}

      {!shouldIndexPage && (
        <meta
          data-testid="seo-index-page"
          name="robots"
          content="noindex,nofollow"
        />
      )}

      <link rel="canonical" href={canonicalUrl} />

      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#2F2C77" />
      <meta name="msapplication-TileColor" content="#2F2C77" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:url" content={canonicalUrl} />
      {pageImage && <meta property="og:image" content={pageImage} />}
      {pageImage && <meta property="og:image:secure_url" content={pageImage} />}
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      {/* revisar para identificar as dimensões corretas da imagem */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@heali.me" />
      <meta name="twitter:creator" content="@heali.me" />
      {pageImage && <meta name="twitter:image" content={pageImage} />}
      {pageImage && <meta name="twitter:image:src" content={pageImage} />}
      <meta name="twitter:image:alt" content="Thumbnail" />
      {/* revisar para identificar as dimensões corretas da imagem */}
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="620" />
    </Head>
  );
}
