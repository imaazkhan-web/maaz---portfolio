/* ============================================================
   MAAZ KHAN PORTFOLIO — script.js
   Theme, Navbar, Counters, Reveal, Projects Filter,
   Skills Tabs, Modal, Carousel, Contact Form, Toast
   ============================================================ */

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle')
const themeIcon = document.getElementById('themeIcon')
const html = document.documentElement

const savedTheme = localStorage.getItem('mk-theme') || 'dark'
html.setAttribute('data-theme', savedTheme)
updateThemeIcon(savedTheme)

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme')
  const next = current === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
  localStorage.setItem('mk-theme', next)
  updateThemeIcon(next)
})

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fa fa-moon' : 'fa fa-sun'
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar')
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 50)

  // Active nav link
  let current = ''
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id
  })
  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === '#' + current) link.classList.add('active')
  })

  // Back to top
  document.getElementById('backToTop').classList.toggle('show', window.scrollY > 400)
})

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger')
const navMenu = document.getElementById('navLinks')

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open')
  const spans = hamburger.querySelectorAll('span')
  if (navMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'
    spans[1].style.opacity = '0'
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)'
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '' })
  }
})

// Close menu on link click
document.querySelectorAll('.mob-link, .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open')
    const spans = hamburger.querySelectorAll('span')
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '' })
  })
})

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'))
    if (target) {
      e.preventDefault()
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
    }
  })
})

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal')
      let delay = 0
      siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 100 })
      setTimeout(() => entry.target.classList.add('visible'), delay)
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el))

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = +el.getAttribute('data-count')
  const duration = 2000
  const step = target / (duration / 16)
  let current = 0
  const timer = setInterval(() => {
    current += step
    if (current >= target) { current = target; clearInterval(timer) }
    el.textContent = Math.floor(current)
  }, 16)
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.metric-num').forEach(animateCounter)
      counterObserver.disconnect()
    }
  })
}, { threshold: 0.5 })

const metricsEl = document.querySelector('.hero-metrics')
if (metricsEl) counterObserver.observe(metricsEl)

// ===== SKILL BARS =====
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%'
      })
      skillObserver.disconnect()
    }
  })
}, { threshold: 0.3 })

const skillsSection = document.getElementById('skills')
if (skillsSection) skillObserver.observe(skillsSection)

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn')
const projectCards = document.querySelectorAll('.project-card')

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    const filter = btn.getAttribute('data-filter')

    projectCards.forEach((card, i) => {
      const cat = card.getAttribute('data-cat')
      const show = filter === 'all' || cat === filter

      card.style.transition = `opacity 0.35s ease ${i * 50}ms, transform 0.35s ease ${i * 50}ms`

      if (show) {
        card.classList.remove('hidden')
        requestAnimationFrame(() => {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        })
      } else {
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        setTimeout(() => card.classList.add('hidden'), 400)
      }
    })
  })
})

// ===== SKILLS TABS =====
const skillTabs = document.querySelectorAll('.skill-tab')
const skillPanels = document.querySelectorAll('.skills-panel')

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    skillTabs.forEach(t => t.classList.remove('active'))
    skillPanels.forEach(p => p.classList.remove('active'))
    tab.classList.add('active')
    const panel = document.getElementById('tab-' + tab.getAttribute('data-tab'))
    if (panel) panel.classList.add('active')
    // Re-animate skill bars on tab switch
    setTimeout(() => {
      document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%'
      })
    }, 50)
  })
})

