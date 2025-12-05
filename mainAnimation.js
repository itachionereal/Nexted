if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

function preventScroll(event) {
  event.preventDefault();
}

// To prevent mouse wheel scrolling:
document.addEventListener("wheel", preventScroll, { passive: false });

// To prevent keyboard scrolling (e.g., Page Up/Down):
document.addEventListener("keydown", (event) => {
  if (
    ["PageUp", "PageDown", "ArrowUp", "ArrowDown", "Space"].includes(event.key)
  ) {
    event.preventDefault();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // HERO ANIMATION
  const overlay = document.querySelector(".hero .overlay");
  const video = document.querySelector(".hero .video");
  const glowEllipseHero = document.querySelector(".hero .glowEllipse");

  const header = document.querySelector("header.header");
  const heroTitle = document.querySelector(
    ".hero .wrapper .heroSection .heroTitle .title"
  );
  const splitHeroTitle = SplitText.create(heroTitle, {
    type: "lines",
    mask: "lines",
  });

  const tools = document.querySelectorAll(
    ".hero .wrapper .heroSection .heroTitle .tools .tool"
  );

  const heroInfos = document.querySelector(
    ".hero .wrapper .heroSection .infos"
  );

  const tlHero = gsap.timeline();

  gsap.set(overlay, {
    opacity: 1,
  });

  gsap.set(video, {
    scale: 1.3,
  });

  gsap.set(glowEllipseHero, {
    filter: "blur(20px)",
    y: "24px",
  });

  gsap.set(splitHeroTitle.lines, {
    y: "100%",
  });

  tools.forEach((tool) => {
    gsap.set(tool, {
      opacity: 0,
      scale: 0.5,
      y: 100,
    });
  });

  gsap.set(header, {
    y: "-100%",
  });

  gsap.set(heroInfos, {
    y: "150",
  });

  //   HERO ANIMATION START

  tlHero
    .to(overlay, {
      opacity: 0.9,
      delay: 0.75,
      ease: "power1.out",
    })
    .to(video, {
      scale: 1,
      ease: "power1.out",
    })
    .to(splitHeroTitle.lines, {
      y: 0,
      ease: "expo.out",
      duration: 0.5,
      stagger: 0.2,
      onComplete: () => {
        tools.forEach((tool, i) => {
          gsap.to(tool, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.05,
            ease: "expo.out",
          });
        });

        gsap.to(glowEllipseHero, {
          filter: "blur(120px)",
          y: 0,
          duration: 2,
          ease: "expo.out",
        });
      },
    })
    .to(header, {
      y: 0,
      ease: "expo.out",
      duration: 1,
    })
    .to(
      heroInfos,
      {
        duration: 1,
        y: 0,
        ease: "expo.out",
        onComplete: () => {
          document.removeEventListener("wheel", preventScroll, {
            passive: false,
          });

          document.removeEventListener("keydown", (event) => {
            if (
              ["PageUp", "PageDown", "ArrowUp", "ArrowDown", "Space"].includes(
                event.key
              )
            ) {
              event.preventDefault();
            }
          });
        },
      },
      "<"
    );

  //   INFO ANIMATION START
  const glowEllipseInfosOne = document.querySelector(".infos .glowEllipse.one");
  const glowEllipseInfosTwo = document.querySelector(".infos .glowEllipse.two");

  const InfosSection = document.querySelector("main.infos");
  const InfosSections = document.querySelectorAll(
    "main.infos .sections .sectionInfo"
  );

  const paragraphs = document.querySelectorAll(
    ".infos .wrapper .sections .aboutUsSection .paragraphs .paragraph"
  );

  const calcSectionsHeights = () => {
    let sectionsHeight = 0;

    InfosSections.forEach((section) => {
      sectionsHeight +=
        section.offsetHeight +
        parseInt(window.getComputedStyle(section.parentElement).gap);
    });

    return (
      sectionsHeight -
      parseInt(window.getComputedStyle(InfosSections[0].parentElement).gap) -
      parseInt(window.getComputedStyle(InfosSections[0]).height)
    );
  };

  const splitParagraphs = SplitText.create(paragraphs, {
    type: "lines",
    mask: "lines",
  });

  gsap.set(glowEllipseInfosOne, {
    filter: "blur(10px)",
    y: "-100%",
  });

  gsap.set(glowEllipseInfosTwo, {
    filter: "blur(5px)",
    y: "-100%",
  });

  gsap.set(splitParagraphs.lines, {
    y: "100%",
  });

  const tlInfos = gsap.timeline({
    scrollTrigger: {
      trigger: InfosSection,
      start: "300px bottom",
    },
  });

  gsap.matchMedia().add("(min-width : 781px)", () => {
    gsap.to(InfosSections, {
      y: `-${calcSectionsHeights()}px`,
      duration: 3,
      scrollTrigger: {
        trigger: InfosSection,
        start: "top top",
        scrub: 1.5,
        pin: InfosSection.querySelector(".wrapper"),
        pinSpacing: true,
      },
    });
  });

  tlInfos
    .to(glowEllipseInfosOne, {
      filter: "blur(180px)",
      duration: 2,
      y: "-18%",
      ease: "expo.out",
    })
    .to(
      glowEllipseInfosTwo,
      {
        filter: "blur(80px)",
        duration: 1,
        y: "-18%",
        ease: "expo.out",
      },
      "-=1.5s"
    )
    .to(
      splitParagraphs.lines,
      {
        duration: 1.25,
        delay: 0.5,
        y: 0,
        ease: "expo.out",
      },
      "-=1.5s"
    );

  // plans animation
  const plansSection = document.querySelector("main.plans");
  const plansDescription = document.querySelector(
    "main.plans .wrapper .description"
  );

  const plansCards = document.querySelectorAll(
    "main.plans .wrapper .plansCards .plan"
  );

  const glowPlansCards = document.querySelector(
    "main.plans .wrapper .plansCards .plansGlowed .glow"
  );

  const splitPlansDesc = SplitText.create(plansDescription, {
    type: "lines",
    mask: "lines",
  });

  const tlPlans = gsap.timeline({
    scrollTrigger: {
      trigger: plansSection,
      start: "300px bottom",
    },
  });

  gsap.set(plansCards, {
    opacity: 0,
    y: "50%",
  });

  gsap.set(glowPlansCards, {
    opacity: 0,
    filter: "blur(5px)",
  });

  gsap.set(splitPlansDesc.lines, {
    y: "100%",
  });

  tlPlans
    .to(splitPlansDesc.lines, {
      duration: 0.5,
      delay: 0.5,
      y: 0,
      ease: "expo.out",
    })
    .to(
      plansCards,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "expo.out",
      },
      "-=1s"
    )
    .to(glowPlansCards, {
      opacity: 1,
      filter: "blur(100px)",
      y: 0,
    });

  // testimonals

  const testimonalsSection = document.querySelector("main.testimonials");

  const glowEllipseTestimonialsOne = document.querySelector(
    "main.testimonials .glowEllipse.one"
  );
  const glowEllipseTestimonialsTwo = document.querySelector(
    "main.testimonials .glowEllipse.two"
  );

  const testimonialsParagraphs = document.querySelectorAll(
    ".testimonials .wrapper .content .testimonialsContainer .testimonialsSection .testimonial p"
  );

  const testimonialsAuthors = document.querySelectorAll(
    ".testimonials .wrapper .authors .author "
  );

  const tlTestimonials = gsap.timeline({
    scrollTrigger: {
      trigger: testimonalsSection,
      start: "300px bottom",
    },
  });

  gsap.set(glowEllipseTestimonialsOne, {
    filter: "blur(10px)",
    y: "-100%",
  });

  gsap.set(glowEllipseTestimonialsTwo, {
    filter: "blur(5px)",
    y: "-100%",
  });

  gsap.set(testimonialsAuthors, {
    y: "100%",
    opacity: 0,
  });

  gsap.set(testimonialsAuthors, {
    y: "100%",
    opacity: 0,
  });

  gsap.set(testimonialsParagraphs, {
    y: "100%",
    opacity: 0,
  });

  tlTestimonials
    .to(glowEllipseTestimonialsOne, {
      filter: "blur(180px)",
      duration: 2,
      y: "-18%",
      ease: "expo.out",
    })
    .to(
      glowEllipseTestimonialsTwo,
      {
        filter: "blur(80px)",
        duration: 1,
        y: "-18%",
        ease: "expo.out",
      },
      "-=1.5s"
    )
    .to(
      testimonialsParagraphs,
      {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: "expo.out",
      },
      "<"
    )
    .to(
      testimonialsAuthors,
      {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "expo.out",
      },
      "-=1.4"
    );
});
