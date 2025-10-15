// shoppingCart.ts

// 1. ENUMS FOR TYPE SAFETY
enum Category {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  BOOKS = 'books',
  EDUCATION = 'education'
}

enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  BUY_ONE_GET_ONE = 'bogo'
}

// 2. CORE INTERFACES
interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// 3. UTILITY TYPES
type ProductPreview = Omit<Product, 'inStock'>;
type ReadonlyProduct = Readonly<Product>;
type PartialProduct = Partial<Omit<Product, 'id'>> & { id: number };

// 4. CUSTOM ERROR TYPES
class ProductNotFoundError extends Error {
  constructor(productId: number) {
    super(`Product with ID ${productId} not found`);
    this.name = 'ProductNotFoundError';
  }
}

class OutOfStockError extends Error {
  constructor(productName: string) {
    super(`Product "${productName}" is out of stock`);
    this.name = 'OutOfStockError';
  }
}

class InsufficientQuantityError extends Error {
  constructor(productName: string, requested: number, available: number) {
    super(`Insufficient quantity for "${productName}". Requested: ${requested}, Available: ${available}`);
    this.name = 'InsufficientQuantityError';
  }
}

// 5. RESULT TYPES FOR BETTER ERROR HANDLING
type AddToCartResult = 
  | { success: true; cart: CartItem[]; message: string }
  | { success: false; error: Error };

type RemoveFromCartResult = 
  | { success: true; cart: CartItem[]; message: string }
  | { success: false; error: Error };

// 6. GENERIC FUNCTIONS
function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}

// 7. REPOSITORY PATTERN WITH GENERICS
class Repository<T extends { id: number }> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  findAll(): T[] {
    return this.items;
  }

  findById(id: number): T | undefined {
    return findById(this.items, id);
  }

  add(item: Omit<T, 'id'>): T {
    const newItem = {
      id: this.generateNextId(),
      ...item
    } as T;
    
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, updates: Partial<T>): T | undefined {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) return undefined;

    this.items[itemIndex] = { ...this.items[itemIndex], ...updates };
    return this.items[itemIndex];
  }

  delete(id: number): boolean {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.id !== id);
    return this.items.length < initialLength;
  }

  private generateNextId(): number {
    return Math.max(0, ...this.items.map(item => item.id)) + 1;
  }
}

// 8. SHOPPING CART IMPLEMENTATION
class ShoppingCart {
  private cart: CartItem[] = [];
  private productRepository: Repository<Product>;

  constructor(productRepository: Repository<Product>) {
    this.productRepository = productRepository;
  }

  addToCart(productId: number, quantity: number = 1): AddToCartResult {
    try {
      if (quantity <= 0) {
        throw new Error('Quantity must be greater than 0');
      }

      const product = this.productRepository.findById(productId);
      if (!product) {
        throw new ProductNotFoundError(productId);
      }

      if (!product.inStock) {
        throw new OutOfStockError(product.name);
      }

      const existingItem = this.cart.find(item => item.product.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({ product, quantity });
      }

      return {
        success: true,
        cart: this.getCart(),
        message: `Added ${quantity} ${product.name}(s) to cart`
      };

    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  removeFromCart(productId: number, quantity: number = 1): RemoveFromCartResult {
    try {
      const itemIndex = this.cart.findIndex(item => item.product.id === productId);
      
      if (itemIndex === -1) {
        throw new ProductNotFoundError(productId);
      }

      const item = this.cart[itemIndex];
      
      if (item.quantity <= quantity) {
        this.cart.splice(itemIndex, 1);
      } else {
        item.quantity -= quantity;
      }

      return {
        success: true,
        cart: this.getCart(),
        message: `Removed ${quantity} ${item.product.name}(s) from cart`
      };

    } catch (error) {
      return {
        success: false,
        error: error as Error
      };
    }
  }

  calculateTotal(): number {
    return this.cart.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  }

  applyDiscount(discountType: DiscountType, value: number): number {
    const total = this.calculateTotal();
    
    switch (discountType) {
      case DiscountType.PERCENTAGE:
        return total - (total * value / 100);
      
      case DiscountType.FIXED_AMOUNT:
        return Math.max(0, total - value);
      
      case DiscountType.BUY_ONE_GET_ONE:
        // Simple BOGO implementation - every second item free
        const bogoTotal = this.cart.reduce((sum, item) => {
          const paidItems = Math.ceil(item.quantity / 2);
          return sum + (item.product.price * paidItems);
        }, 0);
        return bogoTotal;
      
      default:
        return total;
    }
  }

  getCartSummary(): void {
    console.log("Cart Summary:");
    this.cart.forEach(item => {
      const itemTotal = item.product.price * item.quantity;
      console.log(`[${item.product.id}] ${item.product.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`);
    });
    console.log(`Total: $${this.calculateTotal().toFixed(2)}`);
  }

  filterProducts(category?: Category, maxPrice?: number): ProductPreview[] {
    const allProducts = this.productRepository.findAll();
    
    return filterArray(allProducts, product => {
      const categoryMatch = category === undefined || product.category === category;
      const priceMatch = maxPrice === undefined || product.price <= maxPrice;
      return categoryMatch && priceMatch;
    }).map(product => {
      // Convert to ProductPreview (omits inStock)
      const { inStock, ...preview } = product;
      return preview;
    });
  }

  getCart(): CartItem[] {
    return [...this.cart]; // Return copy to prevent direct mutation
  }

  clearCart(): void {
    this.cart = [];
  }

  getItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}

// 9. ADVANCED CONDITIONAL TYPE (BONUS)
type EssentialProduct = {
  [K in keyof Product as K extends 'id' | 'name' ? K : never]: Product[K]
} & Partial<Omit<Product, 'id' | 'name'>>;

// 10. TYPE GUARDS (BONUS)
function isValidProduct(obj: any): obj is Product {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    Object.values(Category).includes(obj.category) &&
    typeof obj.inStock === 'boolean'
  );
}

function isProductPreview(obj: any): obj is ProductPreview {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    Object.values(Category).includes(obj.category) &&
    obj.inStock === undefined // inStock should not be present
  );
}

