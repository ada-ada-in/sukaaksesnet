const faqQuestions = document.querySelectorAll('.faq-question');
        
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('i');
                
    answer.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
    });
});
        
        // Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
    target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'});}
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const bars = toggleBtn.querySelectorAll("span");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    bars[0].classList.toggle("rotate-45");
    bars[0].classList.toggle("translate-y-2");

    bars[1].classList.toggle("opacity-0");

    bars[2].classList.toggle("-rotate-45");
    bars[2].classList.toggle("-translate-y-2");
  });

  // Auto-close menu when clicking link
  document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      bars.forEach(bar => {
        bar.classList.remove("rotate-45", "-rotate-45", "translate-y-2", "-translate-y-2", "opacity-0");
      });
    });
  });
});
