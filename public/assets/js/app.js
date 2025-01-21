// header
const header = document.querySelector(".header");
if (header) {
  const menu = header.querySelector(".header__menu");
  const services = header.querySelector(".menu-item-has-children");
  // const servicesSubMenu = services.querySelector(".sub-menu");
  const contacts = header.querySelector(".header__contact");

  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  // const div = document.createElement("div");
  // div.classList.add("icon-plus");
  // div.innerHTML =
  //   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.9999 12.0001C15.0007 12.1317 14.9755 12.2621 14.9257 12.384C14.8759 12.5058 14.8026 12.6166 14.7099 12.7101L10.7099 16.7101C10.5216 16.8984 10.2662 17.0042 9.99994 17.0042C9.73364 17.0042 9.47824 16.8984 9.28994 16.7101C9.10164 16.5218 8.99585 16.2664 8.99585 16.0001C8.99585 15.7338 9.10164 15.4784 9.28994 15.2901L12.5899 12.0001L9.29994 8.71006C9.13611 8.51876 9.05051 8.27268 9.06023 8.02101C9.06995 7.76933 9.17428 7.53059 9.35238 7.3525C9.53047 7.1744 9.76921 7.07007 10.0209 7.06035C10.2726 7.05063 10.5186 7.13623 10.7099 7.30006L14.7099 11.3001C14.8947 11.4863 14.9988 11.7377 14.9999 12.0001Z" fill="currentColor"/></svg>';

  // services.appendChild(div);

  // services.addEventListener("mouseenter", () => {
  //   servicesSubMenu.style.display = "flex"; // Ensure the submenu is visible
  //   requestAnimationFrame(() => {
  //     servicesSubMenu.offsetHeight;
  //     servicesSubMenu.classList.add("show");
  //   });
  // });

  // services.addEventListener("mouseleave", () => {
  //   servicesSubMenu.classList.remove("show");

  //   servicesSubMenu.addEventListener("transitionend", function handler(event) {
  //     if (
  //       event.propertyName === "opacity" &&
  //       !servicesSubMenu.classList.contains("show")
  //     ) {
  //       servicesSubMenu.style.display = "none"; // Hide after fade-out
  //       servicesSubMenu.removeEventListener("transitionend", handler);
  //     }
  //   });
  // });

  const tabs = header.querySelectorAll("#tab");
  const tabLinks = header.querySelectorAll("#tab-link");
  const tabsBody = header.querySelector(".mobile__menu-content");
  const tabsContent = tabsBody.querySelector("#content");
  const tabsContentClose = tabsBody.querySelector("#close");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const isActive = tab.classList.contains("active");
      tabs.forEach((tab) => tab.classList.remove("active"));

      if (isActive) {
        tabsBody.classList.remove("show");

        // Wait for the animation to finish before setting display to 'none'
        tabsBody.addEventListener("transitionend", function handler(event) {
          if (
            event.propertyName === "transform" &&
            !tabsBody.classList.contains("show")
          ) {
            tabsBody.style.display = "none";
            tabsContent.innerHTML = "";
            tabsBody.removeEventListener("transitionend", handler);
          }
        });
      }

      // If tab was not already active, show the content
      if (!isActive) {
        tab.classList.add("active");
        tabsBody.style.display = "flex";

        requestAnimationFrame(() => {
          tabsBody.classList.add("show");
        });

        if (tab.dataset.toggle == "menu") {
          tabsContent.innerHTML = menu.innerHTML + contacts.outerHTML;
        } else {
          tabsContent.innerHTML = servicesSubMenu.outerHTML;
        }
      }
    });
  });

  tabLinks.forEach((link) => {
    link.addEventListener("click", () => {
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });

      // Add animation for hiding
      tabsBody.classList.remove("show");
      tabsBody.addEventListener("transitionend", function handler(event) {
        if (
          event.propertyName === "transform" &&
          !tabsBody.classList.contains("show")
        ) {
          tabsBody.style.display = "none";
          tabsContent.innerHTML = "";
          tabsBody.removeEventListener("transitionend", handler);
        }
      });
    });
  });

  tabsContentClose.addEventListener("click", () => {
    // Add animation for hiding
    tabsBody.classList.remove("show");
    tabsBody.addEventListener("transitionend", function handler(event) {
      if (
        event.propertyName === "transform" &&
        !tabsBody.classList.contains("show")
      ) {
        tabsBody.style.display = "none";
        tabsContent.innerHTML = "";
        tabsBody.removeEventListener("transitionend", handler);
      }
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
  });
}

// school
const school = document.querySelector(".school");
if (school) {
  const video = school.querySelector("video");
  const play = school.querySelector(".school__video-play");
  const playBtn = play.querySelector(".icon");

  playBtn.addEventListener("click", () => {
    play.style.display = "none";
    video.muted = false;
    video.currentTime = 0;
    video.controls = true;
    video.play();
  });
}

// Map
const map = document.querySelector("#yamap");
if (map) {
  ymaps.ready(function () {
    const data = {
      center: [59.932586, 30.34555],
      icon: "/assets/img/icons/marker2.svg",
      zoom: 11,
    };

    const markers = [
      {
        marker: [59.932586, 30.34555],
        city: "г. Санкт-Петербург",
        street: "ул. Заозерная д 3/11",
      },
      {
        marker: [59.912586, 30.30555],
        city: "г. Санкт-Петербург",
        street: "ул. Заозерная д 3/11",
      },
    ];

    var myMap = new ymaps.Map(
      "yamap",
      {
        center: data.center,
        zoom: data.zoom,
        controls: [],
        behaviors: [
          "drag",
          "dblClickZoom",
          "rightMouseButtonMagnifier",
          "multiTouch",
        ],
      },
      {
        suppressMapOpenBlock: true,
      }
    );

    markers.forEach((marker) => {
      let myPlacemark = new ymaps.Placemark(
        marker.marker,
        {
          balloonContentHeader: `<b style='color:#000;'>${marker.city}</b>`,
          balloonContentFooter: marker.street,
        },
        {
          iconLayout: "default#image",
          iconImageHref: data.icon,
          iconImageSize: [35, 40],
          iconImageOffset: [-20 / 2, -20],
        }
      );

      myMap.geoObjects.add(myPlacemark);
    });

    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "small",
        position: {
          top: 15,
          left: "auto",
          right: 15,
        },
      },
    });

    myMap.controls.add(zoomControl);
  });
}