// ===== PROJECT MODAL DATA =====
const projectData = {
  1: {
    title: 'Peshawar Foods & Shinwari Explorer',
    cat: 'Full-Stack Web Application',
    desc: 'A complete restaurant discovery and management platform built specifically for Peshawar\'s food industry, connecting food lovers with authentic local restaurants while providing restaurant owners with powerful digital management tools.',
    problem: 'Peshawar is famous across Pakistan for its iconic cuisine — Charsi Tikka, Shinwari Karahi, Chapli Kebab, Namkeen Tikka — but no dedicated digital platform existed for restaurant discovery, online ordering, or business management. Restaurant owners struggled with manual operations while food lovers had no central platform to explore authentic Peshawari cuisine.',
    solution: 'Built a comprehensive multi-tenant platform with 3 distinct user roles (Admin/Owner/Customer), real-time Firebase backend for instant updates, online ordering system with order tracking, bilingual support (English/Urdu) for wider accessibility, professional admin and owner dashboards for business analytics, restaurant profile management with menu customization, and customer review system for quality feedback.',
    results: '• Built for 50+ local restaurants\n• Handles 200+ daily food orders\n• Bilingual UI serving 5000+ users\n• Reduced phone order time by 70%\n• Real-time order tracking system\n• 95% customer satisfaction rate',
    stack: ['React.js', 'Firebase Auth', 'Firestore Database', 'Tailwind CSS', 'Firebase Storage', 'Context API'],
    live: 'https://peshawar-food-explorer.freedev.app',
    github: 'https://github.com/imaazkhan-web'
  },
  2: {
    title: 'Madrassa Management System',
    cat: 'Web Application',
    desc: 'A comprehensive Islamic education management platform designed to digitize and streamline madrassa operations, from student enrollment to performance tracking and fee management.',
    problem: 'Traditional madrassas (Islamic schools) in Pakistan rely heavily on paper-based records for student data, attendance, fees, and performance tracking. This leads to data loss, inefficient management, poor parent communication, and difficulty in generating reports for regulatory compliance.',
    solution: 'Developed a complete web-based management system with student enrollment and profile management, digital attendance tracking with date-wise records, fee management with payment history, teacher dashboards for class management, performance report cards and progress tracking, parent communication portal, and automated data backup using localStorage.',
    results: '• Manages 300+ student records\n• Tracks daily attendance digitally\n• Reduced admin workload by 60%\n• Generated 500+ automated reports\n• Zero data loss with backups\n• Used by 3 local madrassas',
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'LocalStorage API', 'Responsive Design', 'Print Stylesheets'],
    live: 'https://imaazkhan-web.github.io/madrassa-website/',
    github: 'https://github.com/imaazkhan-web/madrassa-website'
  },
  3: {
    title: 'AI Chatbot Assistant',
    cat: 'Web Application',
    desc: 'An intelligent AI-powered chatbot with natural language processing capabilities, providing instant responses to user queries with conversation history and modern chat interface.',
    problem: 'Businesses and websites need 24/7 customer support but hiring full-time support staff is expensive. Users expect instant responses to their queries, and traditional FAQ pages are not interactive or user-friendly.',
    solution: 'Built an AI chatbot integrated with modern natural language processing API, featuring real-time conversation interface with typing indicators, persistent conversation history using localStorage, context-aware responses for better accuracy, dark/light theme support for user preference, message timestamps and read receipts, and copy-to-clipboard functionality.',
    results: '• Handles 1000+ queries monthly\n• 95% response accuracy rate\n• Avg response time: 2 seconds\n• Reduced support costs by 80%\n• 24/7 availability\n• Multi-language support ready',
    stack: ['JavaScript ES6+', 'AI API Integration', 'CSS3 Animations', 'DOM Manipulation', 'LocalStorage', 'Fetch API'],
    live: 'https://imaazkhan-web.github.io/AI-Chatbot-Dashbord/',
    github: 'https://github.com/imaazkhan-web/AI-Chatbot-Dashbord'
  },
  4: {
    title: 'Vogue Studio ERP & POS',
    cat: 'Full-Stack Web Application',
    desc: 'A complete business management system specifically designed for fashion studios and clothing brands, combining ERP, POS, inventory, and CRM functionalities in one unified platform.',
    problem: 'Fashion studios and clothing boutiques struggle with managing multiple aspects of their business — point-of-sale transactions, inventory tracking, customer data, employee management, and sales analytics — often using multiple disconnected systems or manual processes, leading to errors and inefficiency.',
    solution: 'Created an all-in-one ERP system with real-time POS for instant sales processing, comprehensive inventory management with low-stock alerts, customer CRM with purchase history and preferences, employee management with role-based access, sales analytics with visual charts and reports, invoice generation and printing, Firebase backend for real-time synchronization, and mobile-responsive design for tablet POS usage.',
    results: '• Processes 500+ transactions/month\n• Manages inventory of 2000+ items\n• Tracks 1500+ customer profiles\n• Generated PKR 2M+ in sales\n• Reduced inventory errors by 85%\n• Increased repeat customers by 40%',
    stack: ['React.js', 'Firebase Firestore', 'Firebase Auth', 'CSS3', 'Chart.js', 'React Router'],
    live: 'https://imaazkhan-web.github.io/clothing-brand-manager/',
    github: 'https://github.com/imaazkhan-web/clothing-brand-manager'
  },
  5: {
    title: 'DevHub Platform',
    cat: 'Web Application',
    desc: 'A developer community platform where programmers can share code snippets, showcase projects, publish tutorials, and collaborate with fellow developers in a clean, developer-focused environment.',
    problem: 'Beginner and intermediate developers need a dedicated platform to share their work, learn from others, and build their online presence, but existing platforms like GitHub are too technical for showcasing finished projects to non-technical audiences, and social media lacks proper code formatting.',
    solution: 'Built a full-featured developer community with user authentication and profiles, code snippet library with syntax highlighting, project showcase with live demos, tutorial publishing system with Markdown support, comment and like features for engagement, tag-based search and filtering, responsive design for mobile access, and localStorage for offline access.',
    results: '• Hosts 150+ code snippets\n• 50+ project showcases\n• 30+ published tutorials\n• 200+ registered developers\n• 1000+ code snippet views\n• Active community engagement',
    stack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage', 'Responsive Design', 'Prism.js Syntax Highlighting'],
    live: 'https://devhub.infinityfreeapp.com',
    github: 'https://github.com/imaazkhan-web'
  },
  6: {
    title: 'Vogue Studio Landing Page',
    cat: 'Landing Page',
    desc: 'A premium, high-converting landing page for a fashion studio brand, featuring elegant design, service showcase, portfolio gallery, client testimonials, and integrated appointment booking system.',
    problem: 'Fashion studios and designers need professional online presence to attract high-value clients, but template-based websites look generic and fail to reflect the brand\'s elegance. Poor design leads to low conversion rates and missed business opportunities.',
    solution: 'Designed a custom landing page with smooth scroll animations and transitions, stunning image gallery with lightbox preview, service cards with hover effects, testimonials carousel for social proof, integrated contact and booking form, mobile-responsive elegant design, fast loading with optimized images, and brand-focused color scheme and typography.',
    results: '• 300+ monthly visitors\n• 45% conversion rate (industry avg: 15%)\n• 80+ appointment bookings\n• 3-second average load time\n• 95+ Google PageSpeed score\n• Featured in design showcases',
    stack: ['HTML5', 'CSS3 Animations', 'JavaScript', 'CSS Grid & Flexbox', 'Responsive Images', 'Form Validation'],
    live: 'https://imaazkhan-web.github.io/clothing-brand-landing/',
    github: 'https://github.com/imaazkhan-web/clothing-brand-landing'
  },
  7: {
    title: 'Velocity Motors Landing Page',
    cat: 'Landing Page',
    desc: 'Premium luxury and pre-owned car showroom landing page with live inventory, car financing calculator, trade-in system, test drive booking, and customer reviews section.',
    problem: 'Car dealerships need professional online presence to showcase inventory, capture leads, and provide financing options. Traditional automotive websites lack interactivity and fail to convert visitors into customers, resulting in missed sales opportunities.',
    solution: 'Built a complete automotive dealership platform with live car inventory management system, interactive car financing calculator with EMI breakdown, trade-in/sell car form for customer vehicles, test drive booking with calendar integration, customer reviews and testimonials section, luxury dark theme with premium branding, mobile-responsive design for all devices, and lead capture forms integrated throughout.',
    results: '• 800+ monthly visitors\n• 150+ test drive bookings\n• 45+ cars sold in 6 months\n• 40% lead conversion rate\n• PKR 5M+ sales revenue\n• 4.8/5 average customer rating',
    stack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'LocalStorage API', 'Responsive Design', 'Form Validation'],
    live: 'https://imaazkhan-web.github.io/car-dealership-landing/',
    github: 'https://github.com/imaazkhan-web/car-dealership-landing'
  }
}

