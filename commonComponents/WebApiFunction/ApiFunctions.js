import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Increased timeout from 15s to 60s to allow backend queries time to complete
// MongoDB queries on large collections can be slow, need substantial buffer
axios.defaults.timeout = 60000;

export const getHomeMenuApi = async () => {
  return await axios
    .get(`${baseURL}/api/v1/web/menus/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeMenuApiList = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/menus/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllNewsList = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeTopSection = async (body) => {
  try {
    const res = await axios.post(`${baseURL}/api/v1/web/news/home`, body);
    return res.data;
  } catch (err) {
    console.error("getHomeTopSection failed:", err?.message);
    return null; // explicit, predictable failure value
  }
};

// CryptoFetcher — guard against undefined/non-string input
export function CryptoFetcher(data) {
  if (!data || typeof data !== "string") return [];
  try {
    const secretPassphrase = `${process.env.NEXT_PUBLIC_DECODER}`;
    const decrypted = CryptoJS.AES.decrypt(data, secretPassphrase).toString(CryptoJS.enc.Utf8);
    if (!decrypted) return [];
    return JSON.parse(decrypted);
  } catch (err) {
    console.error("CryptoFetcher failed:", err?.message);
    return [];
  }
}

export const getHomeLatest = async (body) => {
  try {
    const res = await axios.post(`${baseURL}/api/v1/web/news/latest`, body);
    return res.data;
  } catch (err) {
    console.error("getHomeLatest failed:", err?.message);
    return null;
  }
}

export const getParticularNews = async (body) => {
  return await axios
    .get(`${baseURL}/api/v1/web/news/list?url=${body}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomePageNews = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllPhotosList = async (id) => {
  if (id) {
    return await axios
      .get(`${baseURL}/api/v1/web/listicles/list?id=${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return await axios
      .get(`${baseURL}/api/v1/web/listicles/list`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const getAllCardSection = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/cards/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getYoutubePlaylist = async () => {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST}?part=snippet&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getYoutubePlaylistFunction = async (pageToken = "") => {
  const url = `${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST}?part=snippet&playlistId=${process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=25&pageToken=${pageToken}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getWebstoriesList = async (bodyOrUrl) => {
  // Support three calling patterns:
  // 1. With pagination object: { n_page, n_limit, c_search_term }
  // 2. With URL string for lookup: "some-web-story-url"
  // 3. With no args (defaults to 6 items)
  
  if (typeof bodyOrUrl === "string") {
    // Legacy URL lookup (for web-story/[...slug].js)
    try {
      const res = await axios.get(`${baseURL}/api/v1/web/web_stories/list?url=${bodyOrUrl}`);
      return res.data;
    } catch (err) {
      console.error("getWebstoriesList URL lookup failed:", err?.message);
      return null;
    }
  } else {
    // New pagination object or no args (default to 6 items)
    const params = bodyOrUrl || { n_page: 1, n_limit: 6, c_search_term: "" };
    
    try {
      const res = await axios.post(`${baseURL}/api/v1/web/web_stories/list`, params);
      return res.data;
    } catch (err) {
      console.error("getWebstoriesList failed:", err?.message);
      return null;
    }
  }
};

export const getYoutubeVideos = async () => {
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_YOUTUBE_URL}?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID}&order=date&part=snippet&maxResults=50`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getNewsSeo = async (url) => {
  return await axios
    .get(`${baseURL}/api/v1/web/article_seo/list?url=${url}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCategorySeo = async (val) => {
  return await axios
    .get(`${baseURL}/api/v1/web/category_seo/list?name=${val}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getBreakingNews = async (val) => {
  return await axios
    .get(`${baseURL}/api/v1/web/breaking_news/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getLiveBlogList = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/live_blog/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getSingleLiveBlog = async (id) => {
  return await axios
    .get(`${baseURL}/api/v1/web/live_blog/list?id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getSitemapList = async (id) => {
  if (id) {
    return await axios
      .get(`${baseURL}/api/v1/web/sitemap/list?yearMonth=${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return await axios
      .get(`${baseURL}/api/v1/web/sitemap/list`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const getRssList = async () => {
  return await axios
    .get(`${baseURL}/api/v1/web/rss_xml/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getRssLists = async () => {
  return await axios
    .get(`${baseURL}/api/v1/web/rss_xml/lists`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getRssListFeeds = async (val) => {
  return await axios
    .get(`${baseURL}/api/v1/web/rss_xml/list_all?url=${val}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllYoutubeVideos = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/urls/list`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getQuickLinks = async (val, type) => {
  if (val) {
    return await axios
      .get(`${baseURL}/api/v1/web/quick_links/list?url=${val}&type=${type}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return await axios
      .get(`${baseURL}/api/v1/web/quick_links/list`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};

export const getAllPhotos = async (bodyOrUrl) => {
  // Support three calling patterns:
  // 1. With pagination object: { n_page, n_limit, c_search_term }
  // 2. With URL/ID string for lookup: "some-photo-id"
  // 3. With no args (defaults to 6 items)
  
  if (typeof bodyOrUrl === "string") {
    // Legacy URL/ID lookup
    try {
      const res = await axios.get(`${baseURL}/api/v1/web/photos/list?url=${bodyOrUrl}`);
      return res.data;
    } catch (err) {
      console.error("getAllPhotos URL lookup failed:", err?.message);
      return null;
    }
  } else {
    // New pagination object or no args (default to 6 items)
    const params = bodyOrUrl || { n_page: 1, n_limit: 6, c_search_term: "" };
    
    try {
      const res = await axios.post(`${baseURL}/api/v1/web/photos/list`, params);
      return res.data;
    } catch (err) {
      console.error("getAllPhotos failed:", err?.message);
      return null;
    }
  }
};

export const getControls = async (val) => {
  return await axios
    .get(`${baseURL}/api/v1/web/control/list`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const createUser = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/create_enduser`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const loginUser = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/sign_in`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addComent = async (body, token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return await axios
    .post(`${baseURL}/api/v1/web/user_comments/add`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getNewsComment = async (id) => {
  return await axios
    .get(`${baseURL}/api/v1/web/user_comments/list?story_id=${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getDeviceId = async () => {
  return await axios
    .get(`https://prod-analytics.qlitics.com/api/device-tracker-id`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addDeviceNotify = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/fcm/add`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getNewsVisitCount = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/visit_count`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const sendOtpApi = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/send_otp`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const verifyOtpApi = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/verify_otp`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const forgetPasswordApi = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/forgot_password`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const changePasswordApi = async (body, token) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return await axios
    .post(`${baseURL}/api/v1/web/change_password`, body, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeTN = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/tamilnadu`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeIN = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/india`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getHomeCinema = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/cinema`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomePolitics = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/politics`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
export const getHomeDistrictNews = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/district-news`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeJustBefore = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/just-before`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeBigStories = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/big-stories`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeWorld = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/world`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeSports = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/sports`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeTechnology = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/technology`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getSeoList = async (val) => {
  return await axios
    .get(`${baseURL}/api/v1/web/seo_setup/list`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const getAuthorByName = async (name) => {
  try {
    return await axios
      .get(`${baseURL}/api/v1/web/user/list?name=${encodeURIComponent(name)}`)
      .then((res) => res.data)
      .catch((err) => err);
  } catch (err) {
    return err;
  }
};

export const getAuthorByUrl = async (url) => {
  try {
    return await axios
      .get(`${baseURL}/api/v1/web/user/list?url=${encodeURIComponent(url)}`)
      .then((res) => res.data)
      .catch((err) => err);
  } catch (err) {
    return err;
  }
};