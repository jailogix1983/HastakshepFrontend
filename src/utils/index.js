import { DateTime } from "luxon";

const slugify = function (text) {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const removeDuplicates = function (originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
};

const SortingByDate = function (posts) {
  return posts.sort((post1, post2) => {
    const beforeDate = DateTime.fromFormat(post1.date, "LLL dd yyyy");
    const afterDate = DateTime.fromFormat(post2.date, "LLL dd yyyy");
    return afterDate - beforeDate;
  });
};

const dateFormat = function (utcDate) {
  let date = new Date();

  if (utcDate) date = new Date(utcDate);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const formatDate = day + " " + month + "," + " " + year;

  return formatDate;
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay || 500);
  };
};

const extractAlt = (ImagePath) => {
  const parts = ImagePath.split("_");
  const fileNameWithExtension = parts[parts.length - 1];
  return fileNameWithExtension;
};

const extractAltVideo = (ImagePathVideo) => {
  const videoParts = ImagePathVideo.split("/");
  const VideofileNameWithExtension = videoParts[videoParts.length - 1];
  return VideofileNameWithExtension;
};

function formatAltString(categoryName, keywords) {
  const sanitizedCategoryName = (categoryName || "").trim();
  const sanitizedKeywords = (keywords || "")
    .split(", ")
    .map((keyword) => keyword.trim())
    .filter((keyword) => keyword !== "")
    .join("-");

  const finalString = sanitizedKeywords.replace(/,-$/, "");

  return `${sanitizedCategoryName}-${finalString}`;
}

export {
  slugify,
  removeDuplicates,
  SortingByDate,
  dateFormat,
  debounce,
  extractAlt,
  extractAltVideo,
  formatAltString,
};

// utils.js
export function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

