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
      <a href="#gearing">Framework</a>
      <a href="#delegation">Delegation</a>
      <a href="#use-cases">Use Cases</a>
      <a href="#features">Features</a>
    </div>
    <div class="mobile-menu-actions">
      <a href="https://github.com/RedDotRocket/akta" target="_blank">
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

  // Define which nodes are connected to each other - updated for expanded network
  function getConnectedNodes(nodeIndex) {
    const connections = [
      [1, 2, 7, 8, 11],  // node 0 (node-1) connects to key nodes
      [0, 2, 3, 7],      // node 1 (node-2)
      [0, 1, 4, 8],      // node 2 (node-3)
      [1, 5, 9],         // node 3 (node-4)
      [2, 6, 10],        // node 4 (node-5)
      [3, 9, 11],        // node 5 (node-6)
      [4, 10, 11],       // node 6 (node-7)
      [0, 1, 8, 9],      // node 7 (node-8)
      [0, 2, 7, 10],     // node 8 (node-9)
      [3, 5, 7, 11],     // node 9 (node-10)
      [4, 6, 8, 11],     // node 10 (node-11)
      [0, 5, 6, 9, 10]   // node 11 (node-12) connects to multiple nodes
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

  // Create the AKTA robot with advanced design
  if (!document.querySelector('.akta-robot')) {
    const robot = document.createElement('div');
    robot.className = 'akta-robot';

    // Create content container for better positioning
    const content = document.createElement('div');
    content.className = 'akta-robot-content';

    // Use a more distinctive robot icon
    content.innerHTML = '<i class="fas fa-user-astronaut"></i>';

    robot.appendChild(content);
    trustChain.appendChild(robot);
  }

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
    // Original connections
    {source: "1", target: "2"}, // Top to Upper Left
    {source: "1", target: "3"}, // Top to Upper Right
    {source: "2", target: "4"}, // Upper Left to Left Middle
    {source: "3", target: "5"}, // Upper Right to Right Middle
    {source: "4", target: "6"}, // Left Middle to Bottom Left
    {source: "5", target: "7"}, // Right Middle to Bottom Right
    {source: "6", target: "12"}, // Bottom Left to Bottom
    {source: "7", target: "12"}, // Bottom Right to Bottom
    {source: "1", target: "12"}, // Top to Bottom (vertical)

    // Additional connections for new nodes
    {source: "1", target: "8"}, // Top to Upper Left Corner
    {source: "1", target: "9"}, // Top to Upper Right Corner
    {source: "8", target: "2"}, // Upper Left Corner to Upper Left
    {source: "9", target: "3"}, // Upper Right Corner to Upper Right
    {source: "8", target: "10"}, // Upper Left Corner to Lower Left Corner
    {source: "9", target: "11"}, // Upper Right Corner to Lower Right Corner
    {source: "10", target: "6"}, // Lower Left Corner to Bottom Left
    {source: "11", target: "7"}, // Lower Right Corner to Bottom Right
    {source: "10", target: "12"}, // Lower Left Corner to Bottom
    {source: "11", target: "12"}, // Lower Right Corner to Bottom

    // Cross connections
    {source: "2", target: "3"}, // Upper Left to Upper Right
    {source: "4", target: "5"}, // Left Middle to Right Middle
    {source: "6", target: "7"}, // Bottom Left to Bottom Right
    {source: "8", target: "9"}, // Upper Left Corner to Upper Right Corner
    {source: "10", target: "11"}, // Lower Left Corner to Lower Right Corner

    // Diagonal connections
    {source: "2", target: "5"}, // Upper Left to Right Middle
    {source: "3", target: "4"}, // Upper Right to Left Middle
    {source: "8", target: "11"}, // Upper Left Corner to Lower Right Corner
    {source: "9", target: "10"} // Upper Right Corner to Lower Left Corner
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
    .force("link", d3.forceLink(links).distance(120).strength(0.15))
    .force("charge", d3.forceManyBody().strength(-150))
    .force("center", d3.forceCenter(trustChainRect.width / 2, trustChainRect.height / 2))
    .force("collide", d3.forceCollide().radius(45))
    .force("x", d3.forceX(d => {
      // Target positions based on original layout
      const node = d.element;
      if (node.classList.contains('node-1')) return trustChainRect.width / 2;
      if (node.classList.contains('node-2')) return trustChainRect.width * 0.25;
      if (node.classList.contains('node-3')) return trustChainRect.width * 0.75;
      if (node.classList.contains('node-4')) return trustChainRect.width * 0.15;
      if (node.classList.contains('node-5')) return trustChainRect.width * 0.85;
      if (node.classList.contains('node-6')) return trustChainRect.width * 0.25;
      if (node.classList.contains('node-7')) return trustChainRect.width * 0.75;
      if (node.classList.contains('node-8')) return trustChainRect.width * 0.15;
      if (node.classList.contains('node-9')) return trustChainRect.width * 0.85;
      if (node.classList.contains('node-10')) return trustChainRect.width * 0.15;
      if (node.classList.contains('node-11')) return trustChainRect.width * 0.85;
      if (node.classList.contains('node-12')) return trustChainRect.width / 2;
      return trustChainRect.width / 2;
    }).strength(0.1))
    .force("y", d3.forceY(d => {
      // Target positions based on original layout
      const node = d.element;
      if (node.classList.contains('node-1')) return 40 + 25;
      if (node.classList.contains('node-2')) return 120 + 25;
      if (node.classList.contains('node-3')) return 120 + 25;
      if (node.classList.contains('node-4')) return 250 + 25;
      if (node.classList.contains('node-5')) return 250 + 25;
      if (node.classList.contains('node-6')) return trustChainRect.height - 150 - 25;
      if (node.classList.contains('node-7')) return trustChainRect.height - 150 - 25;
      if (node.classList.contains('node-8')) return 180 + 25;
      if (node.classList.contains('node-9')) return 180 + 25;
      if (node.classList.contains('node-10')) return trustChainRect.height - 180 - 25;
      if (node.classList.contains('node-11')) return trustChainRect.height - 180 - 25;
      if (node.classList.contains('node-12')) return trustChainRect.height - 40 - 25;
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

  // Initialize robot animation
  initRobotAnimation();

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

  // Robot Animation Functions
  function initRobotAnimation() {
    const robot = document.querySelector('.akta-robot');
    const padlocks = [];
    let targetNode = null;
    let currentX = trustChainRect.width / 2;
    let currentY = trustChainRect.height / 2;
    let targetX = currentX;
    let targetY = currentY;
    let shootTimeout = null;

         // Position the robot initially
     updateRobotPosition(currentX, currentY);

     // Function to choose a random node as target
     function selectRandomTarget() {
       const availableNodes = Array.from(nodeElements);
       targetNode = availableNodes[Math.floor(Math.random() * availableNodes.length)];
       const nodeRect = targetNode.getBoundingClientRect();
       targetX = nodeRect.left - trustChainRect.left + nodeRect.width/2;
       targetY = nodeRect.top - trustChainRect.top + nodeRect.height/2;

       // Add some randomness to target position for more natural movement
       targetX += (Math.random() - 0.5) * 30;
       targetY += (Math.random() - 0.5) * 30;

       // Rotate robot to face target with slight delay for smoother motion
       setTimeout(() => {
         const angle = Math.atan2(targetY - currentY, targetX - currentX) * 180 / Math.PI;
         robot.style.transform = `rotate(${angle}deg)`;
       }, 100);
     }

     // Function to update robot position with easing
     function updateRobotPosition(x, y) {
       robot.style.left = `${x - 30}px`; // 30 is half the robot width (60px)
       robot.style.top = `${y - 30}px`;
     }

     // Track active animations to limit concurrent animations
     let activeAnimationCount = 0;
     const MAX_CONCURRENT_ANIMATIONS = 3;
     let lastFrameTime = 0;
     let frameCount = 0;
     let throttleFactor = 1;

     // Function to move the robot towards target
     function moveRobot(timestamp) {
       // Calculate frame time for adaptive throttling
       if (lastFrameTime) {
         const frameTime = timestamp - lastFrameTime;
         // Adjust throttling based on frame time
         if (frameCount % 10 === 0) { // Check every 10 frames
           if (frameTime > 30) { // If frame time is high (less than 33fps)
             throttleFactor = Math.min(throttleFactor + 0.1, 3); // Increase throttle up to max 3x
           } else if (frameTime < 16) { // If frame time is low (more than 60fps)
             throttleFactor = Math.max(throttleFactor - 0.1, 1); // Decrease throttle down to min 1x
           }
         }
       }
       lastFrameTime = timestamp;
       frameCount++;

       // Calculate distance to target
       const dx = targetX - currentX;
       const dy = targetY - currentY;
       const distance = Math.sqrt(dx * dx + dy * dy);

       // Calculate angle for rotation
       const angle = Math.atan2(dy, dx) * 180 / Math.PI;
       robot.style.transform = `rotate(${angle}deg)`;

       // If close to target, shoot and select new target
       if (distance < 40) {
         // Only shoot if we're not over the animation limit
         if (activeAnimationCount < MAX_CONCURRENT_ANIMATIONS) {
           // Stop briefly and shoot
           setTimeout(() => {
             shootPadlock();

             // Wait a moment before choosing new target
             setTimeout(selectRandomTarget, 1200 * throttleFactor); // Longer delay when throttling
           }, 200);
         } else {
           // Skip shooting and just select a new target
           setTimeout(selectRandomTarget, 500);
         }

         // Add small random movement while waiting
         currentX += (Math.random() - 0.5) * 2;
         currentY += (Math.random() - 0.5) * 2;
         updateRobotPosition(currentX, currentY);
       } else {
         // Calculate speed based on distance (faster when further)
         const speed = Math.min(0.05, Math.max(0.01, distance / 2000));

         // Move towards target with easing
         currentX += dx * speed;
         currentY += dy * speed;

         // Add slight wobble (reduced)
         if (frameCount % 3 === 0) { // Only apply wobble every 3 frames
           currentX += (Math.random() - 0.5) * 0.4;
           currentY += (Math.random() - 0.5) * 0.4;
         }

         updateRobotPosition(currentX, currentY);

         // Occasionally shoot while moving (much less frequently)
         if (!shootTimeout && Math.random() < 0.001 && activeAnimationCount < MAX_CONCURRENT_ANIMATIONS) {
           shootTimeout = setTimeout(() => {
             shootPadlock();
             shootTimeout = null;
           }, 300);
         }
       }

       // Continue animation
       requestAnimationFrame(moveRobot);
     }

         // Function to create and animate a padlock
     function shootPadlock() {
       // Track active animations
       activeAnimationCount++;
       if (activeAnimationCount > MAX_CONCURRENT_ANIMATIONS) {
         activeAnimationCount--;
         return; // Skip animation if too many active
       }

       // Create a padlock element
       const padlock = document.createElement('div');
       padlock.className = 'padlock';
       padlock.innerHTML = '<i class="fas fa-lock"></i>';
       padlock.style.left = `${currentX - 15}px`; // 15 is half the padlock width
       padlock.style.top = `${currentY - 15}px`;
       trustChain.appendChild(padlock);

       // Play an enhanced transform on the robot when shooting
       const rotationAngle = Math.atan2(targetY - currentY, targetX - currentX) * 180 / Math.PI;
       robot.style.transform = `rotate(${rotationAngle}deg) scale(1.2)`;

       // Create a flash effect when shooting
       const robotContent = robot.querySelector('.akta-robot-content');
       if (robotContent) {
         robotContent.style.filter = 'brightness(1.5)';
       }

       setTimeout(() => {
         robot.style.transform = `rotate(${rotationAngle}deg) scale(1)`;
         if (robotContent) {
           robotContent.style.filter = '';
         }
       }, 200);

       // Calculate trajectory
       const nodeRect = targetNode.getBoundingClientRect();
       const targetNodeX = nodeRect.left - trustChainRect.left + nodeRect.width/2;
       const targetNodeY = nodeRect.top - trustChainRect.top + nodeRect.height/2;
       const angle = Math.atan2(targetNodeY - currentY, targetNodeX - currentX);

       // Add slight arc to trajectory (reduced arc height)
       const arcHeight = Math.random() * 20 + 10;

       // Pre-calculate distance and other constants
       const distance = Math.sqrt(
         Math.pow(targetNodeX - currentX, 2) +
         Math.pow(targetNodeY - currentY, 2)
       );

       // Use animation frames more efficiently with time steps
       let lastTimestamp = 0;
       let progress = 0;
       const speed = 0.08; // Faster animation to reduce active time

       const animatePadlock = (timestamp) => {
         // Use time delta for smooth animation regardless of frame rate
         const delta = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0.016; // 16ms default if first frame
         lastTimestamp = timestamp;

         // Increment progress based on time delta and speed
         progress += speed * delta * 60; // normalize to 60fps

         if (progress >= 1) {
           // Remove padlock and cleanup
           padlock.remove();

           // Flash the node
           targetNode.classList.add('node-flash');

           // Add a simple transform
           targetNode.style.transform = 'scale(1.2)';
           setTimeout(() => {
             targetNode.style.transform = '';
           }, 150);

           setTimeout(() => {
             targetNode.classList.remove('node-flash');
           }, 500);

           // Create simplified burst effect
           createBurstEffect(targetNodeX, targetNodeY);

           // Decrement active animations
           activeAnimationCount--;
           return;
         }

         // Calculate current position with arc (more efficient calculation)
         const currentDistance = distance * progress;
         const arcOffset = Math.sin(progress * Math.PI) * arcHeight;

         const x = currentX + Math.cos(angle) * currentDistance;
         const y = currentY + Math.sin(angle) * currentDistance - arcOffset;

         // Update padlock position
         padlock.style.left = `${x - 15}px`;
         padlock.style.top = `${y - 15}px`;

         // Simpler rotation logic
         const rotationAngle = angle * 180 / Math.PI + (progress * 360); // Half as many rotations
         padlock.style.transform = `rotate(${rotationAngle}deg) scale(${1 + progress * 0.3})`;

         // Continue animation
         requestAnimationFrame(animatePadlock);
       };

       // Start animation
       requestAnimationFrame(animatePadlock);
     }

     // Create a simplified burst effect when padlock hits a node
     function createBurstEffect(x, y) {
       // Create fewer particles (4 instead of 8)
       for (let i = 0; i < 4; i++) {
         const particle = document.createElement('div');
         particle.className = 'padlock';
         particle.style.width = '10px'; // Smaller particles
         particle.style.height = '10px';
         particle.style.opacity = '0.7';
         particle.innerHTML = '<i class="fas fa-certificate"></i>';
         particle.style.left = `${x - 5}px`;
         particle.style.top = `${y - 5}px`;
         trustChain.appendChild(particle);

         // Calculate particle angle
         const angle = (i / 4) * Math.PI * 2;

         // Use CSS animations for particles instead of JS animation
         const distance = 40; // Fixed distance
         const particleX = x + Math.cos(angle) * distance;
         const particleY = y + Math.sin(angle) * distance;

         // Set up CSS transition
         particle.style.transition = 'all 0.5s ease-out';

         // Trigger animation in next frame
         setTimeout(() => {
           particle.style.left = `${particleX - 5}px`;
           particle.style.top = `${particleY - 5}px`;
           particle.style.opacity = '0';
           particle.style.transform = 'scale(0.5)';

           // Remove after animation completes
           setTimeout(() => {
             particle.remove();
           }, 500);
         }, 10);
       }
     }

    // Start the robot animation with initial target
    selectRandomTarget();
    moveRobot();
  }
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

  // Initialize gearing visualization
  initGearingVisualization();

  // Listen for theme changes to update connections
  themeToggleBtn.addEventListener('click', () => {
    // Reconnect after theme change
    setTimeout(() => {
      initD3Connections();
    }, 200);
  });
});

// Epicyclic Gearing Visualization
function initGearingVisualization() {
  // Only initialize if the element exists
  const container = document.getElementById('gearing-visualization');
  if (!container) return;

  // Create SVG element
  const svg = d3.create("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [-0.53, -0.53, 1.06, 1.06])
    .attr("stroke", "var(--text-color)")
    .attr("stroke-width", 1 / 640)
    .attr("style", "max-width: 100%; height: 100%;");

  // Create a frame for rotation
  const frame = svg.append("g");

  // Set up gear data
  const gearData = [
    {fill: "var(--card-bg-color)", teeth: 80, radius: -0.5, origin: [0, 0], annulus: true, label: "", type: "outer"},
    {fill: "var(--primary-color)", teeth: 16, radius: +0.1, origin: [0, 0], label: "AKTA", type: "center"},
    {fill: "var(--secondary-color)", teeth: 32, radius: -0.2, origin: [0, -0.3], label: "VERIFY", type: "inner"},
    {fill: "var(--secondary-color)", teeth: 32, radius: -0.2, origin: [-0.3 * Math.sin(2 * Math.PI / 3), -0.3 * Math.cos(2 * Math.PI / 3)], label: "DELEGATE", type: "inner"},
    {fill: "var(--secondary-color)", teeth: 32, radius: -0.2, origin: [0.3 * Math.sin(2 * Math.PI / 3), -0.3 * Math.cos(2 * Math.PI / 3)], label: "AUDIT", type: "inner"}
  ];

  // Create gears
  const path = frame.selectAll("path")
    .data(gearData)
    .join("path")
      .attr("fill", d => d.fill)
      .attr("d", d => gear({...d, toothRadius: 0.008, holeRadius: 0.02}));

  // Append the SVG to the container
  container.appendChild(svg.node());

  // Add text labels
  const labelContainer = d3.select(container);
  
  // Add gear labels
  gearData.forEach((d, i) => {
    if (d.label) {
      const labelClass = d.type === "center" ? "center-label" : "outer-label";
      
      labelContainer.append("div")
        .attr("class", `gear-label ${labelClass} label-${i}`)
        .style("left", `calc(50% + ${d.origin[0] * 350}px)`)
        .style("top", `calc(50% + ${d.origin[1] * 350}px)`)
        .text(d.label);
    }
  });
  
  // Animation loop
  let angle = 0;
  let frameAngle = 0;
  const speed = 0.08;
  const frameRadius = -0.5; // Same as the outermost gear radius
  
  function animate() {
    // Update gear positions
    path.attr("transform", d => `translate(${d.origin}) rotate(${(angle / d.radius) % 360})`);
    frame.attr("transform", `rotate(${frameAngle % 360})`);
    
    // Update label positions
    gearData.forEach((d, i) => {
      if (d.label) {
        const rotatedAngle = frameAngle + (angle / d.radius);
        if (d.type === "center") {
          d3.select(`.label-${i}`)
            .style("transform", `translate(-50%, -50%)`);
        } else {
          const radians = (frameAngle * Math.PI / 180);
          const originX = d.origin[0] * Math.cos(radians) - d.origin[1] * Math.sin(radians);
          const originY = d.origin[0] * Math.sin(radians) + d.origin[1] * Math.cos(radians);
          
          d3.select(`.label-${i}`)
            .style("left", `calc(50% + ${originX * 350}px)`)
            .style("top", `calc(50% + ${originY * 350}px)`)
            .style("transform", `translate(-50%, -50%) rotate(${-rotatedAngle}deg)`);
        }
      }
    });
    
    // Increment angles
    angle += speed;
    frameAngle += speed / frameRadius;
    
    // Continue animation
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Update colors on theme change
  themeToggleBtn.addEventListener('click', () => {
    setTimeout(() => {
      path.attr("stroke", "var(--text-color)");
      path.each(function(d, i) {
        if (i === 0) d3.select(this).attr("fill", "var(--card-bg-color)");
        else if (i === 1) d3.select(this).attr("fill", "var(--primary-color)");
        else d3.select(this).attr("fill", "var(--secondary-color)");
      });
    }, 100);
  });

  // Gear path generator function
  function gear({teeth, radius, annulus, toothRadius, holeRadius}) {
    const n = teeth;
    let r2 = Math.abs(radius);
    let r0 = r2 - toothRadius;
    let r1 = r2 + toothRadius;
    let r3 = holeRadius;
    if (annulus) r3 = r0, r0 = r1, r1 = r3, r3 = r2 + toothRadius * 3;
    const da = Math.PI / n;
    let a0 = -Math.PI / 2 + (annulus ? Math.PI / n : 0);
    const path = ["M", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)];
    let i = -1;
    while (++i < n) {
      path.push(
        "A", r0, ",", r0, " 0 0,1 ", r0 * Math.cos(a0 += da), ",", r0 * Math.sin(a0),
        "L", r2 * Math.cos(a0), ",", r2 * Math.sin(a0),
        "L", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
        "A", r1, ",", r1, " 0 0,1 ", r1 * Math.cos(a0 += da / 3), ",", r1 * Math.sin(a0),
        "L", r2 * Math.cos(a0 += da / 3), ",", r2 * Math.sin(a0),
        "L", r0 * Math.cos(a0), ",", r0 * Math.sin(a0)
      );
    }
    path.push("M0,", -r3, "A", r3, ",", r3, " 0 0,0 0,", r3, "A", r3, ",", r3, " 0 0,0 0,", -r3, "Z");
    return path.join("");
  }
}