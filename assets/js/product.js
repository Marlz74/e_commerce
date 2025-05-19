import ApiService from './ApiService.js'; 

// Mock product data to simulate API response
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 59.99,
    image: './assets/images/product1.png',
    category: 'electronics',
    isFlashSale: true,
    isBestSelling: true,
  },
  {
    id: 2,
    name: 'Running Sneakers',
    price: 79.99,
    image: './assets/images/product2.png',
    category: 'fashion',
    isFlashSale: true,
    isBestSelling: false,
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 129.99,
    image: './assets/images/product3.png',
    category: 'electronics',
    isFlashSale: false,
    isBestSelling: true,
  },
  {
    id: 4,
    name: 'Leather Jacket',
    price: 99.99,
    image: './assets/images/product4.png',
    category: 'fashion',
    isFlashSale: true,
    isBestSelling: true,
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 39.99,
    image: './assets/images/product5.jpg',
    category: 'electronics',
    isFlashSale: false,
    isBestSelling: false,
  },
  {
    id: 6,
    name: 'Sunglasses',
    price: 29.99,
    image: './assets/images/product6.jpg',
    category: 'fashion',
    isFlashSale: false,
    isBestSelling: false,
  },
  {
    id: 7,
    name: 'Backpack',
    price: 49.99,
    image: './assets/images/product7.jpg',
    category: 'accessories',
    isFlashSale: true,
    isBestSelling: false,
  },
  {
    id: 8,
    name: 'Gaming Mouse',
    price: 34.99,
    image: './assets/images/product8.jpg',
    category: 'electronics',
    isFlashSale: false,
    isBestSelling: true,
  },
];

class ProductService {
  // Simulate fetching products from API
  static async getProducts() {
    try {
      // For demonstration, return mock data
      // In a real scenario, use ApiService to fetch from the actual API
      // const response = await ApiService.get({ endpoint: '/products' });
      // return response.data;

      return mockProducts;
    } catch (error) {
      ApiService.alert('Failed to fetch products', 'error');
      throw error;
    }
  }

  // Get products for Flash Sales
  static async getFlashSaleProducts() {
    const products = await this.getProducts();
    return products.filter(product => product.isFlashSale);
  }

  // Get products for Best Selling
  static async getBestSellingProducts() {
    const products = await this.getProducts();
    return products.filter(product => product.isBestSelling);
  }

  // Get products for Explore Our Products
  static async getExploreProducts() {
    const products = await this.getProducts();
    return products; // Return all products for this section
  }

  // Render products to a specific container
  static renderProducts(products, containerId) {
    const container = document.querySelector(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Create product cards
    products.forEach(product => {
      const productCard = `
        <div class="bg-white shadow rounded group ">
          <div class="bg-gray-100 p-4 rounded mb-2 relative">
            <img src="${product.image}" alt="${product.name}" class="w-full max-w-[200px] h-[200px] mx-auto object-cover">
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              Add to Cart
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium mb-2">${product.name}</h3>
            <p class="text-red-500 font-bold">$${product.price.toFixed(2)}</p>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', productCard);
    });
  }
}

export default ProductService;