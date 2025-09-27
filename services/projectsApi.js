/**
 * Simple Projects API Service
 * Basic data operations for photography projects
 */

class ProjectsApiService {
    constructor() {
        this.projectsData = null;
    }

    /**
     * Load projects data from direct JavaScript data
     * @returns {Array} Array of project objects
     */
    getProjects() {
        if (this.projectsData) {
            return this.projectsData;
        }

        // Get data from the global projectsData object
        if (typeof window !== 'undefined' && window.projectsData) {
            this.projectsData = window.projectsData.projects;
            return this.projectsData;
        }

        console.error('Projects data not found');
        return [];
    }

    /**
     * Get a single project by ID
     * @param {string} projectId - The project ID to fetch
     * @returns {Object|null} Project object or null if not found
     */
    getProjectById(projectId) {
        const projects = this.getProjects();
        return projects.find(p => p.id === projectId) || null;
    }

    /**
     * Search projects by title or description
     * @param {string} query - Search query
     * @returns {Array} Array of matching projects
     */
    searchProjects(query) {
        const projects = this.getProjects();
        const searchTerm = query.toLowerCase();
        
        return projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) ||
            (project.description && project.description.toLowerCase().includes(searchTerm))
        );
    }
}

// Create and export singleton instance
const projectsApi = new ProjectsApiService();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsApi;
} else if (typeof window !== 'undefined') {
    window.projectsApi = projectsApi;
}

// Export the class as well for potential instantiation
if (typeof module !== 'undefined' && module.exports) {
    module.exports.ProjectsApiService = ProjectsApiService;
} else if (typeof window !== 'undefined') {
    window.ProjectsApiService = ProjectsApiService;
}
