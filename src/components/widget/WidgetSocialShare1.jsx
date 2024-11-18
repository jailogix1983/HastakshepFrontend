import SocialLink from '../../data/social/SocialLink.json';

const WidgetSocialShare1 = () => {
    return (
        <div className="sidebar-social-share-widget m-b-xs-40">
            <ul className="social-share-list-wrapper">
                <li className="social-share-list text-center perfect-square">
                    <a href="https://www.facebook.com/hastakshephastakshep" className="list-inner bg-color-facebook" target="_blank" rel="noreferrer">
                        <i className={SocialLink.fb.icon} aria-hidden="true" />
                        <span className="sr-only">Facebook</span>
                    </a>
                </li>
                <li className="social-share-list text-center perfect-square">
                    <a href="https://twitter.com/mediaamalendu" className="list-inner bg-color-twitter" target="_blank" rel="noreferrer">
                        <i className={SocialLink.twitter.icon} aria-hidden="true" />
                        <span className="sr-only">Twitter</span>
                    </a>
                </li>
                <li className="social-share-list text-center perfect-square">
                    <a href="https://www.youtube.com/@Hastakshepnews" className="list-inner bg-color-youtube" target="_blank" rel="noreferrer">
                        <i className={SocialLink.yt.icon} aria-hidden="true" />
                        <span className="sr-only">YouTube</span>
                    </a>
                </li>
                <li className="social-share-list text-center perfect-square">
                    <a href="https://whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t" className="list-inner bg-color-pinterest" target="_blank" rel="noreferrer">
                        <i className={SocialLink.whatsapp.icon} aria-hidden="true" />
                        <span className="sr-only">WhatsApp</span>
                    </a>
                </li>
                <li className="social-share-list text-center perfect-square">
                    <a href="https://in.pinterest.com/hastakshep" className="list-inner bg-color-pinterest" target="_blank" rel="noreferrer">
                        <i className={SocialLink.pinterest.icon} aria-hidden="true" />
                        <span className="sr-only">Pinterest</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default WidgetSocialShare1;
