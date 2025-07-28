document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Function to remove 'active' class from all nav links
  const removeActiveClass = () => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
  };

  // Smooth scroll and active link on click
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      removeActiveClass();
      this.classList.add("active");

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top:
            targetSection.offsetTop -
            document.querySelector(".navbar").offsetHeight,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      const navbarCollapse = document.getElementById("navbarNav");
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false,
        });
        bsCollapse.hide();
        toggleMobileMenu(); // Reset the icon
      }
    });
  });

  // Intersection Observer for scroll-based active link
  const observerOptions = {
    root: null, // viewport
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        removeActiveClass();
        const correspondingLink = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

function toggleMobileMenu() {
  const navbarCollapse = document.getElementById("navbarNav");
  const menuIcon = document.getElementById("menu-icon");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (navbarCollapse.classList.contains("show")) {
    // Close menu
    navbarCollapse.classList.remove("show");
    menuIcon.className = "fas fa-bars";
    navbarToggler.setAttribute("aria-expanded", "false");
  } else {
    // Open menu
    navbarCollapse.classList.add("show");
    menuIcon.className = "fas fa-times";
    navbarToggler.setAttribute("aria-expanded", "true");
  }
}

// Close menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.getElementById("navbarNav");
    const menuIcon = document.getElementById("menu-icon");
    const navbarToggler = document.querySelector(".navbar-toggler");

    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");
      menuIcon.className = "fas fa-bars";
      navbarToggler.setAttribute("aria-expanded", "false");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const navbar = document.querySelector(".navbar");
  const navbarCollapse = document.getElementById("navbarNav");
  const menuIcon = document.getElementById("menu-icon");
  const navbarToggler = document.querySelector(".navbar-toggler");

  if (!navbar.contains(e.target) && navbarCollapse.classList.contains("show")) {
    navbarCollapse.classList.remove("show");
    menuIcon.className = "fas fa-bars";
    navbarToggler.setAttribute("aria-expanded", "false");
  }
});






// About Functionalities

const observerOptionsAbout = {
  threshold: 0.3, 
  rootMargin: "0px 0px -50px 0px", 
};

const observerAbout = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Start counter animation if it's a counter element
      const counter = entry.target.querySelector(".counter");
      if (counter) {
        animateCounter(counter);
      }
    }
  });
}, observerOptionsAbout);

// Observe all elements with scroll animation classes
document
  .querySelectorAll(
    ".scroll-animate, .scroll-animate-left, .scroll-animate-scale"
  )
  .forEach((el) => {
    observerAbout.observe(el);
  });

// Counter animation function
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const increment = target / 100; 
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    element.textContent = Math.floor(current);

    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    }
  }, 20); 
}

// Reset animations on scroll back up 
const resetObserverAbout = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {

        entry.target.classList.remove("animate");

        const counter = entry.target.querySelector(".counter");
        if (counter) {
          counter.textContent = "0";
        }
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
  }
);

document
  .querySelectorAll(
    ".scroll-animate, .scroll-animate-left, .scroll-animate-scale"
  )
  .forEach((el) => {
    resetObserverAbout.observe(el);
  });





// SErvice Functionalities testimonials-section

const servicesObserverOptions = {
  threshold: 0.3, 
  rootMargin: "0px 0px -50px 0px",
};

const servicesObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("section-animate");
      
      const serviceCards = entry.target.querySelectorAll(".service-card");
      serviceCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate");
        }, index * 100); 
      });
    } else {
      entry.target.classList.remove("section-animate");
      const serviceCards = entry.target.querySelectorAll(".service-card");
      serviceCards.forEach((card) => {
        card.classList.remove("animate");
      });
    }
  });
}, servicesObserverOptions);

// Start observing when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const servicesSection = document.querySelector(".services-section");
  if (servicesSection) {
    servicesObserver.observe(servicesSection);
  }

  setTimeout(() => {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card, index) => {
      card.style.animation = `float2 3s ease-in-out ${index * 0.5}s infinite`;
    });
  }, 2000);
});

