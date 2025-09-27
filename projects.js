/**
 * Photography Projects Gallery Manager
 * Modular and extensible architecture for managing project data, rendering, and interactions
 */

class ProjectsManager {
    constructor(apiService = null) {
        this.projects = [];
        this.currentStates = new Map(); // Track state of each project (gallery open, description open)
        this.initialized = false;
        this.apiService = apiService || window.projectsApi; // Use injected service or global instance
    }

    /**
     * Initialize the projects manager
     */
    init() {
        try {
            this.loadProjectData();
            this.renderProjects();
            this.setupEventListeners();
            this.setupInitialScroll();
            this.initialized = true;
            console.log('Projects Manager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Projects Manager:', error);
        }
    }

    /**
     * Load project data using API service
     */
    loadProjectData() {
        try {
            if (!this.apiService) {
                throw new Error('API service not available');
            }

            this.projects = this.apiService.getProjects();
            
            // Initialize states for each project
            this.projects.forEach(project => {
                this.currentStates.set(project.id, {
                    galleryOpen: false,
                    descriptionOpen: false
                });
            });

            console.log(`Loaded ${this.projects.length} projects via API service`);
        } catch (error) {
            console.error('Error loading project data:', error);
            throw error;
        }
    }

    /**
     * Render all projects to the DOM
     */
    renderProjects() {
        const projectSection = document.querySelector('.project-section');
        if (!projectSection) {
            console.error('Project section not found');
            return;
        }

        projectSection.innerHTML = ''; // Clear existing content
        
        this.projects.forEach((project, index) => {
            const projectElement = this.createProjectElement(project, index);
            projectSection.appendChild(projectElement);
        });
    }

    /**
     * Create a single project element
     */
    createProjectElement(project, index) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        projectDiv.setAttribute('data-project-id', project.id);

        projectDiv.innerHTML = `
            <div class="description-container">
                <h2 class="project-title" data-action="toggle-gallery" data-project-id="${project.id}">
                    ${project.title}
                </h2>
                ${project.description ? `
                    <p class="project-description" data-action="toggle-description" data-project-id="${project.id}">
                        Description
                    </p>
                    <p class="detail-description hidden" data-description="${project.id}">
                        ${this.formatDescription(project.description)}
                    </p>
                ` : ''}
            </div>
            <div class="mainImage-container" data-main-image="${project.id}">
                <img src="${project.coverImage}" 
                     data-action="toggle-gallery" 
                     data-project-id="${project.id}" 
                     alt="${project.title} - Cover Image"
                     loading="lazy">
            </div>
            <div class="horizontal-scroll-container hidden" data-gallery="${project.id}">
                ${this.createGalleryImages(project.galleryImages, project.title)}
            </div>
        `;

