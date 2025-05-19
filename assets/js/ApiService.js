class ApiService {
    static baseURL = "https://space.kreater.africa/api";

    /**
     * Generic method to make API requests
     * @param {object} config - Configuration object for the request
     * @param {string} config.method - HTTP method (GET, POST, PUT, DELETE)
     * @param {string} config.endpoint - API endpoint
     * @param {object} [config.payload] - Request body data (for POST/PUT)
     * @param {string} [config.baseURL] - Base URL for the API (defaults to ApiService.baseURL)
     * @param {function} [config.callback] - Optional callback function to handle the response
     * @returns {Promise<object>} - Response data
     */
    static async request(
        {
            method,
            endpoint,
            payload = null,
            baseURL = this.baseURL,
            callback = null

        }) {
        try {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (payload) {
                options.body = JSON.stringify(payload);
            }

            // Use the provided baseURL or fall back to the default one
            const requestURL = `${baseURL}${endpoint}`;

            const response = await fetch(requestURL, options);
       

            const responseData = await response.json();

            // Pass the response to the callback
            if (callback && typeof callback === "function") {
                callback(responseData);
            }

            return responseData;
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }

    /**
     * Helper method for GET requests
     * @param {object} config - Configuration object
     */
    static get(config) {
        return this.request({ ...config, method: "GET" });
    }

    /**
     * Helper method for POST requests
     * @param {object} config - Configuration object
     */
    static post(config) {
        return this.request({ ...config, method: "POST" });
    }

    /**
     * Helper method for PUT requests
     * @param {object} config - Configuration object
     */
    static put(config) {
        return this.request({ ...config, method: "PUT" });
    }

    /**
     * Helper method for DELETE requests
     * @param {object} config - Configuration object
     */
    static delete(config) {
        return this.request({ ...config, method: "DELETE" });
    }

    static alert(message, type) {
    let backgroundColor;

    switch (type) {
        case 'success':
            backgroundColor = "#00b09b"; // Green
            break;
        case 'warning':
            backgroundColor = "#f5a623"; // Yellow
            break;
        case 'error':
            backgroundColor = " #ff5f6d"; // Red
            break;
        default:
            backgroundColor = "linear-gradient(to right, #00b09b, #96c93d)"; // Default to green
    }

    Toastify({
        text: message,
        duration: 50000,
        gravity: "top", // Position: top or bottom
        position: "right", // Position: left, center, or right
        backgroundColor: backgroundColor,
    }).showToast();
}
}

export default ApiService;

/**
 * ApiService is a utility class to handle API requests in a consistent way.
 * It provides generic methods for making HTTP requests (GET, POST, PUT, DELETE) and handling responses.
 * 
 * New Feature:
 * - The class now supports overriding the base URL for individual API requests, allowing flexibility
 *   when interacting with different APIs or environments.
 * 
 * Usage:
 * 
 * - To make a request, call one of the helper methods (get, post, put, delete) with a configuration object.
 * - The configuration object must include the HTTP method, endpoint, and optionally, a payload (data for POST/PUT requests).
 * - Optionally, you can provide a custom base URL for the request. If not provided, the default `ApiService.baseURL` (current origin) will be used.
 * 
 * Example:
 * 
 * 1. GET Request:
 *    ApiService.get({
 *      endpoint: '/users/1',
 *      callback: (response) => {
 *        console.log(response); // Handle the response
 *      }
 *    });
 * 
 * 2. POST Request with Custom Base URL:
 *    ApiService.post({
 *      endpoint: '/users',
 *      payload: { name: 'John Doe', email: 'john.doe@example.com' },
 *      baseURL: 'https://api.example.com',  // Custom base URL for this request
 *      callback: (response) => {
 *        console.log(response); // Handle the response
 *      }
 *    });
 *
 * Parameters:
 * - method: The HTTP method to be used (GET, POST, PUT, DELETE).
 * - endpoint: The API endpoint to hit (e.g., '/users', '/posts/1').
 * - payload: The body of the request, used with POST and PUT methods (optional for GET and DELETE).
 * - baseURL: The base URL of the API (optional; defaults to `ApiService.baseURL`, which is the current origin of the page).
 * - callback: An optional callback function to handle the response data (optional).
 *
 * Return:
 * - The response data from the API request (resolved promise).
 * - If an error occurs, it will throw an error with a descriptive message.
 *
 * The helper methods (get, post, put, delete) automatically set the method and make the call to the request method with the provided configuration.
 * If a custom `baseURL` is provided in the configuration, it will override the default base URL for that request.
 * If no `baseURL` is provided, the default base URL (`location.origin`) will be used.
 * 
 * The class is designed to be flexible and reusable, making it easy to handle API requests in a consistent manner.
*/
