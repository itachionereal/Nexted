window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText);

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
      trigger: "body",
      start: "-1 top",
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

  const testimonials = document.querySelectorAll(
    ".testimonials .wrapper .content .testimonialsContainer .testimonialsSection .testimonial "
  );

  const splitTestimonialsParagraph = SplitText.create(testimonialsParagraphs, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
  });

  testimonialsAuthors.forEach((author, i) => {
    author.addEventListener("click", () => {
      if (author.classList.contains("active")) {
        return;
      }

      testimonialsAuthors.forEach((author) => {
        author.style.pointerEvents = "none";
        author.classList.remove("active");
      });

      author.classList.add("active");

      testimonials.forEach((testimonial) => {
        if (testimonial.getAttribute("data-index") == i + 1) {
          const tlTestimonials = gsap.timeline();

          tlTestimonials
            .to(splitTestimonialsParagraph.lines, {
              y: "-100%",
              duration: 0.8,
              opacity: 0,
              ease: "expo.out",
            })
            .to(testimonials, {
              x: `-${i * 100}%`,
              duration: 0.01,
              onComplete: () => {
                gsap.set(splitTestimonialsParagraph.lines, {
                  y: "100%",
                });
              },
            })
            .to(splitTestimonialsParagraph.lines, {
              y: 0,
              stagger: 0.07,
              duration: 0.7,
              opacity: 1,
              ease: "expo.out",
              onStart: () => {
                setTimeout(() => {
                  testimonialsAuthors.forEach((author) => {
                    author.style.pointerEvents = "auto";
                  });
                }, 600);
              },
            });
        }
      });
    });
  });
});
