import Head from 'next/head'

const HeadMeta = ({ metaTitle }) => {
    return (
        <Head>
            {/* Basic metas */}
            <meta charSet="utf-8" />
            <meta name="robots" content="follow" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="description" content="Hastakshep" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            {/* <meta property="og:url" content="https://www.hastakshep.com/" />{" "}
            <link rel="canonical" href="https://www.hastakshep.com/" />{" "}
            <link rel="amphtml" href="https://www.hastakshep.com/" />{" "} */}
            <title>{`${metaTitle ? metaTitle : "hastakshep"} || hastakshep - हस्तक्षेप `}</title>
            <link rel="icon" type="image/x-icon" href={`${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? '' : ''}/favicon.ico`} />
        </Head>
    );
}

export default HeadMeta;