// Initialize the fancybox
const fancyboxTriggers = Array.from(
  document.querySelectorAll("[data-fancybox]")
).filter((trigger) => trigger.dataset.fancybox);
if (fancyboxTriggers) {
  const fancyboxInstances = [];
  fancyboxTriggers.forEach((trigger) => {
    const name = trigger.dataset.fancybox;
    if (fancyboxInstances.includes(name)) {
      return; // Skip if already bound
    }
    // Add the name to the `fancyboxInstances` list
    fancyboxInstances.push(name);
  });
  fancyboxInstances.forEach((name) => {
    Fancybox.bind(`[data-fancybox="${name}"]`, {
      Images: { Panzoom: { maxScale: 3 } },
    });
  });
}

// reviews swiper
let reviewsSwiper = new Swiper(".reviews__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".reviews__swiper .btn-next",
    prevEl: ".reviews__swiper .btn-prev",
  },
  breakpoints: {
    1025: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

// cars swiper
let carsSwiper = new Swiper(".cars__swiper .swiper", {
  slidesPerView: "auto",
  spaceBetween: 15,
  navigation: {
    nextEl: ".cars__swiper .btn-next",
    prevEl: ".cars__swiper .btn-prev",
  },
  breakpoints: {
    641: {
      slidesPerView: 2,
      spaceBetween: 15,
      slidesOffsetAfter: 370,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 20,
      slidesOffsetAfter: 840,
    },
  },
  on: {
    slideChange: function () {
      if (window.innerWidth > 1024) {
        const activeIndex = carsSwiper.activeIndex;

        carsSwiper.slides.forEach((slide, index) => {
          if (index < activeIndex) {
            // Hide slides before active slide
            slide.classList.add("visibility-hidden");
          } else {
            // Show current and next slides
            slide.classList.remove("visibility-hidden");
          }
        });
      }
    },
  },
});
