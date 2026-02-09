// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initializeNavigation();
  initializePreloader();
  initializeAnimations();
  initializeTabs();
  initializeFAQ();
  initializeContactForm();
  initializeScrollEffects();
  initializeStats();
  initializeParallax();
});

// Navigation functionality
function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hamburger menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Smooth scrolling and active nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Close mobile menu
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active nav link
        updateActiveNavLink();
      }
    });
  });

  // Update active nav link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink);
}

// Preloader
function initializePreloader() {
  const preloader = document.getElementById("preloader");

  // Hide preloader immediately if it exists
  if (preloader) {
    // Start fade out after short delay
    setTimeout(function () {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  }

  // Also listen for window load as backup
  window.addEventListener("load", function () {
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(function () {
        preloader.style.display = "none";
      }, 500);
    }
  });
}

// Initialize animations
function initializeAnimations() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }

  // Robot eye blinking animation
  setInterval(function () {
    const robotEyes = document.querySelectorAll(".robot-eye-main");
    robotEyes.forEach((eye) => {
      eye.style.opacity = "0.2";
      setTimeout(() => {
        eye.style.opacity = "1";
      }, 150);
    });
  }, 3000);

  // Floating elements animation
  const floatingElements = document.querySelectorAll(".floating-robot");
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

// Tab functionality
function initializeTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      // Remove active class from all tabs and contents
      tabBtns.forEach((tab) => tab.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked tab and corresponding content
      this.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });
}

// FAQ functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        faq.querySelector(".faq-answer").style.maxHeight = "0";
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

// Contact form functionality
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const formObject = {};

      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Yuborilmoqda...";
      submitBtn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(function () {
        showNotification("Xabaringiz muvaffaqiyatli yuborildi!", "success");
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Scroll effects
function initializeScrollEffects() {
  const scrollElements = document.querySelectorAll("[data-scroll]");

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add("scrolled");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", () => {
    handleScrollAnimation();
  });
}

// Stats counter animation
function initializeStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateStats() {
    if (animated) return;

    statNumbers.forEach((stat) => {
      const finalValue = parseInt(stat.textContent.replace(/\D/g, ""));
      const increment = Math.ceil(finalValue / 100);
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }

        const suffix = stat.textContent.includes("+") ? "+" : "";
        stat.textContent = currentValue + suffix;
      }, 30);
    });

    animated = true;
  }

  // Trigger animation when stats section comes into view
  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStats();
        }
      });
    });

    observer.observe(statsSection);
  }
}

