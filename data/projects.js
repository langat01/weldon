// projects.js - Complete and Fixed Version

// Project data loaded from JSON
let projectsData = {};

// DOM Elements
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectTabs = document.querySelectorAll('.project-tab');
const tabContents = document.querySelectorAll('.project-tab-content');

// Load projects data and render project cards
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        const projectsGrid = document.getElementById('projectsGrid');
        
        // Clear loading/placeholder content
        projectsGrid.innerHTML = '';
        
        data.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.setAttribute('data-project-id', project.id);
            
            // Create technologies tags
            const techTags = project.technologies.map(tech => 
                `<span class="tag">${tech}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${techTags}
                    </div>
                    <div class="project-actions">
                        <a href="#" class="project-btn view-project" data-project-id="${project.id}">
                            <i class="fas fa-eye"></i> View Details
                        </a>
                        <a href="${project.github}" class="project-btn" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="#" class="project-btn view-report" data-project-id="${project.id}">
                            <i class="fas fa-chart-bar"></i> Report
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Re-initialize scroll animations for newly added cards
        setTimeout(() => {
            const newProjectCards = document.querySelectorAll('.project-card:not(.visible)');
            newProjectCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 150;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Re-attach event listeners to new project buttons
            attachProjectListeners();
        }, 100);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsGrid').innerHTML = `
            <div class="error-message" style="text-align: center; padding: 60px; color: #8892b0; grid-column: 1/-1;">
                <i class="fas fa-exclamation-circle" style="font-size: 64px; margin-bottom: 25px; color: var(--teal);"></i>
                <h3 style="color: var(--teal); margin-bottom: 15px;">Unable to Load Projects</h3>
                <p style="max-width: 500px; margin: 0 auto 25px;">There was an error loading the projects. Please check:</p>
                <ul style="text-align: left; max-width: 500px; margin: 0 auto 30px; color: var(--light-gray);">
                    <li>Your internet connection</li>
                    <li>That the projects.json file exists</li>
                    <li>The browser console for detailed errors</li>
                </ul>
                <button onclick="location.reload()" class="btn" style="background: var(--teal); color: var(--primary-dark);">
                    <i class="fas fa-redo"></i> Try Again
                </button>
            </div>
        `;
    }
}

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    if (project && projectModal) {
        // Set modal content
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectOverview').textContent = project.overview || 'No overview available.';
        document.getElementById('projectReportSummary').textContent = project.reportSummary || 'No report summary available.';
        document.getElementById('projectImpact').textContent = project.impact || 'No impact details available.';
        
        // Set links
        const githubLink = document.getElementById('projectGitHubLink');
        const liveDemoLink = document.getElementById('liveDemoLink');
        const demoVideoLink = document.getElementById('demoVideoLink');
        const demoNotebookLink = document.getElementById('demoNotebookLink');
        
        if (githubLink) githubLink.href = project.github || '#';
        if (liveDemoLink) liveDemoLink.href = project.liveDemo || '#';
        if (demoVideoLink) demoVideoLink.href = project.demoVideo || '#';
        if (demoNotebookLink) demoNotebookLink.href = project.demoNotebook || '#';
        
        // Hide links if no URL is provided
        if (!project.github) githubLink.style.display = 'none';
        if (!project.liveDemo) liveDemoLink.style.display = 'none';
        if (!project.demoVideo) demoVideoLink.style.display = 'none';
        if (!project.demoNotebook) demoNotebookLink.style.display = 'none';
        
        // Set technologies
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
        
        // Set metrics (if available)
        const metricsContainer = document.getElementById('projectMetrics');
        if (metricsContainer && project.metrics && Array.isArray(project.metrics)) {
            metricsContainer.innerHTML = '';
            project.metrics.forEach(metric => {
                const li = document.createElement('li');
                li.textContent = metric;
                metricsContainer.appendChild(li);
            });
        }
        
        // Set challenges (if available)
        const challengesContainer = document.getElementById('projectChallenges');
        if (challengesContainer && project.challenges && Array.isArray(project.challenges)) {
            challengesContainer.innerHTML = '';
            project.challenges.forEach(challenge => {
                const li = document.createElement('li');
                li.textContent = challenge;
                challengesContainer.appendChild(li);
            });
        }
        
        // Set code preview
        const codeElement = document.getElementById('projectCode');
        if (codeElement) {
            codeElement.textContent = project.codePreview || '# Code preview not available';
        }
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset to overview tab
        switchTab('overview');
    } else {
        console.error('Project not found or modal element missing:', projectId);
    }
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

// Attach event listeners to project buttons
function attachProjectListeners() {
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const viewReportButtons = document.querySelectorAll('.view-report');
    
    viewProjectButtons.forEach(button => {
        // Remove existing listeners to avoid duplicates
        button.removeEventListener('click', handleViewProjectClick);
        button.addEventListener('click', handleViewProjectClick);
    });
    
    viewReportButtons.forEach(button => {
        // Remove existing listeners to avoid duplicates
        button.removeEventListener('click', handleViewReportClick);
        button.addEventListener('click', handleViewReportClick);
    });
}

// Handle view project click
function handleViewProjectClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const projectId = this.getAttribute('data-project-id');
    if (projectId) {
        openProjectModal(projectId);
    }
}

// Handle view report click
function handleViewReportClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const projectId = this.getAttribute('data-project-id');
    if (projectId) {
        openProjectModal(projectId);
        
        // Switch to report tab after a short delay
        setTimeout(() => {
            switchTab('report');
        }, 300);
    }
}

// Set up tab switching
function setupTabSwitching() {
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            if (tabName) {
                switchTab(tabName);
            }
        });
    });
}

// Setup modal event listeners
function setupModalListeners() {
    // Close button
    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeProjectModalFunc);
    } else {
        console.warn('closeProjectModal element not found');
    }
    
    // Close modal when clicking outside
    if (projectModal) {
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModalFunc();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
            closeProjectModalFunc();
        }
    });
}

// Load projects data and set up modal
async function initializeProjects() {
    try {
        // Load projects data
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        // Convert array to object with id as key
        if (data.projects && Array.isArray(data.projects)) {
            data.projects.forEach(project => {
                projectsData[project.id] = project;
            });
        }
        
        // Render projects
        await loadProjects();
        
        // Set up modal functionality
        setupTabSwitching();
        setupModalListeners();
        
        console.log('Projects initialized successfully');
        
    } catch (error) {
        console.error('Error initializing projects:', error);
        
        // Show error in the projects grid
        const projectsGrid = document.getElementById('projectsGrid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 60px; color: #8892b0; grid-column: 1/-1;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 64px; margin-bottom: 25px; color: var(--teal);"></i>
                    <h3 style="color: var(--teal); margin-bottom: 15px;">Projects Initialization Failed</h3>
                    <p style="max-width: 500px; margin: 0 auto; color: var(--light-gray);">
                        Failed to load projects. Please check the console for details.
                    </p>
                </div>
            `;
        }
    }
}

// Initialize projects when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProjects);
} else {
    initializeProjects();
}

// Export functions for debugging
window.projectsModule = {
    loadProjects,
    openProjectModal,
    closeProjectModalFunc,
    switchTab,
    initializeProjects,
    projectsData
};
