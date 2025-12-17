import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  return await axios
    .post(`${baseURL}/api/v1/web/news/home`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getHomeLatest = async (body) => {
  return await axios
    .post(`${baseURL}/api/v1/web/news/latest`, body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

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

export const getWebstoriesList = async (id) => {
  if (id) {
    return await axios
      .get(`${baseURL}/api/v1/web/web_stories/list?url=${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return await axios
      .get(`${baseURL}/api/v1/web/web_stories/list`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
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

export const getAllPhotos = async (val) => {
  if (val) {
    return await axios
      .get(`${baseURL}/api/v1/web/photos/list?url=${val}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  } else {
    return await axios
      .get(`${baseURL}/api/v1/web/photos/list`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
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
    .get(`${baseURL}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};