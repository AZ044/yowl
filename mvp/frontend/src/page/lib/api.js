// API Configuration
const API_BASE_URL = 'http://localhost:3001';

// Store token in localStorage
export const TokenManager = {
    get: () => localStorage.getItem('authToken'),
    set: (token) => localStorage.setItem('authToken', token),
    remove: () => localStorage.removeItem('authToken'),
    isLoggedIn: () => !!localStorage.getItem('authToken')
};

// API Helper function
export async function apiRequest(endpoint, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    // Add auth token if available
    const token = TokenManager.get();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.msg || 'Request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication API
export const AuthAPI = {
    register: async (email, password, pseudo) => {
        const data = await apiRequest('/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, pseudo }),
        });
        if (data.token) {
            TokenManager.set(data.token);
        }
        return data;
    },

    login: async (email, password) => {
        const data = await apiRequest('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (data.token) {
            TokenManager.set(data.token);
        }
        return data;
    },

    logout: () => {
        TokenManager.remove();
    }
};

// Thread API
export const ThreadAPI = {
    // Get all threads
    getAll: async () => {
        return await apiRequest('/thread');
    },

    // Get thread with posts by UUID
    getById: async (uuid) => {
        return await apiRequest(`/thread/${uuid}`);
    },

    // Get single post by UUID
    getPostById: async (uuid) => {
        return await apiRequest(`/thread/post/${uuid}`);
    },

    // Create new thread (requires auth)
    create: async (title, description) => {
        return await apiRequest('/thread', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
        });
    },

    // Create post in thread (requires auth)
    createPost: async (thread_uuid, message) => {
        return await apiRequest('/thread/post', {
            method: 'POST',
            body: JSON.stringify({ thread_uuid, message }),
        });
    }
};
