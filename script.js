// Theme Toggle
const themeToggle = document.getElementById("themeToggle")

if (themeToggle) {
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem("theme") || "dark"
  if (currentTheme === "light") {
    document.body.classList.add("light-mode")
    themeToggle.textContent = "☀️"
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode")
    const isLight = document.body.classList.contains("light-mode")
    localStorage.setItem("theme", isLight ? "light" : "dark")
    themeToggle.textContent = isLight ? "☀️" : "🌙"
  })
}

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    } else {
      entry.target.classList.remove("visible")
    }
  })
}, observerOptions)

// Observe all animate-on-scroll elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

// Mouse Proximity Animation
let mouseX = 0
let mouseY = 0
const PROXIMITY_RADIUS = 300

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY

  // Check proximity to all cards
  document.querySelectorAll(".project-card, .skill-card, .cert-card").forEach((card) => {
    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    const distance = Math.sqrt(Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2))

    if (distance < PROXIMITY_RADIUS) {
      if (!card.classList.contains("animate-mouse-hover")) {
        card.classList.add("animate-mouse-hover")
      }
    } else {
      card.classList.remove("animate-mouse-hover")
    }
  })
})

// Contact Form Handler
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const submitBtn = contactForm.querySelector(".submit-btn")
  submitBtn.disabled = true
  submitBtn.textContent = "Sending..."

  // Simulate form submission
  setTimeout(() => {
    formMessage.textContent = "✓ Message sent successfully! I'll get back to you soon."
    formMessage.className = "form-message success"

    contactForm.reset()
    submitBtn.disabled = false
    submitBtn.textContent = "Send Message"

    setTimeout(() => {
      formMessage.textContent = ""
      formMessage.className = ""
    }, 3000)
  }, 1000)
})

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href")
    if (href !== "#") {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  })
})

// GitHub API function to fetch repositories (optional dynamic loading)
async function loadGitHubProjects() {
  try {
    const response = await fetch("https://api.github.com/users/Heerav04/repos?sort=updated&per_page=6")
    const repos = await response.json()

    console.log("[v0] GitHub repos loaded:", repos.length, "repositories")

    // Optional: Update project cards with live GitHub data
    // This can be extended to dynamically update the projects grid
    return repos
  } catch (error) {
    console.log("[v0] GitHub API error (non-critical):", error.message)
    // Portfolio still works with hardcoded projects if API fails
  }
}

// Call on page load (optional, for analytics or future enhancements)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    loadGitHubProjects()
  })
} else {
  loadGitHubProjects()
}
