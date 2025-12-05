if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

window.scrollTo(0, 0);

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

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
      trigger: "body",
      start: "-1 top",
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
});
