// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const body = document.body;
const sections = document.querySelectorAll('.section');
const favicon = document.getElementById('favicon');

// Theme Toggle Functionality
function initTheme() {
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

function applyTheme(theme) {
  if (theme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    if (favicon) {
      favicon.href = 'static/akta-logo-dark.png';
    }
  } else {
    body.removeAttribute('data-theme');
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    if (favicon) {
      favicon.href = 'static/akta-logo-light.png';
    }
  }
}

function toggleTheme() {
  if (body.getAttribute('data-theme') === 'dark') {
    localStorage.setItem('theme', 'light');
    applyTheme('light');
  } else {
    localStorage.setItem('theme', 'dark');
    applyTheme('dark');
  }
}

// Mobile Menu Functionality
function toggleMobileMenu() {
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  
  // If mobile menu already exists, toggle its visibility
  const existingMenu = document.querySelector('.mobile-menu');
  if (existingMenu) {
    existingMenu.classList.toggle('active');
    return;
  }
  
  // Create mobile menu structure
  mobileMenu.innerHTML = `
    <div class="mobile-menu-links">
      <a href="#overview">Overview</a>
      <a href="#challenge">Challenge</a>
      <a href="#concepts">Concepts</a>
      <a href="#delegation">Delegation</a>
      <a href="#use-cases">Use Cases</a>
      <a href="#features">Features</a>
      <a href="#contributing">Contributing</a>
    </div>
    <div class="mobile-menu-actions">
      <a href="https://github.com/akta" target="_blank">
        <i class="fab fa-github"></i> GitHub
      </a>
      <button id="mobile-theme-toggle">
        <i class="fas fa-moon"></i> Toggle Theme
      </button>
    </div>
  `;
  
  // Append menu to body
  body.appendChild(mobileMenu);
  
  // Add active class to show menu
  mobileMenu.classList.add('active');
  
  // Add event listeners for menu items
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });
  
  // Mobile theme toggle
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  mobileThemeToggle.addEventListener('click', () => {
    toggleTheme();
    updateMobileThemeButton();
  });
  
  updateMobileThemeButton();
}

function updateMobileThemeButton() {
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  if (mobileThemeToggle) {
    if (body.getAttribute('data-theme') === 'dark') {
      mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Toggle Theme';
    } else {
      mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Toggle Theme';
    }
  }
}

// Scroll Animation
function handleScrollAnimation() {
  // Get position details for all sections
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.75;
    
    if (sectionTop < triggerPoint) {
      section.classList.add('visible');
    }
  });
}

// Parallax Effect for Hero Section
function handleParallaxEffect() {
  const hero = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  const heroShape = document.querySelector('.hero-shape');
  const scrollY = window.scrollY;
  
  if (hero && heroContent && heroShape) {
    const heroHeight = hero.offsetHeight;
    const heroContentTranslate = scrollY * 0.4;
    const heroShapeTranslate = scrollY * 0.2;
    
    if (scrollY < heroHeight) {
      heroContent.style.transform = `translateY(${heroContentTranslate}px)`;
      heroShape.style.transform = `translateY(${heroShapeTranslate}px)`;
    }
  }
}

// Card hover effects
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.concept-card, .use-case-card, .feature-card, .contribute-card, .involved-option');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate angle based on mouse position relative to card center
      const angleX = (mouseY - cardCenterY) / 20;
      const angleY = (cardCenterX - mouseX) / 20;
      
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Sticky Header
function handleStickyHeader() {
  const header = document.querySelector('header');
  const scrollY = window.scrollY;
  
  if (scrollY > 0) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}

// Add scroll indicator hide on scroll
function handleScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const scrollY = window.scrollY;
  
  if (scrollIndicator) {
    if (scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '0.8';
    }
  }
}

// Custom cursor effect (disabled)
function initCustomCursor() {
  // Function disabled - cursor removed
}

// Animation for trust chain data exchange
function initTrustChainAnimation() {
  const nodes = document.querySelectorAll('.node');
  const dataParticles = document.querySelectorAll('.data-particle');
  
  // Update data-particle colors based on theme
  function updateParticleColors() {
    const theme = document.body.getAttribute('data-theme') || 'light';
    const particleColor = theme === 'dark' ? '#ffffff' : '#000000';
    
    dataParticles.forEach(particle => {
      particle.style.backgroundColor = particleColor;
    });
  }
  
  // Call once on init
  updateParticleColors();
  
  // Update colors when theme changes
  themeToggleBtn.addEventListener('click', () => {
    setTimeout(updateParticleColors, 100); // Short delay to ensure theme has changed
  });
  
  // Randomly activate nodes to simulate data exchange
  function activateRandomNode() {
    // Deactivate all nodes first
    nodes.forEach(node => node.classList.remove('active-node'));
    
    // Choose a random node to activate
    const randomIndex = Math.floor(Math.random() * nodes.length);
    nodes[randomIndex].classList.add('active-node');
    
    // Simulate data transmission to connected nodes
    setTimeout(() => {
      // Find adjacent nodes based on network topology
      const connectedNodes = getConnectedNodes(randomIndex);
      
      // Activate connected nodes
      connectedNodes.forEach(nodeIndex => {
        nodes[nodeIndex].classList.add('active-node');
      });
    }, 300);
  }
  
  // Define which nodes are connected to each other - updated for X pattern
  function getConnectedNodes(nodeIndex) {
    const connections = [
      [1, 2, 3, 4, 5],  // node 0 (node-1) connects to all other nodes in X pattern
      [0, 3, 5],        // node 1 (node-2) connects to nodes 0, 3, and 5
      [0, 4, 5],        // node 2 (node-3) connects to nodes 0, 4, and 5
      [0, 1, 5],        // node 3 (node-4) connects to nodes 0, 1, and 5
      [0, 2, 5],        // node 4 (node-5) connects to nodes 0, 2, and 5
      [0, 1, 2, 3, 4]   // node 5 (node-6) connects to all other nodes in X pattern
    ];
    
    return connections[nodeIndex] || [];
  }
  
  // Initialize D3 connections
  initD3Connections();
  
  // Start the animation sequence
  setInterval(activateRandomNode, 3000);
  
  // Initialize with a first activation
  setTimeout(activateRandomNode, 1000);
}

