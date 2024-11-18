'use client'
import React, { useEffect } from 'react';

const AdSenseSidebar = () => {
    useEffect(() => {
        // Ensure that the script is loaded only on the client side
        if (typeof window !== 'undefined') {
            // Push ads on window.adsbygoogle array
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <div style={{ backgroundColor: "rgb(249 249 249)", width: "100%", margin: "20px 0 20px 0" }}>
            {/* phaddalocom_sidebar-b_AdSense2_1x1_as */}
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-9090898270319268"
                data-ad-slot="9704504827"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdSenseSidebar;