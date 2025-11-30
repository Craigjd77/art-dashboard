# Sneaker Collection - Full Stack E-commerce Website

A full-stack web application for displaying and selling a collection of 200+ pairs of sneakers. Built with Node.js, Express, SQLite, and vanilla JavaScript.

## Features

- **Product Catalog**: Browse 200+ pairs of sneakers with filtering and search
- **Product Details**: View detailed information with multiple image views
- **Image Gallery**: Thumbnail navigation and image carousel
- **Shopping Cart**: Add items to cart and manage quantities
- **Admin Panel**: Add new shoes and upload multiple images
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Brand Filtering**: Filter by brand (Nike, New Balance, adidas, etc.)
- **Price Display**: Shows both selling price and original MSRP

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **File Upload**: Multer
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome

## Installation

1. **Install Dependencies**
   ```bash
   cd shoe-store
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Main Store: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin.html
   - Shopping Cart: http://localhost:3000/cart.html

## Usage

### Adding Shoes (Admin Panel)

1. Navigate to the Admin panel
2. Fill in the shoe details:
   - Brand (e.g., Nike, New Balance, adidas)
   - Model (e.g., Dunk Low, 990v5, Ultraboost)
   - Description (optional)
   - Original MSRP
   - Selling Price
   - Size (defaults to 9)
   - Gender (defaults to Mens)
   - Condition
3. Click "Add Shoe"
4. Upload multiple images (first image becomes primary)
5. Images will be stored in the `uploads/` directory

### Shopping

1. Browse the collection on the home page
2. Use search and filters to find specific shoes
3. Click on any shoe to view details
4. View multiple images using thumbnails or navigation arrows
5. Add items to cart
6. Manage cart items and proceed to checkout

## Project Structure

```
shoe-store/
├── server.js              # Express server and API routes
├── package.json           # Dependencies and scripts
├── shoes.db              # SQLite database (created automatically)
├── uploads/              # Uploaded shoe images
├── public/               # Frontend files
│   ├── index.html        # Home page / product listing
│   ├── product.html      # Product detail page
│   ├── cart.html         # Shopping cart
│   ├── admin.html         # Admin panel
│   ├── styles.css        # Main stylesheet
│   ├── app.js            # Home page JavaScript
│   ├── product.js        # Product page JavaScript
│   ├── cart.js           # Cart JavaScript
│   └── admin.js          # Admin panel JavaScript
└── README.md             # This file
```

## API Endpoints

### Shoes
- `GET /api/shoes` - Get all shoes (with query params: brand, search, sort, order)
- `GET /api/shoes/:id` - Get single shoe with all images
- `POST /api/shoes` - Add new shoe (admin)
- `GET /api/brands` - Get all unique brands

### Images
- `POST /api/shoes/:id/images` - Upload images for a shoe
- `PUT /api/shoes/:id/images/:imageId/primary` - Set primary image
- `DELETE /api/shoes/:id/images/:imageId` - Delete image

### Cart
- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:sessionId/:itemId` - Remove item from cart

## Database Schema

### shoes
- id (INTEGER PRIMARY KEY)
- brand (TEXT)
- model (TEXT)
- description (TEXT)
- msrp (REAL)
- price (REAL)
- size (TEXT)
- gender (TEXT)
- condition (TEXT)
- created_at (DATETIME)

### shoe_images
- id (INTEGER PRIMARY KEY)
- shoe_id (INTEGER, FOREIGN KEY)
- image_path (TEXT)
- is_primary (INTEGER)
- display_order (INTEGER)

### cart
- id (INTEGER PRIMARY KEY)
- session_id (TEXT)
- shoe_id (INTEGER, FOREIGN KEY)
- quantity (INTEGER)
- created_at (DATETIME)

## Notes

- All shoes default to Size 9 Mens
- Images are stored locally in the `uploads/` directory
- Session-based cart (stored in localStorage)
- Database is created automatically on first run
- Maximum file size for images: 10MB
- Supported image formats: JPG, PNG, GIF, WebP

## Future Enhancements

- Payment integration (Stripe, PayPal)
- User authentication
- Order management system
- Email notifications
- Product reviews and ratings
- Wishlist functionality
- Advanced search filters
- Bulk import/export

## License

ISC