// 11. USAGE EXAMPLE AND DEMO
function demoShoppingCart(): void {
  // Initialize with sample products
  const initialProducts: Product[] = [
    { id: 1, name: "Laptop", price: 999.99, category: Category.ELECTRONICS, inStock: true },
    { id: 2, name: "TypeScript Book", price: 29.99, category: Category.EDUCATION, inStock: true },
    { id: 3, name: "Headphones", price: 149.99, category: Category.ELECTRONICS, inStock: false },
    { id: 4, name: "T-Shirt", price: 19.99, category: Category.CLOTHING, inStock: true }
  ];

  const productRepo = new Repository<Product>(initialProducts);
  const cart = new ShoppingCart(productRepo);

  console.log("=== SHOPPING CART DEMO ===\n");

  // Test adding items
  console.log("1. Adding items to cart:");
  console.log(cart.addToCart(1, 2)); // Laptop
  console.log(cart.addToCart(2, 1)); // Book
  console.log(cart.addToCart(3, 1)); // Out of stock headphones
  
  console.log("\n2. Cart Summary:");
  cart.getCartSummary();

  console.log("\n3. Discount Calculations:");
  console.log(`10% Discount: $${cart.applyDiscount(DiscountType.PERCENTAGE, 10).toFixed(2)}`);
  console.log(`$50 Fixed Discount: $${cart.applyDiscount(DiscountType.FIXED_AMOUNT, 50).toFixed(2)}`);
  console.log(`BOGO Discount: $${cart.applyDiscount(DiscountType.BUY_ONE_GET_ONE, 0).toFixed(2)}`);

  console.log("\n4. Product Filtering:");
  console.log("Electronics under $200:", cart.filterProducts(Category.ELECTRONICS, 200));
  console.log("All products under $50:", cart.filterProducts(undefined, 50));

  console.log("\n5. Type Guard Demo:");
  const testProduct = initialProducts[0];
  console.log("Is valid product?", isValidProduct(testProduct));
  console.log("Is product preview?", isProductPreview(testProduct));

  console.log("\n6. Generic Repository Demo:");
  const newProduct = productRepo.add({
    name: "New Product",
    price: 39.99,
    category: Category.BOOKS,
    inStock: true
  });
  console.log("Added new product:", newProduct);
}

// Export everything for use in other modules
export {
  Category,
  DiscountType,
  Product,
  CartItem,
  ProductPreview,
  ReadonlyProduct,
  ProductNotFoundError,
  OutOfStockError,
  InsufficientQuantityError,
  Repository,
  ShoppingCart,
  findById,
  filterArray,
  isValidProduct,
  isProductPreview,
  demoShoppingCart
};

// Run demo if this file is executed directly
if (require.main === module) {
  demoShoppingCart();
}