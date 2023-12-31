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

const capitalizeWord = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export { timeAgo, capitalizeWord };
