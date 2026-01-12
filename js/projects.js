// projects.js - Simplified and Fixed Version

// Project data
let projectsData = [];

// DOM Elements
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectTabs = document.querySelectorAll('.project-tab');
const tabContents = document.querySelectorAll('.project-tab-content');

// Load and render projects
async function loadProjects() {
    try {
        console.log("🚀 Loading projects...");
        
        const response = await fetch('data/projects.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        projectsData = data.projects; // Store globally
        
        console.log(`✅ Loaded ${projectsData.length} projects`);
        
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) {
            throw new Error('Projects grid element not found');
        }
        
        // Clear loading/placeholder content
        projectsGrid.innerHTML = '';
        
        // Render each project
        projectsData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.setAttribute('data-project-id', project.id);
            
            // Create technologies tags
            const techTags = (project.technologies || []).map(tech => 
                `<span class="tag">${tech}</span>`
            ).join('');
            
            // Use image if available, otherwise use icon
            const imageOrIcon = project.image 
                ? `<img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`
                : `<i class="${project.icon || 'fas fa-project-diagram'}"></i>`;
            
            projectCard.innerHTML = `
                <div class="project-img">
                    ${imageOrIcon}
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${techTags}
                    </div>
                    <div class="project-actions">
                        <button class="project-btn view-project" data-project-id="${project.id}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        ${project.github ? `
                        <a href="${project.github}" class="project-btn" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        ` : ''}
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Add click handlers for view buttons
        setTimeout(() => {
            document.querySelectorAll('.view-project').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const projectId = this.getAttribute('data-project-id');
                    const project = projectsData.find(p => p.id == projectId);
                    if (project) {
                        openProjectModal(project);
                    }
                });
            });
            
            // Trigger animations
            initializeProjectAnimations();
        }, 100);
        
    } catch (error) {
        console.error('❌ Error loading projects:', error);
        showErrorInGrid(error);
    }
}

// Show error in projects grid
function showErrorInGrid(error) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
        projectsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--teal);">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3 style="margin-bottom: 15px;">Projects Loading Error</h3>
                <p style="color: var(--light-gray); margin-bottom: 20px;">${error.message}</p>
                <button onclick="window.location.reload()" class="btn">
                    <i class="fas fa-redo"></i> Reload Page
                </button>
            </div>
        `;
    }
}

// Initialize animations
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card:not(.visible)');
    
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        }
    });
}

// Open project modal
function openProjectModal(project) {
    console.log("Opening modal for:", project.title);
    
    if (!projectModal) {
        console.error("Project modal element not found");
        return;
    }
    
    // Set basic project info
    document.getElementById('projectModalTitle').textContent = project.title;
    document.getElementById('projectOverview').textContent = project.overview || project.description;
    
    // Set technologies in modal
    const techContainer = document.getElementById('projectTech');
    if (techContainer) {
        techContainer.innerHTML = '';
        if (project.technologies && Array.isArray(project.technologies)) {
            project.technologies.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = tech;
                techContainer.appendChild(tag);
            });
        }
    }
    
    // Set features
    const featuresContainer = document.getElementById('projectFeatures');
    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        if (project.features && Array.isArray(project.features)) {
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresContainer.appendChild(li);
            });
        }
    }
    
    // Set links
    const githubLink = document.getElementById('projectGitHubLink');
    const liveDemoLink = document.getElementById('liveDemoLink');
    const demoVideoLink = document.getElementById('demoVideoLink');
    const demoNotebookLink = document.getElementById('demoNotebookLink');
    
    if (githubLink) githubLink.href = project.github || '#';
    if (liveDemoLink) liveDemoLink.href = project.liveDemo || '#';
    if (demoVideoLink) demoVideoLink.href = project.demoVideo || '#';
    if (demoNotebookLink) demoNotebookLink.href = project.demoNotebook || '#';
    
    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Switch to overview tab
    switchTab('overview');
}

// Close project modal
function closeProjectModalFunc() {
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Switch between tabs
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    projectTabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`.project-tab[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}Tab`);
    
    if (selectedTab && selectedContent) {
        selectedTab.classList.add('active');
        selectedContent.classList.add('active');
    }
}

// Setup modal functionality
function setupModal() {
    // Close button
    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeProjectModalFunc);
    }
    
    // Close when clicking outside
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModalFunc();
            }
        });
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModalFunc();
        }
    });
    
    // Tab switching
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        });
    });
}

// Initialize everything
function initializeProjects() {
    console.log("🚀 Initializing projects system...");
    
    // Setup modal first
    setupModal();
    
    // Load and render projects
    loadProjects();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
    initializeProjects();
}
