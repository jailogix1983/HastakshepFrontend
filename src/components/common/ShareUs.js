import React from 'react';
import SocialLink from '../../data/social/SocialLink.json';

const ShareUs = ({ data }) => {
    const shareOnFacebook = () => {
        const shareText = encodeURIComponent(`${data?.storyheading} via @mediaamalendu`);
        const urlToShare = `https://hastakshep.com/${data.canonicalUrl.replace("\\", "/")}`;
        const encodedUrl = encodeURIComponent(urlToShare);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${shareText}`, '_blank');
    };

    const shareOnTwitter = () => {
        const shareText = encodeURIComponent(`${data?.storyheading} via @mediaamalendu`);
        const shareURL = encodeURIComponent(`https://www.hastakshep.com/${data?.canonicalUrl.replace("\\", "/")}`);
        const combinedText = `${shareText} ${shareURL}`;
        window.open(`https://twitter.com/intent/tweet?text=${combinedText}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const shareText = encodeURIComponent(`${data.storyheading} via @mediaamalendu`);
        const url = encodeURIComponent(`https://hastakshep.com/${data.canonicalUrl.replace("\\", "/")}`);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}%20${url}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="sidebar-social-share-widget m-b-xs-40">
            <div className="contact-social-share m-t-xs-30">
                <div className="col-md-4 col-sm-12">
                    <div className="axil-social-title h5" style={{ color: '#ac263d' }}>Share:</div>
                    <ul className="social-share social-share__with-bg">
                        <li>
                            <button onClick={shareOnFacebook} style={{ cursor: 'pointer' }} title="Share on Facebook">
                                <i className={SocialLink.fb.icon} aria-hidden="true" />
                                <span className="sr-only">Share on Facebook</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={shareOnTwitter} style={{ cursor: 'pointer' }} title="Share on Twitter">
                                <i className={SocialLink.twitter.icon} aria-hidden="true" />
                                <span className="sr-only">Share on Twitter</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={shareOnWhatsApp} style={{ cursor: 'pointer' }} title="Share on WhatsApp">
                                <i className={SocialLink.whatsapp.icon} aria-hidden="true" />
                                <span className="sr-only">Share on WhatsApp</span>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-md-6 col-sm-12">
                    <a href="https://www.whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t" target="_blank" rel="noreferrer">
                        <img
                            style={{ cursor: 'pointer', marginLeft: '10%' }}
                            src="/images/whatsaplogo.jpg"
                            alt="Join our WhatsApp channel"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShareUs;