        return projectDiv;
    }

    /**
     * Create gallery images HTML
     */
    createGalleryImages(images, projectTitle) {
        return images.map((imageSrc, index) => 
            `<img src="${imageSrc}" 
                  alt="${projectTitle} - Image ${index + 1}"
                  loading="lazy">`
        ).join('');
    }

    /**
     * Format description text with proper line breaks
     */
    formatDescription(description) {
        return description.replace(/\n\n/g, '<br><br>').replace(/\n/g, ' ');
    }

    /**
     * Setup event listeners using event delegation
     */
    setupEventListeners() {
        document.addEventListener('click', (event) => {
            const action = event.target.getAttribute('data-action');
            const projectId = event.target.getAttribute('data-project-id');

            if (!action || !projectId) return;

            switch (action) {
                case 'toggle-gallery':
                    this.toggleGallery(projectId);
                    break;
                case 'toggle-description':
                    this.toggleDescription(projectId);
                    break;
            }
        });

        // Close gallery when clicking on gallery container
        document.addEventListener('click', (event) => {
            if (event.target.hasAttribute('data-gallery')) {
                const projectId = event.target.getAttribute('data-gallery');
                this.toggleGallery(projectId);
            }
        });
    }

    /**
     * Toggle gallery view for a project
     */
    toggleGallery(projectId) {
        const state = this.currentStates.get(projectId);
        if (!state) return;

        const mainImage = document.querySelector(`[data-main-image="${projectId}"]`);
        const gallery = document.querySelector(`[data-gallery="${projectId}"]`);
        const title = document.querySelector(`[data-project-id="${projectId}"][data-action="toggle-gallery"]`);

        if (!mainImage || !gallery || !title) return;

        // Toggle states
        state.galleryOpen = !state.galleryOpen;

        // Apply visual changes
        this.toggleElementVisibility(mainImage, !state.galleryOpen);
        this.toggleElementVisibility(gallery, state.galleryOpen);
        this.toggleElementActive(title, state.galleryOpen);

        // Smooth scroll to project if opening gallery
        if (state.galleryOpen) {
            this.scrollToProject(projectId);
        }
    }

    /**
     * Toggle description view for a project
     */
    toggleDescription(projectId) {
        const state = this.currentStates.get(projectId);
        if (!state) return;

        const description = document.querySelector(`[data-description="${projectId}"]`);
        const descriptionButton = document.querySelector(`[data-project-id="${projectId}"][data-action="toggle-description"]`);

        if (!description || !descriptionButton) return;

        // Toggle states
        state.descriptionOpen = !state.descriptionOpen;

        // Apply visual changes
        this.toggleElementVisibility(description, state.descriptionOpen);
        this.toggleElementActive(descriptionButton, state.descriptionOpen);
    }

    /**
     * Toggle element visibility with animation support
     */
    toggleElementVisibility(element, show) {
        if (show) {
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }

    /**
     * Toggle element active state
     */
    toggleElementActive(element, active) {
        if (active) {
            element.classList.add('clicked');
        } else {
            element.classList.remove('clicked');
        }
    }

    /**
     * Smooth scroll to a specific project
     */
    scrollToProject(projectId) {
        const projectElement = document.querySelector(`[data-project-id="${projectId}"]`).closest('.project');
        if (projectElement) {
            projectElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    /**
     * Setup initial scroll behavior
     */
    setupInitialScroll() {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        });
    }

    /**
     * Get project data by ID (local cache)
     */
    getProject(projectId) {
        return this.projects.find(project => project.id === projectId);
    }

    /**
     * Get project data by ID using API service
     */
    getProjectFromApi(projectId) {
        try {
            return this.apiService.getProjectById(projectId);
        } catch (error) {
            console.error(`Error fetching project ${projectId} from API:`, error);
            return null;
        }
    }

    /**
     * Search projects using API service
     */
    searchProjects(query) {
        try {
            return this.apiService.searchProjects(query);
        } catch (error) {
            console.error('Error searching projects:', error);
            return [];
        }
    }

    /**
     * Get current state of a project
     */
    getProjectState(projectId) {
        return this.currentStates.get(projectId);
    }

    /**
     * Close all open galleries
     */
    closeAllGalleries() {
        this.projects.forEach(project => {
            const state = this.currentStates.get(project.id);
            if (state && state.galleryOpen) {
                this.toggleGallery(project.id);
            }
        });
    }

    /**
     * Close all open descriptions
     */
    closeAllDescriptions() {
        this.projects.forEach(project => {
            const state = this.currentStates.get(project.id);
            if (state && state.descriptionOpen) {
                this.toggleDescription(project.id);
            }
        });
    }

    /**
     * Add a new project (for future extensibility)
     */
    addProject(projectData) {
        this.projects.push(projectData);
        this.currentStates.set(projectData.id, {
            galleryOpen: false,
            descriptionOpen: false
        });
        
        if (this.initialized) {
            this.renderProjects(); // Re-render all projects
        }
    }

    /**
     * Remove a project (for future extensibility)
     */
    removeProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
        this.currentStates.delete(projectId);
        
        if (this.initialized) {
            this.renderProjects(); // Re-render all projects
        }
    }

    /**
     * Update project data (for future extensibility)
     */
    updateProject(projectId, newData) {
        const projectIndex = this.projects.findIndex(project => project.id === projectId);
        if (projectIndex !== -1) {
            this.projects[projectIndex] = { ...this.projects[projectIndex], ...newData };
            
            if (this.initialized) {
                this.renderProjects(); // Re-render all projects
            }
        }
    }

    /**
     * Lazy load images when they come into view
     */
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize the projects manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectsManager = new ProjectsManager();
    window.projectsManager.init();
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectsManager;
}