// Parallax effects
function initializeParallax() {
  const parallaxElements = document.querySelectorAll(".circuit-pattern");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Utility function for notifications
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add notification styles if not already added
  if (!document.getElementById("notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border: 2px solid var(--primary-color);
                border-radius: 10px;
                padding: 15px 20px;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification-success {
                border-color: var(--success-color);
            }

            .notification-error {
                border-color: var(--accent-color);
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .notification-message {
                color: var(--text-primary);
                font-weight: 500;
            }

            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .notification-close:hover {
                color: var(--text-primary);
            }
        `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  // Close notification
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, 5000);
}

// Course enrollment functionality
function enrollCourse(courseName, coursePrice) {
  const message = `Assalomu alaykum! Men "${courseName}" kursiga yozilishni xohlayman. Kurs narxi: ${coursePrice}`;
  const phoneNumber = "+998338033353";
  const telegramUrl = `https://t.me/robotronixuz`;
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  // Show options modal
  showEnrollmentModal(courseName, telegramUrl, whatsappUrl);
}

// Product purchase functionality
function purchaseProduct(productName, productPrice) {
  const message = `Assalomu alaykum! Men "${productName}" mahsulotini sotib olishni xohlayman. Narxi: ${productPrice}`;
  const phoneNumber = "+998338033353";
  const telegramUrl = `https://t.me/robotronixuz`;
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  // Show options modal
  showPurchaseModal(productName, telegramUrl, whatsappUrl);
}

// Modal functionality
function showEnrollmentModal(courseName, telegramUrl, whatsappUrl) {
  const modal = createModal(
    "Kursga yozilish",
    `
        <p style="margin-bottom: 20px; color: var(--text-secondary);">
            "${courseName}" kursiga yozilish uchun quyidagi usullardan birini tanlang:
        </p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a href="${telegramUrl}" target="_blank" class="btn-primary" style="flex: 1; text-align: center; text-decoration: none;">
                <i class="fab fa-telegram"></i>
                Telegram orqali
            </a>
            <a href="${whatsappUrl}" target="_blank" class="btn-outline" style="flex: 1; text-align: center; text-decoration: none;">
                <i class="fab fa-whatsapp"></i>
                WhatsApp orqali
            </a>
        </div>
    `,
  );

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("show"), 100);
}

function showPurchaseModal(productName, telegramUrl, whatsappUrl) {
  const modal = createModal(
    "Mahsulot sotib olish",
    `
        <p style="margin-bottom: 20px; color: var(--text-secondary);">
            "${productName}" mahsulotini sotib olish uchun quyidagi usullardan birini tanlang:
        </p>
        <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <a href="${telegramUrl}" target="_blank" class="btn-primary" style="flex: 1; text-align: center; text-decoration: none;">
                <i class="fab fa-telegram"></i>
                Telegram orqali
            </a>
            <a href="${whatsappUrl}" target="_blank" class="btn-outline" style="flex: 1; text-align: center; text-decoration: none;">
                <i class="fab fa-whatsapp"></i>
                WhatsApp orqali
            </a>
        </div>
    `,
  );

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add("show"), 100);
}

function createModal(title, content) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;

  // Add modal styles if not already added
  if (!document.getElementById("modal-styles")) {
    const styles = document.createElement("style");
    styles.id = "modal-styles";
    styles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(5px);
            }

            .modal-overlay.show {
                opacity: 1;
            }

            .modal-content {
                background: var(--card-bg);
                border: 2px solid var(--border-color);
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: translateY(50px);
                transition: transform 0.3s ease;
            }

            .modal-overlay.show .modal-content {
                transform: translateY(0);
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 25px 30px;
                border-bottom: 1px solid var(--border-color);
            }

            .modal-header h3 {
                margin: 0;
                color: var(--text-primary);
                font-size: 1.4rem;
            }

            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }

            .modal-close:hover {
                background: var(--border-color);
                color: var(--text-primary);
            }

            .modal-body {
                padding: 30px;
            }
        `;
    document.head.appendChild(styles);
  }

  // Close modal functionality
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(modal)) {
        document.body.removeChild(modal);
      }
    }, 300);
  });

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, 300);
    }
  });

  return modal;
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top button
window.addEventListener("scroll", function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) {
    const btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.onclick = scrollToTop;
    btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            box-shadow: var(--shadow-md);
        `;
    document.body.appendChild(btn);
  }

  if (window.scrollY > 300) {
    scrollTopBtn.style.opacity = "1";
    scrollTopBtn.style.transform = "translateY(0)";
  } else {
    scrollTopBtn.style.opacity = "0";
    scrollTopBtn.style.transform = "translateY(20px)";
  }
});

// Initialize course enrollment buttons
document.addEventListener("DOMContentLoaded", function () {
  // Add click handlers to course enrollment buttons
  document.querySelectorAll(".course-card .btn-primary").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const courseCard = this.closest(".course-card");
      const courseName = courseCard.querySelector(".course-title").textContent;
      const coursePrice = courseCard.querySelector(".course-price").textContent;
      enrollCourse(courseName, coursePrice);
    });
  });

  // Add click handlers to product purchase buttons
  document.querySelectorAll(".product-card .btn-primary").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const productCard = this.closest(".product-card");
      const productName =
        productCard.querySelector(".product-title").textContent;
      const productPrice = productCard.querySelector(".price-main").textContent;
      purchaseProduct(productName, productPrice);
    });
  });

  // Add click handlers to hero buttons
  document.querySelectorAll(".hero-buttons .btn-primary").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const coursesSection = document.getElementById("courses");
      if (coursesSection) {
        coursesSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Performance optimization
window.addEventListener("load", function () {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Error handling for missing elements
window.addEventListener("error", function (e) {
  console.warn("JavaScript error:", e.message);
});

// Analytics event tracking (placeholder)
function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Export functions for external use
window.RobotronixApp = {
  enrollCourse,
  purchaseProduct,
  showNotification,
  trackEvent,
};