// Function to create SVG connections with D3.js
function initD3Connections() {
  // Get all the nodes
  const nodeElements = document.querySelectorAll('.node');
  const svg = d3.select('#connections-svg');
  const trustChain = document.querySelector('.trust-chain');
  const trustChainRect = trustChain.getBoundingClientRect();
  
  // Clear any existing content
  svg.selectAll("*").remove();
  
  // Create data structures for D3 force simulation
  const nodeData = Array.from(nodeElements).map(node => {
    const rect = node.getBoundingClientRect();
    
    return {
      id: node.getAttribute('data-node-id'),
      x: rect.left - trustChainRect.left + rect.width/2,
      y: rect.top - trustChainRect.top + rect.height/2,
      width: rect.width,
      height: rect.height,
      element: node,
      fx: null, // Fixed position x (used during dragging)
      fy: null  // Fixed position y (used during dragging)
    };
  });
  
  // Define connections (which nodes should be connected)
  const linkData = [
    {source: "1", target: "2"}, // Top to Left Middle
    {source: "1", target: "3"}, // Top to Right Middle
    {source: "2", target: "4"}, // Left Middle to Left Bottom
    {source: "3", target: "5"}, // Right Middle to Right Bottom
    {source: "4", target: "6"}, // Left Bottom to Bottom
    {source: "5", target: "6"}, // Right Bottom to Bottom
    {source: "1", target: "6"}, // Top to Bottom (vertical)
    {source: "2", target: "3"}, // Left Middle to Right Middle
    {source: "4", target: "5"}, // Left Bottom to Right Bottom
    {source: "2", target: "5"}, // Diagonal Left Middle to Right Bottom
    {source: "3", target: "4"}  // Diagonal Right Middle to Left Bottom
  ];
  
  // Create a node lookup map
  const nodeById = {};
  nodeData.forEach(node => {
    nodeById[node.id] = node;
  });
  
  // Transform the link data to use the actual node objects
  const links = linkData.map(link => ({
    source: nodeById[link.source],
    target: nodeById[link.target]
  }));
  
  // Create the D3 force simulation
  const simulation = d3.forceSimulation(nodeData)
    .force("link", d3.forceLink(links).distance(100).strength(0.2))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(trustChainRect.width / 2, trustChainRect.height / 2))
    .force("collide", d3.forceCollide().radius(40))
    .force("x", d3.forceX(d => {
      // Target positions based on original layout
      const node = d.element;
      if (node.classList.contains('node-1')) return trustChainRect.width / 2;
      if (node.classList.contains('node-2')) return trustChainRect.width * 0.25;
      if (node.classList.contains('node-3')) return trustChainRect.width * 0.75;
      if (node.classList.contains('node-4')) return trustChainRect.width * 0.25;
      if (node.classList.contains('node-5')) return trustChainRect.width * 0.75;
      if (node.classList.contains('node-6')) return trustChainRect.width / 2;
      return trustChainRect.width / 2;
    }).strength(0.1))
    .force("y", d3.forceY(d => {
      // Target positions based on original layout
      const node = d.element;
      if (node.classList.contains('node-1')) return 20 + 25;
      if (node.classList.contains('node-2')) return 140 + 25;
      if (node.classList.contains('node-3')) return 140 + 25;
      if (node.classList.contains('node-4')) return trustChainRect.height - 140 - 25;
      if (node.classList.contains('node-5')) return trustChainRect.height - 140 - 25;
      if (node.classList.contains('node-6')) return trustChainRect.height - 20 - 25;
      return trustChainRect.height / 2;
    }).strength(0.1))
    .alphaTarget(0)
    .alphaDecay(0.05);
  
  // Create SVG elements for the links
  const link = svg.selectAll(".connection-line")
    .data(links)
    .enter()
    .append("line")
    .attr("class", "connection-line")
    .attr("stroke-width", 2);
  
  // Create data particle animations with manual animation
  const envelopes = [];
  
  // Create envelope animation - just one per connection
  links.forEach((link, index) => {
    // Create one envelope per link
    const envelope = svg.append("text")
      .attr("class", "data-particle")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-family", "FontAwesome")
      .attr("font-size", "10px")
      .attr("opacity", 0)
      .text("\uf0e0"); // FontAwesome envelope icon
    
    // Add to our tracking array with animation properties
    envelopes.push({
      element: envelope,
      source: link.source,
      target: link.target,
      progress: 0, // Start at the beginning
      speed: 0.0005, // Consistent speed
      delay: index * 500 // Stagger the animations
    });
  });
  
  // Animation timer for smooth animations
  let lastTimestamp = 0;
  function animateEnvelopes(timestamp) {
    // Calculate time delta for smooth animation regardless of frame rate
    const delta = lastTimestamp ? timestamp - lastTimestamp : 0;
    lastTimestamp = timestamp;
    
    // Update each envelope
    envelopes.forEach(env => {
      // Only start after delay
      env.delay -= delta;
      if (env.delay > 0) return;
      
      // Update progress (loop from 0 to 1)
      env.progress += env.speed * delta;
      if (env.progress > 1) {
        // Reset to beginning after completing path
        env.progress = 0;
        // Add a pause between animations
        env.delay = 1000;
        // Hide envelope during pause
        env.element.attr("opacity", 0);
        return;
      }
      
      // Calculate current position along the path
      const currentX = env.source.x + (env.target.x - env.source.x) * env.progress;
      const currentY = env.source.y + (env.target.y - env.source.y) * env.progress;
      
      // Calculate angle for rotation
      const dx = env.target.x - env.source.x;
      const dy = env.target.y - env.source.y;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Full opacity in the middle, fade at ends
      let opacity = 1;
      if (env.progress < 0.1) opacity = env.progress * 10; // Fade in
      else if (env.progress > 0.9) opacity = (1 - env.progress) * 10; // Fade out
      
      // Update envelope position and rotation
      env.element
        .attr("x", currentX)
        .attr("y", currentY)
        .attr("opacity", opacity)
        .attr("transform", `rotate(${angle}, ${currentX}, ${currentY})`);
    });
    
    // Continue animation loop
    requestAnimationFrame(animateEnvelopes);
  }
  
    // Start animation loop
  requestAnimationFrame(animateEnvelopes);
  
  // Implement manual drag handling for direct DOM elements
  nodeElements.forEach(element => {
    let isDragging = false;
    const nodeId = element.getAttribute('data-node-id');
    const node = nodeById[nodeId];
    
    // Mouse/touch down event to start dragging
    element.addEventListener('mousedown', startDrag);
    element.addEventListener('touchstart', e => {
      e.preventDefault();
      startDrag(e.touches[0]);
    });
    
    function startDrag(e) {
      isDragging = true;
      simulation.alphaTarget(0.3).restart();
      
      // Fix the node position during drag
      node.fx = node.x;
      node.fy = node.y;
      
      // Add active class for styling
      element.classList.add('active-node');
      
      // Prevent default behavior
      e.preventDefault();
    }
    
    // Mouse/touch move event to update position
    document.addEventListener('mousemove', moveElement);
    document.addEventListener('touchmove', e => {
      if (isDragging) e.preventDefault();
      moveElement(e.touches[0]);
    });
    
    function moveElement(e) {
      if (!isDragging) return;
      
      // Get mouse/touch position relative to the trust chain container
      const rect = trustChain.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update the fixed position
      node.fx = Math.max(25, Math.min(trustChainRect.width - 25, x));
      node.fy = Math.max(25, Math.min(trustChainRect.height - 25, y));
      
      // Restart the simulation
      simulation.alpha(0.3).restart();
    }
    
    // Mouse/touch up event to stop dragging
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function endDrag() {
      if (!isDragging) return;
      
      isDragging = false;
      
      // Release the fixed position for elastic rebound
      node.fx = null;
      node.fy = null;
      
      // Remove active class
      element.classList.remove('active-node');
      
      // Let simulation continue with reduced energy
      simulation.alphaTarget(0);
    }
  });
  
  // Drag handlers are now implemented directly on DOM elements
  
  // Simulation tick function - updates positions of everything
  simulation.on("tick", () => {
    // Update link positions
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    // Update HTML node positions
    nodeData.forEach(node => {
      const element = node.element;
      // Position from center of node
      element.style.left = `${node.x - node.width/2}px`;
      element.style.top = `${node.y - node.height/2}px`;
      element.style.transform = 'none';
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    });
  });
  
  // Add a resize handler
  window.addEventListener('resize', () => {
    // Recalculate positions on resize
    const newRect = trustChain.getBoundingClientRect();
    simulation.force("center", d3.forceCenter(newRect.width / 2, newRect.height / 2));
    simulation.alpha(0.3).restart();
  });
  
  // Initialize node positions and start simulation
  nodeData.forEach(node => {
    // Set initial positions based on CSS
    const element = node.element;
    const rect = element.getBoundingClientRect();
    node.x = rect.left - trustChainRect.left + rect.width/2;
    node.y = rect.top - trustChainRect.top + rect.height/2;
  });
  
  // Start simulation with high alpha for initial arrangement
  simulation.alpha(1).restart();
}