document.documentElement.style.scrollBehavior = "smooth";

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector(".services-header");
  const cards = document.querySelectorAll(".service-card.animate");

  if (header) {
    header.style.transform = `translateY(${scrolled * 0.1}px)`;
  }

  // Staggered parallax for cards
  cards.forEach((card, index) => {
    const speed = 0.05 + index * 0.01;
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
}); 






// Team

// Intersection Observer for team section elements
const teamObserverOptions = {
  threshold: 0.25,
  rootMargin: "0px 0px -50px 0px",
};

const teamObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add("animate");
      }, delay);
    } else {
      entry.target.classList.remove("animate");
    }
  });
}, teamObserverOptions);

// Start observing team section elements when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Observe team section elements individually
  const teamSubtitle = document.querySelector(".section-subtitle");
  const teamTitle = document.querySelector(".section-title");
  const teamCards = document.querySelectorAll(".team-card");

  if (teamSubtitle) {
    teamSubtitle.dataset.delay = 0;
    teamObserver.observe(teamSubtitle);
  }
  
  if (teamTitle) {
    teamTitle.dataset.delay = 300; 
    teamObserver.observe(teamTitle);
  }
  
  teamCards.forEach((card, index) => {
    card.dataset.delay = 300 + (index * 200); 
    teamObserver.observe(card);
  });
});












// Frequency Asked QUestion 

document.addEventListener("DOMContentLoaded", function () {
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach((item) => {
    const summary = item.querySelector("summary");

    summary.addEventListener("click", function (e) {
      const isCurrentlyOpen = item.hasAttribute("open");

      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });

      if (!isCurrentlyOpen) {
        e.preventDefault();
        item.setAttribute("open", "");
      }
    });
  });
});

// Scroll 

function handleFaqScrollAnimation() {
    const faqSection = document.getElementById('faqs');
    const sectionRect = faqSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const threshold = windowHeight * 0.7;
    
    if (sectionRect.top < threshold && sectionRect.bottom > 0) {
        faqSection.classList.add('scroll-animate');
    }
}

window.addEventListener('scroll', handleFaqScrollAnimation);
document.addEventListener('DOMContentLoaded', handleFaqScrollAnimation);

if ('IntersectionObserver' in window) {
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    });

    faqObserver.observe(document.getElementById('faqs'));
}

// Contact us

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const spinner = document.getElementById("spinner");
  const btnText = document.getElementById("btnText");
  const successMessage = document.getElementById("successMessage");

  // Form validation
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + "Error");
    let isValid = true;

    field.classList.remove("error");
    errorElement.style.display = "none";

    // Validation rules
    switch (fieldName) {
      case "firstName":
        if (value === "") {
          showError(field, errorElement, "Please enter your first name");
          isValid = false;
        } else if (value.length < 2) {
          showError(field, errorElement, "Name must be at least 2 characters");
          isValid = false;
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value === "") {
          showError(field, errorElement, "Please enter your email address");
          isValid = false;
        } else if (!emailRegex.test(value)) {
          showError(field, errorElement, "Please enter a valid email address");
          isValid = false;
        }
        break;

      case "subject":
        if (value === "") {
          showError(field, errorElement, "Please select a subject");
          isValid = false;
        }
        break;

      case "message":
        if (value === "") {
          showError(field, errorElement, "Please enter your message");
          isValid = false;
        } else if (value.length < 10) {
          showError(
            field,
            errorElement,
            "Message must be at least 10 characters"
          );
          isValid = false;
        }
        break;
    }

    return isValid;
  }

  function showError(field, errorElement, message) {
    field.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  // Real-time validation
  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("error")) {
        validateField(field);
      }
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    successMessage.style.display = "none";

    let isFormValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Show loading state
      submitBtn.classList.add("loading");
      spinner.style.display = "block";
      btnText.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        form.reset();

        successMessage.style.display = "block";

        submitBtn.classList.remove("loading");
        spinner.style.display = "none";
        btnText.textContent = "Send Message";
        submitBtn.disabled = false;

        setTimeout(() => {
          successMessage.style.display = "none";
        }, 5000);
      }, 2000);
    } else {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});



// Scroll 

