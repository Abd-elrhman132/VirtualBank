document.addEventListener("DOMContentLoaded", function () {
  // Update year dynamically
  const yearEl = document.querySelector(".year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  } else {
    console.error("Element with class 'year' not found.");
  }

  // Mobile navigation
  const btnNav = document.querySelector(".btn-mobile-nav");
  const headerEl = document.querySelector(".header");

  if (btnNav && headerEl) {
    btnNav.addEventListener("click", function () {
      headerEl.classList.toggle("nav-open");
    });
  } else {
    console.error("Navigation button or header not found.");
  }

  // Smooth scrolling
  const allLinks = document.querySelectorAll("a:link");

  allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      if (href !== "#" && href.startsWith("#")) {
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("Section not found for:", href);
        }
      }

      if (link.classList.contains("main-nav-link")) {
        if (headerEl) headerEl.classList.toggle("nav-open");
      }
    });
  });

  // Sticky navigation
  const sectionHeroEl = document.querySelector(".section-hero");

  if (!sectionHeroEl) {
    console.error("Element with class 'section-hero' not found.");
    return;
  }

  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];

      if (!ent.isIntersecting) {
        document.body.classList.add("sticky");
      } else {
        document.body.classList.remove("sticky");
      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );

  obs.observe(sectionHeroEl);

  // Check for flexbox gap support
  function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);

    if (!isSupported) {
      document.body.classList.add("no-flexbox-gap");
    }
  }
  checkFlexGap();
});