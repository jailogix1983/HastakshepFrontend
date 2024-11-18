import SocialLink from "../../data/social/SocialLink.json";

const ContactInfo = () => {
  return (
    <div className="axil-contact-info-wrapper p-l-md-45 m-b-xs-30">
      <div className="axil-contact-info-inner">
        <h2 className="h4 m-b-xs-10">Contact Information</h2>
        <div className="axil-contact-info">
          <address className="address">
            <p className="mid m-b-xs-30">
              Amalendu Upadhyaya
              <br />
              Editor hastakshep.com c/o Deshbandhu
            </p>
            <p>
              C-56/12, 2nd Floor, opposite Baba Balaknath Temple, Sector 62,
              Noida, Uttar Pradesh 201309
            </p>
            <div className="h5 m-b-xs-10">
              We&apos;re Available 24/ 7. Whatsapp Only.
            </div>
            <div>
              <a className="tel">+91-9312873760.</a>
            </div>
            <div>
              <a className="email">
                <i
                  className="fa fa-envelope"
                  style={{ color: "rgb(0, 110, 229)" }}
                ></i>{" "}
                <a>Mail us – amalendu.upadhyay@gmail.com</a>
              </a>
            </div>
          </address>
          {/* End of address */}
          <div className="contact-social-share m-t-xs-30">
            <div className="axil-social-title h5">Follow Us</div>
            <ul className="social-share social-share__with-bg">
              <li>
                <a href="https://www.facebook.com/hastakshephastakshep">
                  <i className={SocialLink.fb.icon} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/mediaamalendu">
                  <i className={SocialLink.twitter.icon} />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Hastakshepnews">
                  <i className={SocialLink.yt.icon} />
                </a>
              </li>
              <li>
                <a
                  href="https://in.pinterest.com/hastakshep"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={SocialLink.pinterest.icon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
