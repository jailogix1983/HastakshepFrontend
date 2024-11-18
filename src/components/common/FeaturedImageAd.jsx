'use client'
import React, { useEffect } from 'react';

const FeaturedImageAd = () => {
    useEffect(() => {
        // Ensure that the script is loaded only on the client side
        if (typeof window !== 'undefined') {
            // Push ads on window.adsbygoogle array
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', backgroundColor: 'rgb(249 249 249)', margin: "20px 0 0 0" }}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-9090898270319268"
                data-ad-slot="7063999973"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default FeaturedImageAd;