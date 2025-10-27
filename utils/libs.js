import dayjs from "dayjs";
const CryptoJS = require("crypto-js");

export function CryptoFetcher(data) {
  try {
    const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;
    const decrypted = CryptoJS.AES.decrypt(data, secretPassphrase).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (err) {
    console.log(err);
  }
}

export function converDayJsDate(value) {
  return dayjs(value).format("DD-MMM-YYYY");
}

export function convertTime(value) {
  return dayjs(value).format("MMM DD, YYYY  hh:mm A");
}

export function getHours(value) {
  const givenTimestamp = new Date(value);
  const currentTime = new Date();
  const timeDifferenceMs = currentTime - givenTimestamp;

  const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));
  const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
  const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);

  if (timeDifferenceDays >= 1) {
    return `${timeDifferenceDays} ${
      timeDifferenceDays < 2 ? "day ago" : "days ago"
    }`;
    // return dayjs(value).format("MMM DD, YYYY");
  } else if (timeDifferenceHours >= 1) {
    const remainingMinutes = timeDifferenceMinutes % 60;
    return `${timeDifferenceHours} ${
      timeDifferenceHours < 2 ? "hr" : "hrs"
    } ${remainingMinutes} ${remainingMinutes < 2 ? "min ago" : "mins ago"}`;
  } else {
    return `${timeDifferenceMinutes} ${
      timeDifferenceMinutes < 2 ? "min ago" : "mins ago"
    }`;
  }
}

export async function shareCards(val, shareUrl, text) {
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        `${window.location.origin}/article/${shareUrl}`
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (text === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${window.location.origin}/article/${shareUrl}`
        )}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(
          `${window.location.origin}/article/${shareUrl}`
        )}`,
        "_blank"
      );
    }
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        `${window.location.origin}/article/${shareUrl}`
      )}`,
      "_blank"
    );
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      window.location.href
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}&title=News Tamil`,
      "_blank"
    );
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        `${window.location.origin}/article/${shareUrl}`
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}

export function shareNews(val, text) {
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  }else  if (val === "tk") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (text === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          window.location.href
        )}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(
          window.location.href
        )}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        window.location.href
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      window.location.href
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        window.location.href
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export function shareCardSection(val, text, url) {
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  } else if (val === "wp") {
    window.open(
      `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      "_blank"
    );
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        url
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      url
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  }
}

export function shareNewsFlipper(val, text, url, device) {
  const articleUrl = `${window.location.origin}/article/${url}`;
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (device === "mobile") {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      articleUrl
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  }
}

export function sharePhotos(val, text, url, device) {
  const articleUrl = `${window.location.origin}/photos/${url}`;
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (device === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      articleUrl
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        articleUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}

export function shareWebstories(val, text, url, device) {
  const articleUrl = `${window.location.origin}/web-story/${url}`;
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (device === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      articleUrl
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        articleUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}

export function shareShorts(val, text, url, device) {
  const articleUrl = `${url}`;
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (device === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      articleUrl
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        articleUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}

export function shareVideos(val, text, url, device) {
  const articleUrl = `${url}`;
  if (val === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "wp") {
    if (device === "mobile") {
      window.open(
        `https://api.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    } else {
      window.open(
        `https://web.whatsapp.com/send?text=${encodeURIComponent(articleUrl)}`,
        "_blank"
      );
    }
  } else if (val === "lk") {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        articleUrl
      )}&title=newstamil`,
      "_blank"
    );
  } else if (val === "x") {
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        articleUrl
      )}`,
      "_blank"
    );
  } else if (val === "mail") {
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check+this+out&body=${encodeURIComponent(
      articleUrl
    )}&tf=1`;
    window.open(mailtoUrl, "_blank");
  } else if (val === "insta") {
    window.open(`https://www.instagram.com/newstamiltv24x7/`, "_blank");
  } else if (val === "td") {
    window.open(`https://www.threads.net/@newstamiltv24x7`, "_blank");
  } else if (val === "yt") {
    window.open("https://www.youtube.com/@NewsTamil24X7TV", "_blank");
  } else if (val === "tele") {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        articleUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
}
