import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords, canonicalUrl, schema }) {
    const defaultTitle = "VR SolarTech | Premium Solar Solutions";
    const finalTitle = title ? `${title} | VR SolarTech` : defaultTitle;
    const url = canonicalUrl ? `https://vrsolarstech.in${canonicalUrl}` : "https://vrsolarstech.in";

    return (
        <Helmet>
            <title>{finalTitle}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}

            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={finalTitle} />
            {description && <meta property="og:description" content={description} />}
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            {description && <meta name="twitter:description" content={description} />}

            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
        </Helmet>
    );
}
