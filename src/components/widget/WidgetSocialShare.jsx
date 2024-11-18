import SocialLink from '../../data/social/SocialLink.json';


const WidgetSocialShare = () => {

  return (
    <div className="sidebar-social-share-widget m-b-xs-40">
      <div className="contact-social-share m-t-xs-30">
        <div className="axil-social-title h5">Follow Us</div>
        <ul className="social-share social-share__with-bg">
          <li>
            <a href="https://www.facebook.com/hastakshephastakshep" target="_blank" rel="noreferrer">
              <i className={SocialLink.fb.icon} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/mediaamalendu" target="_blank" rel="noreferrer">
              <i className={SocialLink.twitter.icon} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@Hastakshepnews" target="_blank" rel="noreferrer">
              <i className={SocialLink.yt.icon} />
            </a>
          </li>
          <li>
            <a href="https://whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t" target="_blank" rel="noreferrer">
              <i className={SocialLink.whatsapp.icon} />
            </a>
          </li>
          <li>
            <a href="https://in.pinterest.com/hastakshep" target="_blank" rel="noreferrer">
              <i className={SocialLink.pinterest.icon} />
            </a>
          </li>
        </ul>
      </div>
      {/* End of .social-share-list */}
      {/* End of .social-share-list-wrapper */}
    </div>
  );
};

export default WidgetSocialShare;
