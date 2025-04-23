// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Background Video Handling
    const video = document.getElementById("background-video")
  
    // Function to check if device is mobile
    function isMobile() {
      return window.innerWidth <= 768
    }
  
    // Function to handle video on mobile devices
    function handleVideoOnMobile() {
      if (isMobile()) {
        // On mobile, we might want to pause the video to save bandwidth
        // Uncomment the next line if you want to pause on mobile
        // video.pause();
      } else {
        video.play()
      }
    }
  
    // Handle resize events
    window.addEventListener("resize", handleVideoOnMobile)
  
    // Initial check
    handleVideoOnMobile()
  
    // Mobile Navigation Toggle
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-links a")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      })
    })
  
    // Section Display Management
    function showSection(sectionId) {
      // Hide all sections except home
      document.querySelectorAll("section:not(#home)").forEach((section) => {
        section.style.display = "none"
      })
  
      // Show the selected section
      if (sectionId !== "home") {
        document.getElementById(sectionId).style.display = "block"
      }
    }
  
    // Initialize - show section if URL has hash
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1)
      showSection(sectionId)
    }
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href").substring(1)
  
        // If it's the home link, just scroll to top and hide other sections
        if (targetId === "home") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
          showSection("home")
          return
        }
  
        const targetElement = document.getElementById(targetId)
  
        if (targetElement) {
          // Show the target section
          showSection(targetId)
  
          // Calculate header height
          const headerHeight = document.querySelector("header").offsetHeight
  
          // Scroll to element with offset for fixed header
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Project Filtering with Animation
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectItems = document.querySelectorAll(".project-item")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"))
        // Add active class to clicked button
        this.classList.add("active")
  
        const filter = this.getAttribute("data-filter")
  
        // Create a counter for staggered animations
        let visibleCount = 0
  
        projectItems.forEach((item) => {
          // First, add a fade-out animation
          if (filter !== "all" && item.getAttribute("data-category") !== filter) {
            item.style.animation = "fadeOut 0.5s forwards"
            setTimeout(() => {
              item.style.display = "none"
            }, 500)
          } else {
            // If the item should be visible
            visibleCount++
  
            // Set a custom property for staggered animation
            item.style.setProperty("--item-index", visibleCount)
  
            // If it was hidden before, we need to show it first
            if (item.style.display === "none") {
              item.style.display = "block"
              item.style.opacity = "0"
            }
  
            // Reset the animation
            item.style.animation = "none"
            // Force reflow
            void item.offsetWidth
            // Add fade-in animation with staggered delay
            item.style.animation = `fadeInUp 0.8s forwards ${visibleCount * 0.1}s`
          }
        })
      })
    })
  
    // Add fadeOut animation keyframes
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes fadeOut {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
    `
    document.head.appendChild(style)
  
    // Project Modal
    const modal = document.querySelector(".project-modal")
    const modalBody = document.querySelector(".modal-body")
    const closeModal = document.querySelector(".close-modal")
    const viewProjectBtns = document.querySelectorAll(".view-project-btn")
  
    // Project details data (you can replace this with your actual project data)
    const projectsData = {
      project1: {
        title: "E-commerce Website",
        image: "assets/project-1.PNG",
        description:
          "A fully responsive e-commerce website built with modern web technologies. Features include product filtering, user authentication, shopping cart functionality, and secure payment processing.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
          "Responsive design for all devices",
          "User authentication and profiles",
          "Shopping cart and checkout",
          "Admin dashboard for product management",
        ],
        liveLink: "#",
        codeLink: "#",
      },
      project2: {
        title: "POS App",
        image: "assets/project-2.PNG",
        description:
          "This is a fully functional Point-of-Sale (POS) system developed to streamline sales transactions. Built with Java GUI and Object-Oriented Programming (OOP) principles, the application includes features such as product management, order processing, and receipt generation. It offers a user-friendly interface that enables cashiers to handle transactions with ease. This project was a first-year group collaboration, allowing us to apply our foundational programming knowledge in a practical setting.",
        technologies: ["Java", "Java Swing"],
        features: [
          "User authentication",
          "Create, edit, and delete orders",
          "Can print reciepts with exact time and date",
        ],
        liveLink: "#",
        codeLink: "#",
      },
      project3: {
        title: "Healthhub",
        image: "assets/project-5.png",
        description:
          "A modern, web-based healthcare platform designed to simplify the process of booking medical appointments online. Built using HTML, CSS, JavaScript, and powered by XAMPP for local server and database management, this web app provides users with a seamless, user-friendly experience in managing their healthcare needs.",
        technologies: ["HTML5", "CSS3", "JavaScript", "XAMPP"],
        features: ["Responsive design", "User authentication", "Admin dashboard for product management"],
        liveLink: "#",
        codeLink: "#",
      },
      project4: {
        title: "Ninjas Adventure of Makabe",
        image: "assets/project-4.jpg",
        description:
          "2D environment filled with challenging obstacles, epic battles, and intriguing characters. In this comprehensive documentation, you will learn about the game mechanics, controls, characters, enemies, and the captivating environments that await you. ",
        technologies: ["Java"],
        features: ["Can move like ninja", "Have a dash move", "Can attack and have a combo move", "Have special attack"],
        liveLink: "#",
        codeLink: "#",
      },
      project5: {
        title: "POS App",
        image: "assets/project-3.png",
        description:
          "Beautifully designed Point-of-Sale (POS) system tailored for boutique cafés and coffee lovers alike. This web app was developed using HTML, CSS, and Java, combining elegant front-end design with functional business logic.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        features: [
          "Responsive design for all devices",
          "User authentication and profiles",
          "Shopping cart and checkout",
          "Admin dashboard for product management",
        ],
        liveLink: "#",
        codeLink: "#",
      },
    }
  
    // Open modal with project details
    viewProjectBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project")
        const project = projectsData[projectId]
  
        if (project) {
          // Create modal content
          const modalContent = `
                  <img src="${project.image}" alt="${project.title}">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  
                  <div class="project-details">
                      <h4>Technologies Used</h4>
                      <p>${project.technologies.join(", ")}</p>
                      
                      <h4>Key Features</h4>
                      <ul>
                          ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
                      </ul>
                  </div>
                  
                  <div class="project-links">
                      <a href="${project.liveLink}" class="project-link" target="_blank">View Live</a>
                      <a href="${project.codeLink}" class="project-link" target="_blank">View Code</a>
                  </div>
              `
  
          modalBody.innerHTML = modalContent
  
          // Show the modal with a fade-in effect
          modal.style.opacity = "0"
          modal.style.display = "block"
          setTimeout(() => {
            modal.style.opacity = "1"
            modal.style.transition = "opacity 0.3s ease"
          }, 10)
  
          document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  
          // Add entrance animation to modal content
          const modalElements = modalBody.querySelectorAll("*")
          modalElements.forEach((el, index) => {
            el.style.opacity = "0"
            el.style.transform = "translateY(20px)"
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
            el.style.transitionDelay = `${index * 0.1}s`
  
            setTimeout(() => {
              el.style.opacity = "1"
              el.style.transform = "translateY(0)"
            }, 100)
          })
        }
      })
    })
  
    // Close modal
    closeModal.addEventListener("click", () => {
      modal.style.opacity = "0"
      modal.style.transition = "opacity 0.3s ease"
  
      setTimeout(() => {
        modal.style.display = "none"
        document.body.style.overflow = "auto" // Re-enable scrolling
      }, 300)
    })
  
    // Close modal when clicking outside of it
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.opacity = "0"
        modal.style.transition = "opacity 0.3s ease"
  
        setTimeout(() => {
          modal.style.display = "none"
          document.body.style.overflow = "auto" // Re-enable scrolling
        }, 300)
      }
    })
  
    // Contact Form Submission with animation
    const contactForm = document.getElementById("contactForm")
  
    if (contactForm) {
      // Add animation to form inputs on focus
      const formInputs = contactForm.querySelectorAll("input, textarea")
      formInputs.forEach((input) => {
        input.addEventListener("focus", function () {
          this.parentElement.classList.add("focused")
        })
  
        input.addEventListener("blur", function () {
          if (this.value === "") {
            this.parentElement.classList.remove("focused")
          }
        })
      })
  
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Simple validation
        if (!name || !email || !subject || !message) {
          alert("Please fill in all fields")
          return
        }
  
        // Add sending animation to button
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true
  
        // Simulate sending (would be replaced with actual AJAX in production)
        setTimeout(() => {
          // Here you would typically send the data to a server
          alert("Thank you for your message! I will get back to you soon.")
  
          // Reset the form
          contactForm.reset()
  
          // Reset button
          submitBtn.innerHTML = originalText
          submitBtn.disabled = false
  
          // Remove focused class from all inputs
          formInputs.forEach((input) => {
            input.parentElement.classList.remove("focused")
          })
        }, 1500)
      })
    }
  
    // Animate skill bars when they come into view
    const skillLevels = document.querySelectorAll(".skill-level")
  
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Function to animate skill bars
    function animateSkillBars() {
      skillLevels.forEach((skill) => {
        if (isInViewport(skill)) {
          const width = skill.style.width
          skill.style.width = "0"
          setTimeout(() => {
            skill.style.width = width
          }, 200)
        }
      })
    }
  
    // Check on scroll
    window.addEventListener("scroll", animateSkillBars)
  
    // Check once on load
    animateSkillBars()
  
    // Header scroll effect
    const header = document.querySelector("header")
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
        header.style.padding = "15px 0"
        header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)"
      } else {
        header.style.backgroundColor = "transparent"
        header.style.padding = "20px 0"
      }
    })
  })
  