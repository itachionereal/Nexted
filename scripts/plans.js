if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

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
      trigger: "body",
      start: "-1 top",
    },
  });

  gsap.set(plansCards, {
    opacity: 0,
    y: "100%",
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
      "-=.5s"
    )
    .to(glowPlansCards, {
      opacity: 1,
      filter: "blur(100px)",
      y: 0,
    });
});
