import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateFormat } from "../../utils";
import SocialLink from "../../data/social/SocialLink.json";
import OffcanvasMenu from "./OffcanvasMenu";
import HomeMainMenu from "./HomeMainMenu";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  // Offcanvas Menu
  const [show, setShow] = useState(false);

  // Mobile Menu Toggle
  const [mobileToggle, setMobileToggle] = useState(false);
  // Main Menu Toggle
  const menuRef = useRef();

  const toggleDropdownMenu = () => {
    const dropdownSelect = menuRef.current.childNodes;
    let dropdownList = [];

    for (let i = 0; i < dropdownSelect.length; i++) {
      const element = dropdownSelect[i];
      if (element.classList.contains("has-dropdown")) {
        dropdownList.push(element);
      }
    }

    dropdownList.forEach((element) => {
      element.children[0].addEventListener("click", () => {
        if (element.classList.contains("active")) {
          element.classList.remove("active");
          element.childNodes[1]?.classList.remove("opened");
        } else {
          dropdownList.forEach((submenu) => {
            if (element !== submenu) {
              submenu.classList.remove("active");
              submenu.childNodes[1]?.classList.remove("opened");
            } else {
              submenu.classList.add("active");
              submenu.childNodes[1]?.classList.add("opened");
            }
          });
        }
      });
    });
  };

  useEffect(() => {
    toggleDropdownMenu();
  }, []);

  const MobileMenuToggler = () => {
    setMobileToggle(!mobileToggle);
    const HtmlTag = document.querySelector("html");
    const menuSelect = document.querySelectorAll(".main-navigation li");

    if (HtmlTag.classList.contains("main-menu-opened")) {
      HtmlTag.classList.remove("main-menu-opened");
    } else {
      setTimeout(() => {
        HtmlTag.classList.add("main-menu-opened");
      }, 800);
    }

    menuSelect.forEach((element) => {
      element.addEventListener("click", function () {
        if (!element.classList.contains("has-dropdown")) {
          HtmlTag.classList.remove("main-menu-opened");
          setMobileToggle(false);
        }
      });
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <OffcanvasMenu ofcshow={show} ofcHandleClose={handleClose} />
      <header className="page-header">
        <div className="header-top bg-grey-dark-one">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md">
                <ul className="header-top-nav list-inline justify-content-center justify-content-md-start">
                  <li className="current-date">{dateFormat()}</li>

                  <li>
                    <Link href="/about-us">
                      <a>AboutUs</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a>ContactUs</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-auto">
                <ul className="ml-auto social-share header-top__social-share">
                  <li>
                    <Link
                      href="https://www.facebook.com/hastakshephastakshep"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={SocialLink.fb.icon} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://twitter.com/mediaamalendu"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={SocialLink.twitter.icon} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@Hastakshepnews"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={SocialLink.yt.icon} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={SocialLink.whatsapp.icon} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://in.pinterest.com/hastakshep"
                      target="_blank"
                    >
                      <i className={SocialLink.pinterest.icon} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar bg-white">
          <div className="container">
            <div className="navbar-inner">
              <div className="row gap-0">
                <div className="col-lg-1 p-0 brand-logo-container">
                  <Link href="/">
                    <a>
                      <Image
                        src="/images/HastakshepImages/hastakshepLogo.jpg"
                        alt="brand-logo"
                        width={120}
                        height={100}
                      />
                    </a>
                  </Link>
                </div>

                <div className="d-none col-lg-11 p-0 main-nav-wrapper d-lg-flex align-items-center">
                  <div style={{ width: "95%" }}>
                    <ul
                      className="main-navigation list-inline "
                      ref={menuRef}
                    >
                      {/* py-5 w-100 */}
                      <HomeMainMenu />
                    </ul>
                  </div>

                  <div style={{ width: "5%" }} className="d-none d-md-block">
                    <Link href="/video">
                      <Image
                        src="/images/HastakshepImages/DB-Live-Logo.png"
                        alt="footer logo"
                        className="footer-logo"
                        width={40}
                        height={30}
                        style={{ borderRadius: "5px", cursor: "pointer" }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="navbar-extra-features ml-auto">
                <Link href="/search" target="_blank">
                  <button className="nav-search-field-toggler" aria-label="Toggle Search Field" target="_blank">
                    <i className="far fa-search" />
                  </button>
                </Link>

                <button className="side-nav-toggler" aria-label="Toggle Side Navigation" onClick={handleShow}>
                  <span />
                  <span />
                  <span />
                </button>
              </div>
              {/* <div
                className={`main-nav-toggler d-block d-lg-none ${mobileToggle ? "expanded" : "dffddgfgfg"
                  }`}
              >
                <div className="toggler-inner" onClick={MobileMenuToggler}>
                  <span />
                  <span />
                  <span />
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