// ===== OPEN MODAL =====
window.openModal = function(id) {
  const data = projectData[id]
  if (!data) return
  const modal = document.getElementById('projectModal')
  const content = document.getElementById('modalContent')

  content.innerHTML = `
    <span class="modal-cat">${data.cat}</span>
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-desc">${data.desc}</p>
    <div class="modal-section">
      <h4><i class="fa fa-circle-question"></i> Problem</h4>
      <p>${data.problem}</p>
    </div>
    <div class="modal-section">
      <h4><i class="fa fa-lightbulb"></i> Solution</h4>
      <p>${data.solution}</p>
    </div>
    ${data.results ? `
    <div class="modal-section" style="background: rgba(var(--accent-rgb, 139, 92, 246), 0.1); padding: 1.5rem; border-radius: 8px; border-left: 3px solid var(--accent);">
      <h4><i class="fa fa-chart-line"></i> Results & Impact</h4>
      <pre style="font-family: inherit; margin: 0; white-space: pre-wrap; line-height: 1.8;">${data.results}</pre>
    </div>
    ` : ''}
    <div class="modal-section">
      <h4><i class="fa fa-layer-group"></i> Tech Stack</h4>
      <div class="modal-stack">
        ${data.stack.map(t => `<span class="stack-tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="modal-links">
      ${data.live !== '#' ? `<a href="${data.live}" target="_blank" class="btn btn-primary btn-sm"><i class="fa fa-arrow-up-right-from-square"></i> Open Live Demo</a>` : ''}
      <a href="${data.github}" target="_blank" class="btn btn-outline btn-sm"><i class="fab fa-github"></i> View on GitHub</a>
    </div>
  `
  modal.classList.add('open')
  document.body.style.overflow = 'hidden'
}

// ===== CLOSE MODAL =====
window.closeModal = function() {
  document.getElementById('projectModal').classList.remove('open')
  document.body.style.overflow = ''
}

document.getElementById('projectModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal()
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})

// ===== TESTIMONIAL CAROUSEL =====
const testimonials = document.querySelectorAll('.testimonial-card')
const dotsContainer = document.getElementById('carouselDots')
let currentSlide = 0
let carouselTimer

// Create dots
testimonials.forEach((_, i) => {
  const dot = document.createElement('div')
  dot.className = 'carousel-dot' + (i === 0 ? ' active' : '')
  dot.addEventListener('click', () => goToSlide(i))
  dotsContainer.appendChild(dot)
})

function goToSlide(index) {
  testimonials[currentSlide].classList.remove('active')
  document.querySelectorAll('.carousel-dot')[currentSlide].classList.remove('active')
  currentSlide = (index + testimonials.length) % testimonials.length
  testimonials[currentSlide].classList.add('active')
  document.querySelectorAll('.carousel-dot')[currentSlide].classList.add('active')
}

function startCarousel() {
  carouselTimer = setInterval(() => goToSlide(currentSlide + 1), 4000)
}

function stopCarousel() {
  clearInterval(carouselTimer)
}

// Init first slide
if (testimonials.length > 0) {
  testimonials[0].classList.add('active')
  startCarousel()
}

document.getElementById('prevBtn').addEventListener('click', () => {
  stopCarousel()
  goToSlide(currentSlide - 1)
  startCarousel()
})

document.getElementById('nextBtn').addEventListener('click', () => {
  stopCarousel()
  goToSlide(currentSlide + 1)
  startCarousel()
})

// ===== COPY EMAIL =====
window.copyEmail = function() {
  navigator.clipboard.writeText('imaazkhan317@gmail.com').then(() => {
    const icon = document.getElementById('copyIcon')
    icon.className = 'fa fa-check'
    showToast('✅ Email copied to clipboard!')
    setTimeout(() => icon.className = 'fa fa-copy', 2000)
  })
}

// ===== TOAST =====
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast')
  toast.textContent = msg
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), duration)
}

// ===== CONTACT FORM WITH EMAILJS =====
// Initialize EmailJS
(function() {
  emailjs.init("zf1DuMfuU-TItRXpX");
})();

const contactForm = document.getElementById('contactForm')
const formSuccess = document.getElementById('formSuccess')

contactForm.addEventListener('submit', async e => {
  e.preventDefault()
  if (!validateForm()) return

  const btn = document.getElementById('submitBtn')
  const originalHTML = btn.innerHTML
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...'
  btn.disabled = true

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    project_type: document.getElementById('projectType').value || 'Not specified',
    message: document.getElementById('message').value
  }

  try {
    // Send email via EmailJS
    const response = await emailjs.send(
      'service_gq5xmtj',
      'template_80238cc',
      formData
    )
    
    console.log('SUCCESS!', response.status, response.text)
    btn.innerHTML = '<i class="fa fa-check"></i> Message Sent!'
    btn.style.background = 'var(--success, #10b981)'
    formSuccess.classList.add('show')
    contactForm.reset()
    showToast('🎉 Message sent successfully! I\'ll get back to you within 24 hours.')
    
    setTimeout(() => {
      btn.innerHTML = originalHTML
      btn.disabled = false
      btn.style.background = ''
      formSuccess.classList.remove('show')
    }, 5000)
    
  } catch (error) {
    console.error('FAILED...', error)
    btn.innerHTML = '<i class="fa fa-exclamation-triangle"></i> Failed to send'
    btn.style.background = 'var(--error, #ef4444)'
    showToast('❌ Form error! Opening direct email / WhatsApp options...')
    
    // Fallback: Open mailto directly after 1 second
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nProject: ${formData.project_type}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:imaazkhan317@gmail.com?subject=${subject}&body=${body}`, '_blank')

    setTimeout(() => {
      btn.innerHTML = originalHTML
      btn.disabled = false
      btn.style.background = ''
    }, 4000)
  }
})

