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
      <a href="https://github.com/your-github/akta" target="_blank">
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
  
  // Calculate center point of each node
  const nodeData = Array.from(nodeElements).map(node => {
    const rect = node.getBoundingClientRect();
    const trustChain = document.querySelector('.trust-chain').getBoundingClientRect();
    
    return {
      id: node.getAttribute('data-node-id'),
      x: rect.left - trustChain.left + rect.width/2,
      y: rect.top - trustChain.top + rect.height/2,
      width: rect.width,
      height: rect.height,
      element: node
    };
  });
  
  // Define connections (which nodes should be connected)
  const connections = [
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
  
  // Clear existing connections
  svg.selectAll("*").remove();
  
  // Create a map for quick node lookup
  const nodeMap = {};
  nodeData.forEach(node => {
    nodeMap[node.id] = node;
  });
  
  // Add lines for connections
  const lines = connections.map((connection, index) => {
    const source = nodeMap[connection.source];
    const target = nodeMap[connection.target];
    
    if (source && target) {
      // Create line
      const line = svg.append("line")
        .attr("x1", source.x)
        .attr("y1", source.y)
        .attr("x2", target.x)
        .attr("y2", target.y)
        .attr("class", "connection-line")
        .attr("id", `connection-${source.id}-${target.id}`);
      
      return {
        element: line,
        source: source,
        target: target
      };
    }
    return null;
  }).filter(line => line !== null);
  
  // Create envelopes (instead of particles) for each connection
  connections.forEach((connection, index) => {
    const source = nodeMap[connection.source];
    const target = nodeMap[connection.target];
    
    if (source && target) {
      // Create an envelope icon for the particle
      const envelope = svg.append("text")
        .attr("class", "data-particle")
        .attr("x", source.x)
        .attr("y", source.y)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("font-family", "FontAwesome")
        .attr("font-size", "10px")
        .text("\uf0e0"); // FontAwesome envelope icon
      
      // Calculate angle for proper envelope orientation
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Animate envelope along the path
      function animateEnvelope() {
        envelope
          .attr("opacity", 0)
          .attr("x", source.x)
          .attr("y", source.y)
          .attr("transform", `rotate(${angle}, ${source.x}, ${source.y})`)
          .transition()
          .duration(2000)
          .delay(index * 300)
          .attr("opacity", 1)
          .attr("x", target.x)
          .attr("y", target.y)
          .attr("transform", `rotate(${angle}, ${target.x}, ${target.y})`)
          .transition()
          .duration(200)
          .attr("opacity", 0)
          .on("end", animateEnvelope);
      }
      
      // Start animation
      animateEnvelope();
    }
  });
  
  // Implement dragging functionality
  nodeElements.forEach(node => {
    let isDragging = false;
    let offsetX, offsetY;
    const nodeId = node.getAttribute('data-node-id');
    const nodeData = nodeMap[nodeId];
    
    // Mouse down event to start dragging
    node.addEventListener('mousedown', function(e) {
      isDragging = true;
      
      // Calculate offset from the center of the node
      const rect = node.getBoundingClientRect();
      offsetX = e.clientX - rect.left - rect.width / 2;
      offsetY = e.clientY - rect.top - rect.height / 2;
      
      // Add active class for styling
      node.classList.add('active-node');
      
      e.preventDefault();
    });
    
    // Mouse move event to update position while dragging
    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const trustChain = document.querySelector('.trust-chain').getBoundingClientRect();
      
      // Calculate new position relative to the trust chain container
      let newX = e.clientX - trustChain.left - offsetX - node.offsetWidth / 2;
      let newY = e.clientY - trustChain.top - offsetY - node.offsetHeight / 2;
      
      // Keep node within container bounds
      newX = Math.max(0, Math.min(trustChain.width - node.offsetWidth, newX));
      newY = Math.max(0, Math.min(trustChain.height - node.offsetHeight, newY));
      
      // Update node position
      node.style.left = `${newX}px`;
      node.style.top = `${newY}px`;
      node.style.right = 'auto';
      node.style.bottom = 'auto';
      node.style.transform = 'none';
      
      // Update nodeData position
      nodeData.x = newX + node.offsetWidth / 2;
      nodeData.y = newY + node.offsetHeight / 2;
      
      // Update connected lines
      lines.forEach(line => {
        if (line.source.id === nodeId) {
          line.element
            .attr("x1", nodeData.x)
            .attr("y1", nodeData.y);
        }
        if (line.target.id === nodeId) {
          line.element
            .attr("x2", nodeData.x)
            .attr("y2", nodeData.y);
        }
      });
    });
    
    // Mouse up event to stop dragging
    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        node.classList.remove('active-node');
      }
    });
  });
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
    // Initialize D3 connections separately after nodes are positioned
    setTimeout(initD3Connections, 100);
  }, 300);
  
  // Listen for theme changes to update connections
  themeToggleBtn.addEventListener('click', () => {
    setTimeout(() => {
      initD3Connections();
    }, 100);
  });
}); 