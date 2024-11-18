import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialLink from "../../data/social/SocialLink.json";
import { getFooterCategories } from "../../api/FooterApi";
// import FooterVideo from "./FooterVideo";
import FooterNewsCard from "./FooterNewsCard";
import PostSkeleton from "../skeleton/PostSkeleton";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function Load() {
      try {
        const data = await getFooterCategories();
        setFooterData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    Load();
  }, []);
  if (isLoading) {
    return <PostSkeleton limit={3} />;
  }

  if (footerData.length === 0) {
    return <h5>No data found!</h5>;
  }

  return (
    <>
      <footer
        className="page-footer bg-grey-dark-key"
        style={{ marginTop: "20px" }}
      >
        <div className="container">
          <div className="footer-top">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-6">
                <div className="footer-widget">
                  <h2 className="footer-widget-title">About Us</h2>
                  <ul className="footer-nav">
                    <li>
                      <a href="https://www.hastakshep.com/">Hastakshep.com</a>
                    </li>
                    <li>Deshbandhu Complex, Ramsagar Para</li>
                    <li>
                      <i className="fa fa-map" style={{ color: "white" }}></i>{" "}
                      c/o Deshbandhu C 56/12 Sector-62 NOIDA(UP)
                    </li>
                    <li>
                      {" "}
                      <i className="fa fa-phone" style={{ color: "white" }}></i>{" "}
                      <a href="tel:+919312873760">+91-9312873760</a>
                    </li>
                    <li>
                      <i className="fa fa-envelope" style={{ color: "white" }}></i>{" "}
                      <a
                        href="mailto:amalendu.upadhyay@gmail.com"
                        style={{ overflowWrap: "break-word" }}
                      >
                        amalendu.upadhyay@gmail.com
                      </a>
                    </li>
                  </ul>
                  {/* End of .footer-nav */}
                </div>
                {/* End of .footer-widget */}
              </div>
              {/* End of .col-lg-3 */}
              <div className="col-lg-4 col-md-6 col-6">
                <div className="footer-widget">
                  <h2 className="footer-widget-title">News</h2>
                  <ul className="footer-nav">
                    <li>
                      <FooterNewsCard />
                    </li>

                  </ul>
                  {/* End of .footer-nav */}
                </div>
                {/* End of .footer-widget */}
              </div>
              {/* End of .col-lg-3 */}
              {/* <div className="col-lg-3 col-md-6 col-6">
                <div className="footer-widget">
                  <h2 className="footer-widget-title">Watch+Listen</h2>
                  <ul className="footer-nav">
                    <li> */}
                      {/* <FooterVideo /> */}
                    {/* </li> */}

                  {/* </ul> */}
                  {/* End of .footer-nav */}
                {/* </div> */}
                {/* End of .footer-widget */}
              {/* </div> */}
              {/* End of .col-lg-3 */}
              <div className="col-lg-4 col-md-6 col-6">
                <div className="footer-widget">
                  <h2 className="footer-widget-title">Categories</h2>

                  <ul
                    className="footer-nav"
                    style={{ display: "flex", flexWrap: "wrap" }}
                  >
                    {footerData.slice(0, 15).map((data, index) => (
                      <li
                        style={{
                          margin: "5px",
                          background: "#fff",
                          padding: "0 5px 0 5px",
                        }}
                        key={index}
                      >
                        <Link href={`/${data?.englishurl}/${data?.englishurl}`}>
                          <a>{data.category_name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* End of .footer-nav */}
                </div>
                {/* End of .footer-widget */}
              </div>
              {/* End of .col-lg-3 */}
            </div>
            {/* End of .row */}
          </div>
          {/* End of .footer-top */}
          <div className="footer-mid">
            <div className="row align-items-center">
              <div className="col-md">
                <div className="footer-logo-container">
                  <Link href="/">
                    <a>
                      <Image
                        src="/images/HastakshepImages/hastakshepLogo.jpg"
                        alt="hastakshepLogo.jpg"
                        className="footer-logo"
                        width={86}
                        height={50}
                        style={{ borderRadius: "5px" }}
                      />
                    </a>
                  </Link>
                </div>
              </div>

              {/* End of .col-md-6 */}
              <div className="col-md-auto">
                <div className="footer-social-share-wrapper">
                  <div className="footer-social-share">
                    <div className="axil-social-title">Find us here</div>
                    <ul className="social-share social-share__with-bg">
                      <li>
                        <a
                          href="https://www.facebook.com/hastakshephastakshep"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Facebook"
                        >
                          <i className={SocialLink.fb.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/mediaamalendu"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Twitter"
                        >
                          <i className={SocialLink.twitter.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/@Hastakshepnews"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="YouTube"
                        >
                          <i className={SocialLink.yt.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="WhatsApp"
                        >
                          <i className={SocialLink.whatsapp.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://in.pinterest.com/hastakshep"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Pinterest"
                        >
                          <i className={SocialLink.pinterest.icon} aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of .footer-social-share-wrapper */}
              </div>
              {/* End of .col-md-6 */}
            </div>
            {/* End of .row */}
          </div>
          <div className="footer-bottom">
            <ul
              className="footer-bottom-links"
              style={{
                padding: "15px",
                fontSize: "15px",
                color: "white",
                listStyle: "none",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <li>
                <Link href="/about-us">
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer">
                  <a>Disclaimer</a>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-condition">
                  <a>Terms and Condition</a>
                </Link>
              </li>
              <li>
                <Link href="/aaj-tak-live">
                  <a>Aaj Tak Live</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a>Contact Us</a>
                </Link>
              </li>
            </ul>
            {/* End of .footer-bottom-links */}
            <p
              className=""
              style={{
                textAlign: "center",
                marginBottom: "0",
                fontSize: "15px",
                color: "white",
              }}
            >
              © {new Date().getFullYear()}. All rights reserved by Hastakshep.com
            </p>
          </div>

          {/* End of .footer-mid */}

          {/* End of .footer-bottom */}
        </div>

      </footer>
    </>
  );
};

export default Footer;
