window.addEventListener("DOMContentLoaded", () => {
  // FAQ
  const questionContainers = document.querySelectorAll(
    ".libraryAndFaq .wrapper .FAQs .faqsContainer .faq .questionContainer"
  );

  questionContainers.forEach((questionContainer) => {
    questionContainer.addEventListener("click", (e) => {
      if (questionContainer.parentElement.classList.contains("active")) {
        questionContainer.parentElement.classList.remove("active");
        return;
      }

      questionContainers.forEach((qts) => {
        qts.parentElement.classList.remove("active");
      });

      questionContainer.parentElement.classList.add("active");
    });
  });
});
