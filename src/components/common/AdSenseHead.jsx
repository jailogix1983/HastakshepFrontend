'use client'
import React, { useEffect } from 'react';

const AdSenseHead = () => {
    useEffect(() => {
        // Ensure that the script is loaded only on the client side
        if (typeof window !== 'undefined') {
            // Push ads on window.adsbygoogle array
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
    }, []);

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='ad-container' style={{ maxWidth: '73rem', backgroundColor: '#F9F9F9' }}>
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-9090898270319268"
                            data-ad-slot="2110738575"
                            data-ad-format="auto"
                            data-full-width-responsive="true"
                        ></ins>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdSenseHead;