function handleContactScrollAnimation() {
    const contactSection = document.getElementById('contact');
    const sectionRect = contactSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const threshold = windowHeight * 0.7;
    
    if (sectionRect.top < threshold && sectionRect.bottom > 0) {
        contactSection.classList.add('scroll-animate');
    }
}

window.addEventListener('scroll', handleContactScrollAnimation);
document.addEventListener('DOMContentLoaded', handleContactScrollAnimation);

if ('IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    });

    contactObserver.observe(document.getElementById('contact'));
}





// Footer
 


// Add floating animation to social links
document.querySelectorAll(".social-link").forEach((link, index) => {
  link.style.animationDelay = `${index * 0.1}s`;
  link.addEventListener("mouseenter", function () {
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "";
    }, 100);
  });
});

// Scroll 

function handleFooterScrollAnimation() {
    const footerSection = document.querySelector('.footer');
    const sectionRect = footerSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const threshold = windowHeight * 0.7;
    
    if (sectionRect.top < threshold && sectionRect.bottom > 0) {
        footerSection.classList.add('scroll-animate');
    }
}

window.addEventListener('scroll', handleFooterScrollAnimation);
document.addEventListener('DOMContentLoaded', handleFooterScrollAnimation);

if ('IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -20% 0px'
    });

    footerObserver.observe(document.querySelector('.footer'));
}











//SELECT COUNTRY

// const country = document.getElementById("Country");

