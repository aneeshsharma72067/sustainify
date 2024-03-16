/**
 * Calculates the time elapsed since a given date and returns a string representation of the time ago.
 * @param {Date} date - The date to calculate the time ago from.
 * @returns {string} A string representation of the time ago.
 */
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval >= 1) {
    return `${Math.round(interval)} years ago`;
  }

  interval = seconds / 2592000;
  if (interval >= 1) {
    return `${Math.round(interval)} months ago`;
  }

  interval = seconds / 86400;
  if (interval >= 1) {
    return `${Math.round(interval)} days ago`;
  }

  interval = seconds / 3600;
  if (interval >= 1) {
    return `${Math.round(interval)} hours ago`;
  }

  interval = seconds / 60;
  if (interval >= 1) {
    return `${Math.round(interval)} minutes ago`;
  }

  return `${Math.floor(seconds)} second${
    Math.floor(seconds) === 1 ? "" : "s"
  } ago`;
}

/**
 * Capitalizes the first letter of a given word.
 * @param {string} str - The word to capitalize.
 * @returns {string} The capitalized word.
 */
const capitalizeWord = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export { timeAgo, capitalizeWord };
