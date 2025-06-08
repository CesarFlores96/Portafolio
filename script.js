// Configuración y variables globales
const CONFIG = {
    GEMINI_API_KEY: "", // Añade tu API key aquí
    TYPING_SPEED: 150,
    DELETING_SPEED: 50,
    PAUSE_TIME: 2000,
    PARTICLE_COUNT_FACTOR: 9000,
    MOUSE_RADIUS_FACTOR: 110,
  }
  
  // Roles para el efecto de máquina de escribir
  const ROLES = [
    "Ing. de Sistemas",
    "Desarrollado en .NET",
    "Entusiasta de JavaScript",
    "Dominio en Bases de Datos",
    "Apasionado por Python",
    "Creador de Soluciones Innovadoras",
  ]
  
  // Clase para manejar el efecto de máquina de escribir
  class TypewriterEffect {
    constructor(element, texts) {
      this.element = element
      this.texts = texts
      this.textIndex = 0
      this.charIndex = 0
      this.isDeleting = false
      this.init()
    }
  
    init() {
      if (this.element) {
        this.type()
      }
    }
  
    type() {
      const currentText = this.texts[this.textIndex]
      const displayText = this.isDeleting
        ? currentText.substring(0, this.charIndex - 1)
        : currentText.substring(0, this.charIndex + 1)
  
      this.element.innerHTML = `<span class="border-r-2 border-sky-400">${displayText}</span>`
  
      if (this.isDeleting) {
        this.charIndex--
      } else {
        this.charIndex++
      }
  
      let typeSpeed = this.isDeleting ? CONFIG.DELETING_SPEED : CONFIG.TYPING_SPEED
  
      if (!this.isDeleting && displayText === currentText) {
        typeSpeed = CONFIG.PAUSE_TIME
        this.isDeleting = true
      } else if (this.isDeleting && displayText === "") {
        this.isDeleting = false
        this.textIndex = (this.textIndex + 1) % this.texts.length
        typeSpeed = 500
      }
  
      setTimeout(() => this.type(), typeSpeed)
    }
  }
  
  // Clase para manejar las partículas del fondo
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext("2d")
      this.particles = []
      this.mouse = {
        x: null,
        y: null,
        radius: 0,
      }
      this.init()
      this.setupEventListeners()
    }
  
    init() {
      this.resizeCanvas()
      this.createParticles()
      this.animate()
    }
  
    resizeCanvas() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      this.mouse.radius =
        (this.canvas.height / CONFIG.MOUSE_RADIUS_FACTOR) * (this.canvas.width / CONFIG.MOUSE_RADIUS_FACTOR)
    }
  
    setupEventListeners() {
      window.addEventListener("mousemove", (e) => {
        this.mouse.x = e.x
        this.mouse.y = e.y
      })
  
      window.addEventListener("resize", () => {
        this.resizeCanvas()
        this.createParticles()
      })
  
      window.addEventListener("mouseout", () => {
        this.mouse.x = null
        this.mouse.y = null
      })
    }
  
    createParticles() {
      this.particles = []
      const numberOfParticles = (this.canvas.height * this.canvas.width) / CONFIG.PARTICLE_COUNT_FACTOR
  
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1
        const x = Math.random() * (this.canvas.width - size * 2) + size
        const y = Math.random() * (this.canvas.height - size * 2) + size
        const directionX = Math.random() * 0.4 - 0.2
        const directionY = Math.random() * 0.4 - 0.2
  
        this.particles.push(new Particle(x, y, directionX, directionY, size, "#E5E7EB"))
      }
    }
  
    connectParticles() {
      for (let a = 0; a < this.particles.length; a++) {
        for (let b = a + 1; b < this.particles.length; b++) {
          const dx = this.particles[a].x - this.particles[b].x
          const dy = this.particles[a].y - this.particles[b].y
          const distance = dx * dx + dy * dy
          const maxDistance = (this.canvas.width / 7) * (this.canvas.height / 7)
  
          if (distance < maxDistance) {
            const opacity = 1 - distance / 20000
            this.ctx.strokeStyle = `rgba(229, 231, 235, ${opacity})`
            this.ctx.lineWidth = 1
            this.ctx.beginPath()
            this.ctx.moveTo(this.particles[a].x, this.particles[a].y)
            this.ctx.lineTo(this.particles[b].x, this.particles[b].y)
            this.ctx.stroke()
          }
        }
      }
    }
  
    animate() {
      requestAnimationFrame(() => this.animate())
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  
      this.particles.forEach((particle) => particle.update(this.canvas))
      this.connectParticles()
    }
  }
  
  // Clase para las partículas individuales
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x
      this.y = y
      this.directionX = directionX
      this.directionY = directionY
      this.size = size
      this.color = color
    }
  
    draw(ctx) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  
    update(canvas) {
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY
      }
  
      this.x += this.directionX
      this.y += this.directionY
      this.draw(canvas.getContext("2d"))
    }
  }
  
  // Clase para manejar las animaciones de scroll
  class ScrollAnimations {
    constructor() {
      this.observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      })
      this.init()
    }
  
    init() {
      const animatableElements = document.querySelectorAll(".animatable")
      animatableElements.forEach((el) => this.observer.observe(el))
    }
  
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
          this.observer.unobserve(entry.target)
        }
      })
    }
  }
  
  // Clase para manejar los efectos 3D en las tarjetas
  class Card3DEffects {
    constructor() {
      this.init()
    }
  
    init() {
      const skillCards = document.querySelectorAll(".skill-card")
      skillCards.forEach((card) => this.setupCard3D(card))
    }
  
    setupCard3D(card) {
      card.addEventListener("mousemove", (e) => this.handleMouseMove(e, card))
      card.addEventListener("mouseleave", () => this.handleMouseLeave(card))
    }
  
    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const { width, height } = rect
  
      const rotateX = ((y - height / 2) / (height / 2)) * -10
      const rotateY = ((x - width / 2) / (width / 2)) * 10
  
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    }
  
    handleMouseLeave(card) {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    }
  }
  
  // Clase para manejar la integración con Gemini AI
  class GeminiAIIntegration {
    constructor() {
      this.generateBtn = document.getElementById("generate-ideas-btn")
      this.ideasOutput = document.getElementById("ideas-output")
      this.loadingIndicator = document.getElementById("loading-indicator")
      this.errorModal = document.getElementById("error-modal")
      this.errorMessage = document.getElementById("error-message")
      this.init()
    }
  
    init() {
      if (this.generateBtn) {
        this.generateBtn.addEventListener("click", () => this.generateIdeas())
      }
    }
  
    async generateIdeas() {
      this.showLoading()
      this.clearPreviousIdeas()
      this.disableButton()
  
      try {
        const skills = this.extractSkills()
        const ideas = await this.callGeminiAPI(skills)
        this.displayIdeas(ideas)
      } catch (error) {
        console.error("Error al generar ideas:", error)
        this.showError("Hubo un problema al contactar al Asistente de IA. Por favor, inténtalo más tarde.")
      } finally {
        this.hideLoading()
        this.enableButton()
      }
    }
  
    extractSkills() {
      return Array.from(document.querySelectorAll("#skills-container .skill-card h3"))
        .map((s) => s.textContent.trim())
        .join(", ")
    }
  
    async callGeminiAPI(skills) {
      const prompt = `Eres un asistente experto para desarrolladores de software. Basado en las siguientes habilidades: ${skills}, genera 3 ideas de proyectos innovadores y realistas. Para cada idea, proporciona un nombre creativo, una descripción concisa de 1-2 frases que explique el valor del proyecto, y una lista de las tecnologías clave que se utilizarían.`
  
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              proyectos: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    nombre: { type: "STRING" },
                    descripcion: { type: "STRING" },
                    tecnologias: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                    },
                  },
                  required: ["nombre", "descripcion", "tecnologias"],
                },
              },
            },
            required: ["proyectos"],
          },
        },
      }
  
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
  
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`)
      }
  
      const result = await response.json()
  
      if (result.candidates && result.candidates[0].content && result.candidates[0].content.parts.length > 0) {
        return JSON.parse(result.candidates[0].content.parts[0].text).proyectos
      } else {
        throw new Error("La respuesta de la API no tuvo el formato esperado.")
      }
    }
  
    displayIdeas(ideas) {
      ideas.forEach((idea, index) => {
        const technologiesHtml = idea.tecnologias.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")
  
        const ideaCard = this.createIdeaCard(idea, technologiesHtml, index)
        this.ideasOutput.innerHTML += ideaCard
      })
  
      // Animar las nuevas tarjetas
      const newCards = this.ideasOutput.querySelectorAll(".idea-card")
      newCards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("animate-in")
        }, index * 100)
      })
    }
  
    createIdeaCard(idea, technologiesHtml, index) {
      return `
              <div class="idea-card neon-card animatable" style="transition-delay: ${index * 0.1}s">
                  <div class="p-6">
                      <h3 class="text-2xl font-bold mb-2 project-title">${idea.nombre}</h3>
                      <p class="text-gray-400 mb-4">${idea.descripcion}</p>
                      <div class="flex flex-wrap gap-2 mb-4 tech-tags">${technologiesHtml}</div>
                      <div class="mt-4 flex justify-between items-center">
                          <span class="text-sm text-gray-500">💡 Generado por IA</span>
                          <button class="text-sky-400 hover:text-sky-300 font-semibold transition-colors duration-300" onclick="this.parentElement.parentElement.parentElement.style.transform='scale(1.05)'">
                              ⭐ Me gusta
                          </button>
                      </div>
                  </div>
              </div>
          `
    }
  
    showLoading() {
      this.loadingIndicator.classList.remove("hidden")
      this.loadingIndicator.classList.add("flex")
    }
  
    hideLoading() {
      this.loadingIndicator.classList.add("hidden")
      this.loadingIndicator.classList.remove("flex")
    }
  
    clearPreviousIdeas() {
      this.ideasOutput.innerHTML = ""
    }
  
    disableButton() {
      this.generateBtn.disabled = true
      this.generateBtn.style.opacity = "0.6"
    }
  
    enableButton() {
      this.generateBtn.disabled = false
      this.generateBtn.style.opacity = "1"
    }
  
    showError(message) {
      this.errorMessage.textContent = message
      this.errorModal.classList.remove("hidden")
    }
  }
  
  // Clase para manejar efectos adicionales
  class AdvancedEffects {
    constructor() {
      this.init()
    }
  
    init() {
      this.setupSmoothScrolling()
      this.setupParallaxEffects()
      this.setupHoverSounds()
      this.setupKeyboardNavigation()
    }
  
    setupSmoothScrolling() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault()
          const target = document.querySelector(anchor.getAttribute("href"))
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        })
      })
    }
  
    setupParallaxEffects() {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset
        const parallaxElements = document.querySelectorAll(".hero-title")
  
        parallaxElements.forEach((element) => {
          const speed = 0.5
          element.style.transform = `translateY(${scrolled * speed}px)`
        })
      })
    }
  
    setupHoverSounds() {
      // Simulación de efectos de sonido con vibración en dispositivos móviles
      const interactiveElements = document.querySelectorAll(".cta-button, .project-card, .skill-card")
  
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          if (navigator.vibrate) {
            navigator.vibrate(50)
          }
        })
      })
    }
  
    setupKeyboardNavigation() {
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const modal = document.getElementById("error-modal")
          if (!modal.classList.contains("hidden")) {
            modal.classList.add("hidden")
          }
        }
      })
    }
  }
  
  // Clase principal de la aplicación
  class PortfolioApp {
    constructor() {
      this.init()
    }
  
    init() {
      this.setupBasicElements()
      this.initializeComponents()
      this.setupEventListeners()
    }
  
    setupBasicElements() {
      // Actualizar año en el footer
      const yearElement = document.getElementById("year")
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear()
      }
    }
  
    initializeComponents() {
      // Inicializar efecto de máquina de escribir
      const subtitleElement = document.getElementById("subtitle")
      if (subtitleElement) {
        new TypewriterEffect(subtitleElement, ROLES)
      }
  
      // Inicializar sistema de partículas
      const canvas = document.getElementById("particle-canvas")
      if (canvas) {
        new ParticleSystem(canvas)
      }
  
      // Inicializar animaciones de scroll
      new ScrollAnimations()
  
      // Inicializar efectos 3D
      new Card3DEffects()
  
      // Inicializar integración con Gemini AI
      new GeminiAIIntegration()
  
      // Inicializar efectos avanzados
      new AdvancedEffects()
    }
  
    setupEventListeners() {
      // Cerrar modal de error
      const errorModal = document.getElementById("error-modal")
      if (errorModal) {
        errorModal.addEventListener("click", (e) => {
          if (e.target === errorModal) {
            errorModal.classList.add("hidden")
          }
        })
      }
  
      // Efecto de carga de página
      window.addEventListener("load", () => {
        document.body.classList.add("loaded")
        this.showWelcomeAnimation()
      })
  
      // Manejo de errores globales
      window.addEventListener("error", (e) => {
        console.error("Error global capturado:", e.error)
      })
    }
  
    showWelcomeAnimation() {
      const heroSection = document.getElementById("home")
      if (heroSection) {
        heroSection.style.opacity = "0"
        heroSection.style.transform = "translateY(50px)"
  
        setTimeout(() => {
          heroSection.style.transition = "all 1s ease-out"
          heroSection.style.opacity = "1"
          heroSection.style.transform = "translateY(0)"
        }, 100)
      }
    }
  }
  
  // Utilidades adicionales
  const Utils = {
    // Función para detectar si el usuario prefiere movimiento reducido
    prefersReducedMotion() {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    },
  
    // Función para generar colores aleatorios para efectos
    getRandomColor() {
      const colors = ["#38bdf8", "#818cf8", "#06b6d4", "#00f5ff", "#bf00ff", "#39ff14"]
      return colors[Math.floor(Math.random() * colors.length)]
    },
  
    // Función para formatear texto
    formatText(text, maxLength = 100) {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    },
  
    // Función para validar email
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
  
    // Función para copiar texto al portapapeles
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (err) {
        console.error("Error al copiar al portapapeles:", err)
        return false
      }
    },
  }
  
  // Inicializar la aplicación cuando el DOM esté listo
  document.addEventListener("DOMContentLoaded", () => {
    new PortfolioApp()
  })
  
  // Exportar para uso en otros módulos si es necesario
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { PortfolioApp, Utils }
  }
  