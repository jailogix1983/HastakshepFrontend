import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import HeadMeta from "../../components/common/HeadMeta";
import Breadcrumb from "../../components/common/Breadcrumb";
import { debounce, range } from "../../utils"; // Import range function
import { getSearchResult } from "../../api/getSearchResult";
import PostSkeleton from "../../components/skeleton/PostSkeleton";
import NewsCard from "../../components/common/NewsCard";
import moment from "moment";
import CustomPagination from "../../components/pagination/CustomPagination";
import Link from "next/link";
import Footer from "../../components/footer/Footer";
import DatePicker from "react-datepicker";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  console.log("searchValue", searchValue);
  const [startDate, setStartDate] = useState(null); // Set initial startDate to null
  const [endDate, setEndDate] = useState(null); // Set initial endDate to null
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Add state for selected category
  const years = range(2010, new Date().getFullYear(), 1);
  const limit = 10;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        if (searchValue == null || searchValue === "") {
          setResult([]);
          setTotalCount(0); // Reset total count if search value is empty
          setIsLoading(false);
          return;
        }
        setResult([]);
        const data = await getSearchResult({
          searchText: searchValue,
          searchCritria: searchValue,
          startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : "",
          endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : "",
          pageNo: currentPage,
          recordCount: limit,
          SearchMode: selectedCategory // Include the selected category in the query
        });

        setResult(data);
        setTotalCount(data[0].totalCount);

        // Calculate total count from the fetched data
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchValue, startDate, endDate, selectedCategory, currentPage, limit]); // Add selectedCategory to the dependency array

// Reset currentPage to 1 when selectedCategory changes
useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setCurrentPage(1);

  };

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };


  return (
    <>
      <HeadMeta metaTitle="Search Page" />
      <Header />
      <Breadcrumb aPage="search" />

      <div className="banner banner__default bg-grey-light-three">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="post-title-wrapper">
                <h2 className="m-b-xs-0 axil-post-title hover-line text-capitalize">
                  Search
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <form
              onSubmit={handleSubmit}
              className="search-form"
              style={{ display: "flex" }}
            >
              <input
                onChange={(e) => handleInputChange(e.target.value)}
                type="text"
                className="search-field"
                placeholder="Search Here..."
                value={inputValue}
              />
              <i
                className="far fa-search"
                style={{
                  marginLeft: "-30px",
                  position: "relative",
                  zIndex: 2,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  backgroundColor: "#002866",
                  padding: "15px",
                }}
                target="_blank"
                onClick={handleSubmit}
              />
            </form>
          </div>

          <div className="col-lg-6 mt-3 mt-lg-0">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              placeholderText="Start Date - End Date"
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={decreaseMonth}
                    disabled={prevMonthButtonDisabled}
                  >
                    {"<"}
                  </button>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={increaseMonth}
                    disabled={nextMonthButtonDisabled}
                  >
                    {">"}
                  </button>
                </div>
              )}
              selected={startDate}
              onChange={onDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange // Enable range selection
              isClearable // Allow clearing the date range
            />
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-lg-6">
            <form>
              <div onChange={handleCategoryChange}>
                <input
                  type="radio"
                  id="1"
                  name="searchdata"
                  value="all"
                  checked={selectedCategory === "all"}
                  onChange={handleCategoryChange} // Add onChange handler
                />
                <label htmlFor="1">All</label>

                <input
                  type="radio"
                  id="2"
                  name="searchdata"
                  value="heading"
                  checked={selectedCategory === "heading"}
                  onChange={handleCategoryChange} // Add onChange handler
                />
                <label htmlFor="2">Heading</label>

                <input
                  type="radio"
                  id="3"
                  name="searchdata"
                  value="fullstory"
                  checked={selectedCategory === "fullstory"}
                  onChange={handleCategoryChange} // Add onChange handler
                />
                <label htmlFor="3">Fullstory</label>

                <input
                  type="radio"
                  id="4"
                  name="searchdata"
                  value="author"
                  checked={selectedCategory === "author"}
                  onChange={handleCategoryChange} // Add onChange handler
                />
                <label htmlFor="4">Author</label>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="random-posts section-gap">
        <div className="container">
          <div className="row">
            {isLoading && (
              <section className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <PostSkeleton limit={5} />
                  </div>
                  <div className="col-lg-6">
                    <PostSkeleton limit={5} />
                  </div>
                </div>
              </section>
            )}
            {result && result.length > 0 && (
              <>
                <CustomPagination
                  dataLength={totalCount}
                  limit={limit}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  searchValues={searchValue}
                />
                <br />
                <br />
                <br />
              </>
            )}
            {searchValue.length !== 0 && (
              <>
                {!isLoading && result.length === 0 && <h1>No result found!</h1>}
              </>
            )}
            {result &&
              result.length > 0 &&
              result.map((data) => (
                <React.Fragment key={data.storyid}>
                  <div className="col-lg-6">
                    <NewsCard data={data} />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
