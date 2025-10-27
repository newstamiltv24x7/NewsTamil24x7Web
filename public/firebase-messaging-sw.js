importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC3yzSg9dh73whBAR4KkkBFMFNt1tVCIng",
  authDomain: "newstamil24x7-86268.firebaseapp.com",
  projectId: "newstamil24x7-86268",
  storageBucket: "newstamil24x7-86268.appspot.com",
  messagingSenderId: "936063248193",
  appId: "1:936063248193:web:6633c632ef73c1e6f963c0"
});





self.addEventListener("push", (event) => {
  const payload = event.data.json();

  const notificationTitle = payload.notification.title || "NEWS TAMIL 24X7";
  const notificationOptions = {
    body: payload.notification.body || "NEWS TAMIL 24X7",
    icon: "/main-logo.png",
    image: payload.notification.image || "/main-logo.png", // Full-size image
    data: {
      url: `article/${payload.notification.click_action}` || "/",  // Custom redirect link
    },
    actions: [
      {
        action: "read_more",
        title: "Read More",
      },
    ],
  };
  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();


  if (event.action === "read_more") {
    const url = event.notification.data?.url || "/";
    event.waitUntil(clients.openWindow(url));
  }else if (event.action === "") {
    const url = event.notification.data?.url || "/";
    event.waitUntil(clients.openWindow(url));
  }else {
    // Handle other actions or default click
    event.waitUntil(clients.openWindow("/"));
  }
});