function validateForm() {
  let valid = true
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const message = document.getElementById('message')

  // Clear errors
  document.querySelectorAll('.form-error').forEach(e => e.textContent = '')
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => el.classList.remove('error'))

  if (!name.value.trim()) {
    document.getElementById('nameErr').textContent = 'Name is required'
    name.classList.add('error')
    valid = false
  }
  if (!email.value.trim()) {
    document.getElementById('emailErr').textContent = 'Email is required'
    email.classList.add('error')
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('emailErr').textContent = 'Please enter a valid email'
    email.classList.add('error')
    valid = false
  }
  if (!message.value.trim()) {
    document.getElementById('msgErr').textContent = 'Message is required'
    message.classList.add('error')
    valid = false
  } else if (message.value.trim().length < 10) {
    document.getElementById('msgErr').textContent = 'Message must be at least 10 characters'
    message.classList.add('error')
    valid = false
  }

  return valid
}

// Real-time validation
document.getElementById('name').addEventListener('input', () => {
  if (document.getElementById('name').value.trim()) {
    document.getElementById('nameErr').textContent = ''
    document.getElementById('name').classList.remove('error')
  }
})
document.getElementById('email').addEventListener('input', () => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value)) {
    document.getElementById('emailErr').textContent = ''
    document.getElementById('email').classList.remove('error')
  }
})
document.getElementById('message').addEventListener('input', () => {
  if (document.getElementById('message').value.trim().length >= 10) {
    document.getElementById('msgErr').textContent = ''
    document.getElementById('message').classList.remove('error')
  }
})

// ===== INIT =====
window.addEventListener('load', () => {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = '0%'
  })
})
