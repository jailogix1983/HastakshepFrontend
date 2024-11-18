import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { getCategories } from "../../api/categories";
import { useGlobalState } from "../hooks/useGlobalState";
import { MAIN_MENU, SUB_MENU } from "../context/reducer";
import { Getsubcategories } from "../../api/Subcategories";
import FontAwesome from "../font-awesome/FontAwesome";
import { useRouter } from "next/router";


export default function HomeMainMenu() {

  debugger;
  const [menu, setMenu] = useState([]);
  const { dispatch } = useGlobalState();
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // State to track submenu visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  useEffect(() => {
    let ignore = false;

    async function Load() {
      try {
        const data = await getCategories();

        if (!ignore) {
          setMenu(data);
          dispatch({
            type: MAIN_MENU,
            payload: structuredClone(data),
          });
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
  }, [dispatch]);

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

  const handleClick = async (categoryId, event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
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
      dispatch({
        type: SUB_MENU,
        payload: structuredClone(result),
      });
      setIsSubmenuOpen(true);
      setSelectedCategory(categoryId);
    }
  };

  return (
    <>
      {/* {isLoading && <li className="nav-item w-100">Loading ...</li>} */}

      {menu &&
        menu.length > 0 &&
        menu.slice(0, 10).map((item) => (
          <li
            key={item.category_Id}
            className={`nav-item ${item.subcatStatus === "1" && selectedCategory === item.category_Id
              ? "has-dropdown active"
              : item.subcatStatus === "1"
                ? "has-dropdown"
                : ""
              }`}
            style={{ cursor: "Pointer" }}
            onClick={(e) => handleClick(item.category_Id, e)}
            ref={dropdownRef}
          >
            {/* <Link href="#" className="menu-dropdown" data-toggle="dropdown"> */}
            <span
              className="menu-dropdown"
              data-toggle="dropdown"
            >
              {item.category_name}
              <FontAwesome name={item.icon} />
            </span>
            {/* </Link> */}
            {/* Render submenu only for the selected category */}
            {selectedCategory === item.category_Id && (
              <ul
                className={`submenu ${isSubmenuOpen ? "opened" : ""}`}
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
                        <a>{subItem.subcategory_Name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
    </>
  );
}
