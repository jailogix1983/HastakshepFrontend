import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        {/* Static Css File  */}
        <link
          rel="stylesheet"
          href={`${process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_BASEPATH ?? ""
            : ""
            }/css/fontawesome-all.min.css`}
        // className="external-link"
        />
        {/* fonts googleapis  */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
          className="external-link"
        />

        {/* Feedify script */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              //setTimeout(function() {
                var feedify = feedify || {};
                window.feedify_options={fedify_url:"https://app.feedify.net/",pkey:"BMf5hGKmqsTWoGvzHifCB6TzLr0dF4EtmCyaESpSazFZkDqmcSNZhSnf6q4WhgJfkYuLQSH2T9tMPv3SVEc8KR0="};
                (function (window, document){
                  function addScript( script_url ){
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = script_url;
                    document.getElementsByTagName('head')[0]?.appendChild(s);
                  }
                  addScript('https://cdn.feedify.net/getjs/feedbackembad-min-3.0.js');
                })(window, document);
             // }, 15000); // Delay in milliseconds
            `,
          }}
          defer
        ></script>
        <script id="feedifysw-script" src="/feedifysw.js" defer></script> */}


        {/* google tagmanager */}
        {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-9V01N2SREJ`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-9V01N2SREJ');
              `,
            }}
          /> */}

        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
      setTimeout(function() {
        var script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9V01N2SREJ';
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9V01N2SREJ');
      }, 15000); // Adjust delay as needed
    `,
          }}
        />

        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
         // setTimeout(function() {
            var script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.defer = true;
            document.head.appendChild(script);
          //}, 15000); // Adjust delay as needed
        `,
          }}
        /> */}


      </Head>
      <body>
        <Main />
        <NextScript />

        {/* Ad Sence */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
               setTimeout(function() {
                var script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9090898270319268';
                script.crossOrigin = 'anonymous';
                script.defer = true;
                document.head.appendChild(script);
               }, 10000); // Adjust delay as needed
            `,
          }}
          defer
        ></script>

      </body>
    </Html>
  );
};

export default Document;