// const countries = [
//   {
//     name: "Afghanistan",
//     image: "afghanistan.png",
//   },
//   {
//     name: "Albania",
//     image: "albania.png",
//   },
//   {
//     name: "Algeria",
//     image: "algeria.jpg",
//   },
//   {
//     name: "American Samoa",
//     image: "American Samoa.png",
//   },
//   {
//     name: "Andorra",
//     image: "Andorra.png",
//   },
//   {
//     name: "Angola",
//     image: "Angola.png",
//   },
//   {
//     name: "Anguilla",
//     image: "Anguilla.png",
//   },
//   {
//     name: "Antarctica",
//     image: "Antarctica.jpg",
//   },
//   {
//     name: "Antigua and Barbuda",
//     image: "Antigua and Barbuda.png",
//   },
//   {
//     name: "Argentina",
//     image: "Argentina.png",
//   },
//   {
//     name: "Armenia",
//     image: "Armenia.png",
//   },
//   {
//     name: "Aruba",
//     image: "Aruba.png",
//   },
//   {
//     name: "Australia",
//     image: "Australia.png",
//   },
//   {
//     name: "Austria",
//     image: "Austria.png",
//   },
//   {
//     name: "Azerbaijan",
//     image: "Azerbaijan.png",
//   },
//   {
//     name: "Bahamas",
//     image: "Bahamas.png",
//   },
//   {
//     name: "Bahrain",
//     image: "Bahrain.png",
//   },
//   {
//     name: "Bangladesh",
//     image: "Bangladesh.png",
//   },
//   {
//     name: "Barbados",
//     image: "Barbados.png",
//   },
//   {
//     name: "Belarus",
//     image: "Belarus.png",
//   },
//   {
//     name: "Belgium",
//     image: "Belgium.png",
//   },
//   {
//     name: "Belize",
//     image: "Belize.png",
//   },
//   {
//     name: "Benin",
//     image: "Benin.png",
//   },
//   {
//     name: "Bermuda",
//     image: "Bermuda.png",
//   },
//   {
//     name: "Bhutan",
//     image: "Bhutan.png",
//   },
//   {
//     name: "Bolivia",
//     image: "Bolivia.png",
//   },
//   {
//     name: "Bosnia and Herzegovina",
//     image: "Bosnia and Herzegovina.png",
//   },
//   {
//     name: "Botswana",
//     image: "Botswana.png",
//   },
//   {
//     name: "Brazil",
//     image: "Brazil.png",
//   },
//   {
//     name: "Brunei Darussalam",
//     image: "Brunei Darussalam.png",
//   },
//   {
//     name: "Bulgaria",
//     image: "Bulgaria.png",
//   },
//   {
//     name: "Burkina Faso",
//     image: "Burkina Faso.png",
//   },
//   {
//     name: "Burundi",
//     image: "Burundi.jpg",
//   },
//   {
//     name: "Cambodia",
//     image: "Cambodia.png",
//   },
//   {
//     name: "Cameroon",
//     image: "Cameroon.png",
//   },
//   {
//     name: "Canada",
//     image: "Canada.png",
//   },
//   {
//     name: "Cape Verde",
//     image: "Cape Verde.png",
//   },
//   {
//     name: "Cayman Islands",
//     image: "Cayman Islands.png",
//   },
//   {
//     name: "Central African Republic",
//     image: "Central African Republic.png",
//   },
//   {
//     name: "Chad",
//     image: "Chad.png",
//   },
//   {
//     name: "Chile",
//     image: "Chile.png",
//   },
//   {
//     name: "China",
//     image: "China.png",
//   },
//   {
//     name: "Christmas Island",
//     image: "Christmas Island.png",
//   },
//   {
//     name: "Cocos (Keeling) Islands",
//     image: "Cocos (Keeling) Islands.png",
//   },
//   {
//     name: "Colombia",
//     image: "Colombia.png",
//   },
//   {
//     name: "Comoros",
//     image: "Comoros.png",
//   },
//   {
//     name: "Democratic Republic of the Congo (Kinshasa)",
//     image: "Democratic Republic of the Congo (Kinshasa).png",
//   },
//   {
//     name: "Congo, Republic of (Brazzaville)",
//     image: "Congo, Republic of (Brazzaville).png",
//   },
//   {
//     name: "Cook Islands",
//     image: "Cook Islands.png",
//   },
//   {
//     name: "Costa Rica",
//     image: "Costa Rica.png",
//   },
//   {
//     name: `Côte D'ivoire (Ivory Coast)`,
//     image: `Côte D'ivoire (Ivory Coast).jpg`,
//   },
//   {
//     name: "Croatia",
//     image: "Croatia.png",
//   },
//   {
//     name: "Cuba",
//     image: "Cuba.png",
//   },
//   {
//     name: "Cyprus",
//     image: "Cyprus.png",
//   },
//   {
//     name: "Czech Republic",
//     image: "Czech Republic.png",
//   },
//   {
//     name: "Denmark",
//     image: "Denmark.png",
//   },
//   {
//     name: "Djibouti",
//     image: "Djibouti.png",
//   },
//   {
//     name: "Dominica",
//     image: "Dominica.jpg",
//   },
//   {
//     name: "Dominican Republic",
//     image: "Dominican Republic.png",
//   },
//   {
//     name: "East Timor (Timor-Leste)",
//     image: "East Timor (Timor-Leste).jpg",
//   },
//   {
//     name: "Ecuador",
//     image: "Ecuador.jpg",
//   },
//   {
//     name: "Egypt",
//     image: "Egypt.png",
//   },
//   {
//     name: "El Salvador",
//     image: "El Salvador.png",
//   },
//   {
//     name: "Equatorial Guinea",
//     image: "Equatorial Guinea.jpg",
//   },
//   {
//     name: "Eritrea",
//     image: "Eritrea.png",
//   },
//   {
//     name: "Estonia",
//     image: "Estonia.png",
//   },
//   {
//     name: "Ethiopia",
//     image: "Ethiopia.jpg",
//   },
//   {
//     name: "Falkland Islands",
//     image: "Falkland Islands.png",
//   },
//   {
//     name: "Faroe Islands",
//     image: "Faroe Islands.png",
//   },
//   {
//     name: "Fiji",
//     image: "Fiji.png",
//   },
//   {
//     name: "Finland",
//     image: "Finland.png",
//   },
//   {
//     name: "France",
//     image: "France-flag.png",
//   },
//   {
//     name: "Gabon",
//     image: "Gabon.png",
//   },
//   {
//     name: "Gambia",
//     image: "Gambia.png",
//   },
//   {
//     name: "Georgia",
//     image: "Georgia.png",
//   },
//   {
//     name: "Germany",
//     image: "Germany-flag.png",
//   },
//   {
//     name: "Ghana",
//     image: "Ghana.png",
//   },
//   {
//     name: "Gibraltar",
//     image: "Gibraltar.png",
//   },
//   {
//     name: "Greece",
//     image: "Greece.png",
//   },
//   {
//     name: "Greenland",
//     image: "Greenland.png",
//   },
//   {
//     name: "Grenada",
//     image: "Grenada.png",
//   },
//   {
//     name: "Guadeloupe",
//     image: "Guadeloupe.jpg",
//   },
//   {
//     name: "Guam",
//     image: "Guam.png",
//   },
//   {
//     name: "Guinea",
//     image: "Guinea.png",
//   },
//   {
//     name: "Guinea-Bissau",
//     image: "Guinea-Bissau.png",
//   },
//   {
//     name: "Guyana",
//     image: "Guyana.png",
//   },
//   {
//     name: "Haiti",
//     image: "Haiti.jpg",
//   },
//   {
//     name: "Holy See",
//     image: "Holy See.jpg",
//   },
//   {
//     name: "Honduras",
//     image: "Honduras.png",
//   },
//   {
//     name: "Hong Kong",
//     image: "Hong Kong.png",
//   },
//   {
//     name: "Hungary",
//     image: "Hungary.jpg",
//   },
//   {
//     name: "Iceland",
//     image: "Iceland.png",
//   },
//   {
//     name: "India",
//     image: "India.png",
//   },
//   {
//     name: "Indonesia",
//     image: "Indonesia.png",
//   },
//   {
//     name: "Iran",
//     image: "Iran.jpg",
//   },
//   {
//     name: "Iraq",
//     image: "Iraq.png",
//   },
//   {
//     name: "Ireland",
//     image: "Ireland.png",
//   },
//   {
//     name: "Israel",
//     image: "Israel.jpg",
//   },
//   {
//     name: "Italy",
//     image: "Italy-flag.png",
//   },
//   {
//     name: "Jamaica",
//     image: "Jamaica.jpg",
//   },
//   {
//     name: "Japan",
//     image: "Japan.png",
//   },
//   {
//     name: "Jordan",
//     image: "Jordan.png",
//   },
//   {
//     name: "Kazakhstan",
//     image: "Kazakhstan.jpg",
//   },
//   {
//     name: "Kenya",
//     image: "Kenya.png",
//   },
//   {
//     name: "Kiribati",
//     image: "Kiribati.png",
//   },
//   {
//     name: "North Korea",
//     image: "North Korea.png",
//   },
//   {
//     name: "South Korea",
//     image: "South Korea.jpg",
//   },
//   {
//     name: "Kosovo",
//     image: "Kosovo.jpg",
//   },
//   {
//     name: "Kuwait",
//     image: "Kuwait.jpg",
//   },
//   {
//     name: "Kyrgyzstan",
//     image: "Kyrgyzstan.jpg",
//   },
//   {
//     name: "Lao",
//     image: "Lao.png",
//   },
//   {
//     name: "Latvia",
//     image: "Latvia.png",
//   },
//   {
//     name: "Lebanon",
//     image: "Lebanon.png",
//   },
//   {
//     name: "Lesotho",
//     image: "Lesotho.png",
//   },
//   {
//     name: "Liberia",
//     image: "Liberia.jpg",
//   },
//   {
//     name: "Libya",
//     image: "Libya.png",
//   },
//   {
//     name: "Liechtenstein",
//     image: "Liechtenstein.png",
//   },
//   {
//     name: "Lithuania",
//     image: "Lithuania.png",
//   },
//   {
//     name: "Luxembourg",
//     image: "Luxembourg.png",
//   },
//   {
//     name: "Macau",
//     image: "Macau.png",
//   },
//   {
//     name: "Madagascar",
//     image: "Madagascar.png",
//   },
//   {
//     name: "Malawi",
//     image: "Malawi.png",
//   },
//   {
//     name: "Malaysia",
//     image: "Malaysia.jpg",
//   },
//   {
//     name: "Maldives",
//     image: "Maldives.png",
//   },
//   {
//     name: "Mali",
//     image: "Mali.png",
//   },
//   {
//     name: "Malta",
//     image: "Malta.png",
//   },
//   {
//     name: "Marshall Islands",
//     image: "Marshall Islands.jpg",
//   },
//   {
//     name: "Mauritius",
//     image: "Mauritius.png",
//   },
//   {
//     name: "Mayotte",
//     image: "Mayotte.jpg",
//   },
//   {
//     name: "Mexico",
//     image: "Mexico.png",
//   },
//   {
//     name: "Micronesia",
//     image: "Micronesia.png",
//   },
//   {
//     name: "Moldova",
//     image: "Moldova.png",
//   },
//   {
//     name: "Mongolia",
//     image: "Mongolia.jpg",
//   },
//   {
//     name: "Montenegro",
//     image: "Montenegro.png",
//   },
//   {
//     name: "Montserrat",
//     image: "Montserrat.png",
//   },
//   {
//     name: "Morocco",
//     image: "Morocco.jpg",
//   },
//   {
//     name: "Mozambique",
//     image: "Mozambique.jpg",
//   },
//   {
//     name: "Myanmar",
//     image: "Myanmar.png",
//   },
//   {
//     name: "Namibia",
//     image: "Namibia.png",
//   },
//   {
//     name: "Nauru",
//     image: "Nauru.png",
//   },
//   {
//     name: "Netherlands",
//     image: "Netherlands.jpg",
//   },
//   {
//     name: "New Caledonia",
//     image: "New Caledonia.jpg",
//   },
//   {
//     name: "New Zealand",
//     image: "New Zealand.jpg",
//   },
//   {
//     name: "Nicaragua",
//     image: "Nicaragua.png",
//   },
//   {
//     name: "Niger",
//     image: "Niger.png",
//   },
//   {
//     name: "Nigeria",
//     image: "Nigeria.png",
//   },
//   {
//     name: "Niue",
//     image: "Niue.png",
//   },
//   {
//     name: "North Macedonia",
//     image: "North Macedonia.jpg",
//   },
//   {
//     name: "Northern Mariana Islands",
//     image: "Northern Mariana Islands.png",
//   },
//   {
//     name: "Norway",
//     image: "Norway.png",
//   },
//   {
//     name: "Oman",
//     image: "Oman.png",
//   },
//   {
//     name: "Pakistan",
//     image: "Pakistan.jpg",
//   },
//   {
//     name: "Palau",
//     image: "Palau.png",
//   },
//   {
//     name: "Palestine",
//     image: "Palestine.jpg",
//   },
//   {
//     name: "Panama",
//     image: "Panama.png",
//   },
//   {
//     name: "Papua New Guinea",
//     image: "Papua New Guinea.png",
//   },
//   {
//     name: "Paraguay",
//     image: "Paraguay.png",
//   },
//   {
//     name: "Peru",
//     image: "Peru.jpg",
//   },
//   {
//     name: "Philippines",
//     image: "Philippines.jpg",
//   },
//   {
//     name: "Pitcairn Island",
//     image: "Pitcairn Island.png",
//   },
//   {
//     name: "Poland",
//     image: "Poland.png",
//   },
//   {
//     name: "Portugal",
//     image: "Portugal-flag.png",
//   },
//   {
//     name: "Puerto Rico",
//     image: "Puerto Rico.jpg",
//   },
//   {
//     name: "Qatar",
//     image: "Qatar.png",
//   },
//   {
//     name: "Reunion Island",
//     image: "Reunion Island.png",
//   },
//   {
//     name: "Romania",
//     image: "Romania.png",
//   },
//   {
//     name: "Russian Federation",
//     image: "Russian Federation.png",
//   },
//   {
//     name: "Rwanda",
//     image: "Rwanda.jpg",
//   },
//   {
//     name: "Saint Kitts and Nevis",
//     image: "Saint Kitts and Nevis.png",
//   },
//   {
//     name: "Saint Lucia",
//     image: "Saint Lucia.jpg",
//   },
//   {
//     name: "Saint Vincent and the Grenadines",
//     image: "Saint Vincent and the Grenadines.png",
//   },
//   {
//     name: "Samoa",
//     image: "Samoa.png",
//   },
//   {
//     name: "San Marino",
//     image: "San Marino.png",
//   },
//   {
//     name: "Sao Tome and Principe",
//     image: "Sao Tome and Principe.png",
//   },
//   {
//     name: "Saudi Arabia",
//     image: "Saudi Arabia.jpg",
//   },
//   {
//     name: "Senegal",
//     image: "Senegal.jpg",
//   },
//   {
//     name: "Serbia",
//     image: "Serbia.jpg",
//   },
//   {
//     name: "Seychelles",
//     image: "Seychelles.jpg",
//   },
//   {
//     name: "Sierra Leone",
//     image: "Sierra Leone.png",
//   },
//   {
//     name: "Singapore",
//     image: "Singapore.png",
//   },
//   {
//     name: "Slovakia",
//     image: "Slovakia.jpg",
//   },
//   {
//     name: "Slovenia",
//     image: "Slovenia.png",
//   },
//   {
//     name: "Solomon Islands",
//     image: "Solomon Islands.png",
//   },
//   {
//     name: "Somalia",
//     image: "Somalia.png",
//   },
//   {
//     name: "South Africa",
//     image: "South Africa.png",
//   },
//   {
//     name: "South Sudan",
//     image: "South Sudan.jpg",
//   },
//   {
//     name: "Spain",
//     image: "Spain.png",
//   },
//   {
//     name: "Sudan",
//     image: "Sudan.png",
//   },
//   {
//     name: "Suriname",
//     image: "Suriname.png",
//   },
//   {
//     name: "Swaziland (Eswatini)",
//     image: "Swaziland (Eswatini).png",
//   },
//   {
//     name: "Sweden",
//     image: "Sweden.png",
//   },
//   {
//     name: "Switzerland",
//     image: "Switzerland.png",
//   },
//   {
//     name: "Syria",
//     image: "Syria.png",
//   },
//   {
//     name: "Taiwan",
//     image: "Taiwan.png",
//   },
//   {
//     name: "Tajikistan",
//     image: "Tajikistan.jpg",
//   },
//   {
//     name: "Tanzania",
//     image: "Tanzania.jpg",
//   },
//   {
//     name: "Thailand",
//     image: "Thailand.png",
//   },
//   {
//     name: "Tibet",
//     image: "Tibet.png",
//   },
//   {
//     name: "Timor-Leste",
//     image: "Timor-Leste.png",
//   },
//   {
//     name: "Togo",
//     image: "Togo.png",
//   },
//   {
//     name: "Tokelau",
//     image: "Tokelau.png",
//   },
//   {
//     name: "Tonga",
//     image: "Tonga.png",
//   },
//   {
//     name: "Trinidad and Tobago",
//     image: "Trinidad and Tobago.jpg",
//   },
//   {
//     name: "Tunisia",
//     image: "Tunisia.png",
//   },
//   {
//     name: "Turkey",
//     image: "Turkey.png",
//   },
//   {
//     name: "Turkmenistan",
//     image: "Turkmenistan.jpg",
//   },
//   {
//     name: "Turks and Caicos Islands",
//     image: "Turks and Caicos Islands.png",
//   },
//   {
//     name: "Tuvalu",
//     image: "Tuvalu.jpg",
//   },
//   {
//     name: "Uganda",
//     image: "Uganda.png",
//   },
//   {
//     name: "United Arab Emirates",
//     image: "United Arab Emirates.jpg",
//   },
//   {
//     name: "United Kingdom",
//     image: "United Kingdom.jpg",
//   },
//   {
//     name: "United States",
//     image: "United States.jpg",
//   },
//   {
//     name: "Uruguay",
//     image: "Uruguay.png",
//   },
//   {
//     name: "Uzbekistan",
//     image: "Uzbekistan.jpg",
//   },
//   {
//     name: "Vanuatu",
//     image: "Vanuatu.png",
//   },
//   {
//     name: "Venezuela",
//     image: "Venezuela.png",
//   },
//   {
//     name: "Vietnam",
//     image: "Vietnam.png",
//   },
//   {
//     name: "Western Sahara",
//     image: "Western Sahara.png",
//   },
//   {
//     name: "Yemen",
//     image: "Yemen.png",
//   },
//   {
//     name: "Zambia",
//     image: "Zambia.png",
//   },
//   {
//     name: "Zimbabwe",
//     image: "Zimbabwe.jpg",
//   },
// ];