// Recalculate connections when window is resized
window.addEventListener('resize', function() {
  // Wait for nodes to reposition before recalculating connections
  setTimeout(initD3Connections, 300);
});

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Event listeners
  themeToggleBtn.addEventListener('click', toggleTheme);
  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  
  // Initialize scroll animations
  handleScrollAnimation();
  
  // Add 3D card effects on desktop
  if (window.innerWidth > 992) {
    initCardHoverEffects();
    initCustomCursor();
  }
  
  // Add scroll event listeners
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
    handleStickyHeader();
    handleParallaxEffect();
    handleScrollIndicator();
  });
  
  // Show hero section immediately
  document.querySelector('.hero-section').classList.add('animate-fade-in');
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && e.target !== mobileMenuBtn) {
      mobileMenu.classList.remove('active');
    }
  });
  
  // Initialize trust chain animation with a slight delay to ensure nodes are positioned
  setTimeout(() => {
    initTrustChainAnimation();
    
    // Initialize D3 connections with physics simulation
    setTimeout(() => {
      initD3Connections();
      // Mark trust chain as initialized to show nodes with transition
      document.querySelector('.trust-chain').classList.add('initialized');
    }, 300);
  }, 500);
  
  // Listen for theme changes to update connections
  themeToggleBtn.addEventListener('click', () => {
    // Reconnect after theme change
    setTimeout(() => {
      initD3Connections();
    }, 200);
  });
}); 