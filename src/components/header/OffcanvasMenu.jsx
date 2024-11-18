import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Offcanvas from "react-bootstrap/Offcanvas";
import SocialLink from "../../data/social/SocialLink.json";
import { getCategories } from "../../api/categories";
import { debounce } from "../../utils";
import CustomScrollbar from "../scrollbar/CustomScrollbar";
import Image from "next/image";
import { Getsubcategories } from "../../api/Subcategories";

const OffcanvasMenu = ({ ofcshow, ofcHandleClose }) => {
  const [Offcanvasmenu, setOffcanvasMenu] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // State to track submenu visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const [subCategories, setSubCategories] = useState([]);

  const handleInputChange = debounce((value) => {
    setSearchValue(value);
  });

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategories();

        if (!ignore) {
          setOffcanvasMenu(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    Load();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSubmenuOpen(false); // Close the submenu if clicked outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleClick = async (categoryId) => {
    // If the same category is clicked again, remove active class and close submenu
    if (selectedCategory === categoryId) {
      setIsSubmenuOpen(false);
      setSelectedCategory(null);
      return;
    }

    const result = await Getsubcategories(categoryId);
    if (!result || result.length === 0) {
      for (let i = 0; i < menu.length; i++) {
        if (categoryId == menu[i].category_Id) {
          router.push(`/${menu[i].englishurl.replace(/\s+/g, "-")}`);
        }
      }
    } else {
      setSubCategories(result);
      setIsSubmenuOpen(true);
      setSelectedCategory(categoryId);
    }
  };

  return (
    <Offcanvas
      show={ofcshow}
      onHide={ofcHandleClose}
      placement="end"
      className="offcanvas-menu"
    >
      <Offcanvas.Header
        closeButton
        className="close-offcanvasmeu"
      ></Offcanvas.Header>
      <CustomScrollbar>
        <div className="side-nav">
          <div className="side-nav-inner nicescroll-container">
            <form action="#" className="side-nav-search-form">
              <Link href="/video">
                <a>
                  <Image
                    src="/images/HastakshepImages/DB-Live-Logo.png"
                    alt="DB-Live-Logo.png"
                    className="footer-logo"
                    width={40}
                    height={30}
                    style={{ borderRadius: "5px" }}
                  />
                </a>
              </Link>
              <div className="form-group search-field">
                <input
                  onChange={(e) => handleInputChange(e.target.value)}
                  type="text"
                  className="search-field"
                  name="search-field"
                  placeholder="Search..."
                  value={searchValue} // Set the input value to the state value
                />
                <button className="side-nav-search-btn">
                  <i className="fas fa-search" />
                </button>
              </div>
              {/* End of .side-nav-search-form */}
            </form>
            {/* End of .side-nav-search-form */}
            <div className="side-nav-content">
              <div className="row ">
                <div
                  style={{ maxHeight: "60vh" }}
                  className="col-lg-6 overflow-y-auto"
                >
                  {isLoading && <h6>Loading...</h6>}
                  {Offcanvasmenu.length === 0 && <h5>No data found!</h5>}
                  {Offcanvasmenu && Offcanvasmenu.length > 0 && (
                    <ul className="main-navigation side-navigation list-inline flex-column">
                      {Offcanvasmenu.filter((menu) => {
                        if (searchValue) {
                          return menu.category_name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase());
                        } else {
                          return true;
                        }
                      }).map((data, index) => (
                        <li
                          key={index}
                          className={`nav-item ${data.subcatStatus === "1" &&
                            selectedCategory === data.category_Id
                            ? "has-dropdown active"
                            : data.subcatStatus === "1"
                              ? "has-dropdown"
                              : ""
                            }`}
                        >
                          {/* <Link href={`/${data.englishUrl}`}>
                            {data.category_name}
                          </Link> */}
                          <Link
                            href="#"
                            className="menu-dropdown"
                            data-toggle="dropdown"
                          >
                            <a onClick={() => handleClick(data.category_Id)}>
                              {data.category_name}
                            </a>
                          </Link>
                          {/* Render submenu only for the selected category */}
                          {selectedCategory === data.category_Id && (
                            <ul
                              className={`submenu ${isSubmenuOpen ? "opened" : ""
                                }`}
                              role="menu"
                              style={{ maxHeight: "200px", overflowY: "auto" }}
                            >
                              {subCategories.map((subItem, index) => {
                                const initialUrl = `/${subItem.englishurl.replace(
                                  /\s+/g,
                                  "-"
                                )}`;
                                const finalUrl = subItem.englishurl
                                  ? `/${subItem.engurl.replace(/\s+/g, "-")}${initialUrl}`
                                  : initialUrl;
                                return (
                                  <li key={index}>
                                    <Link href={finalUrl.replace(/\s+/g, " ")}>
                                      {subItem.subcategory_Name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* End of .main-navigation */}
                </div>

                {/* End of  .col-md-6 */}
                <div className="col-lg-6">
                  <div className="axil-contact-info-inner">
                    <h5 className="h5 m-b-xs-10">Contact Information</h5>
                    <div className="axil-contact-info">
                      <address className="address">
                        <p className="m-b-xs-30  mid grey-dark-three ">
                          Deshbandhu Complex, Ramsagar Para
                          <br />
                          c/o Deshbandhu C 56/12 Sector-62 NOIDA(UP)
                        </p>
                        <div className="h5 m-b-xs-5">Whatsapp</div>
                        <div>
                          <a className="tel">
                            <i className="fa fa-phone" />
                            +91-9312873760
                          </a>
                        </div>
                        <div className="h5 m-b-xs-5">Email</div>
                        <div>
                          <i className="fa fa-envelope"></i>{" "}
                          <a href="mailto:rajeevrsri@gmail.com">
                            amalendu.upadhyay@gmail.com
                          </a>
                        </div>
                      </address>
                      {/* End of address */}
                      <div className="contact-social-share m-t-xs-30">
                        <div className="axil-social-title h5">Follow Us</div>
                        <ul className="social-share social-share__with-bg">
                          <li>
                            <a
                              href="https://www.facebook.com/hastakshephastakshep"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className={SocialLink.fb.icon} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://twitter.com/mediaamalendu"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className={SocialLink.twitter.icon} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.youtube.com/@Hastakshepnews"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className={SocialLink.yt.icon} />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://whatsapp.com/channel/0029Va5m5VI7dmejYIIucP0t"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className={SocialLink.whatsapp.icon} />
                            </a>
                          </li>
                          <li>
                            <a
                              href=" https://in.pinterest.com/hastakshep"
                              target="_blank"
                            >
                              <i className={SocialLink.pinterest.icon} />
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* End of .contact-shsdf */}
                    </div>
                    {/* End of .axil-contact-info */}
                  </div>
                  {/* End of .axil-contact-info-inner */}
                </div>
              </div>
              {/* End of .row */}
            </div>
          </div>
        </div>
      </CustomScrollbar>

      {/* End of .side-nav-inner */}
    </Offcanvas>
  );
};

export default OffcanvasMenu;
