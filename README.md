# SNI Laptops - Premium E-commerce Website

A stunning, modern 2025-style e-commerce website for SNI laptops built with React and Tailwind CSS.

## ✨ Features

### 🏠 Home Page
- **Hero Section**: Eye-catching gradient background with floating animations
- **Advanced Search & Filter**: Real-time search with category and price filters
- **Laptop Grid**: Interactive cards with hover effects and detailed specs
- **Features Section**: Highlighting key selling points

### 📖 About Us Page
- **Company Story**: Engaging narrative about SNI's journey
- **Core Values**: Innovation, Quality, and Customer Focus
- **Impressive Stats**: Key metrics and achievements
- **Team Section**: Meet the brilliant minds behind SNI

### 🔍 Warranty Checker
- **Dual Input Methods**: Manual serial number entry or image upload
- **Smart Processing**: Mock OCR simulation for image processing
- **Detailed Results**: Complete warranty information with progress tracking
- **Help Section**: Support resources and guidance

## 🎨 Design Features

### Modern 2025 Aesthetics
- **Dark Theme**: Deep navy to electric blue gradients
- **Glassmorphism**: Backdrop blur effects and translucent elements
- **Premium Typography**: Inter font family with gradient text effects
- **Electric Accents**: Cyan and purple highlights throughout

### Smooth Animations
- **Micro-interactions**: Hover effects, scale transforms, and color transitions
- **Floating Elements**: Subtle background animations
- **Page Transitions**: Smooth fade-in and slide-up effects
- **Loading States**: Elegant spinners and progress indicators

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large buttons and intuitive navigation
- **Flexible Layouts**: Grid systems that adapt to content

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd LaptopWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🛠️ Tech Stack

- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing for SPA navigation
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **PostCSS**: CSS processing with autoprefixer
- **Custom Animations**: CSS keyframes and transitions

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header with mobile menu
│   ├── Hero.js         # Hero section with animations
│   ├── SearchAndFilter.js # Advanced search and filtering
│   ├── LaptopCard.js   # Individual laptop product cards
│   └── WarrantyChecker.js # Warranty checking functionality
├── pages/              # Main page components
│   ├── Home.js         # Homepage with product grid
│   ├── About.js        # About us page
│   └── Warranty.js     # Warranty checker page
├── data/               # Static data and mock data
│   └── laptops.js      # Product data and categories
├── App.js              # Main app component with routing
├── index.js            # React app entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Components

### Header Component
- Sticky navigation with glassmorphism effect
- Mobile-responsive hamburger menu
- Active page highlighting
- Smooth scroll behavior

### Search and Filter
- Real-time search functionality
- Category filtering (Gaming, Professional, Content Creation)
- Price range filtering
- Collapsible filter interface

### Laptop Cards
- Hover animations with scale and glow effects
- Detailed specifications display
- Rating and review information
- Add to cart and wishlist actions

### Warranty Checker
- Tabbed interface for input methods
- Image upload with drag-and-drop styling
- Mock API simulation with loading states
- Comprehensive warranty result display

## 🎨 Custom Styling

### Tailwind Configuration
- Custom color palette for SNI branding
- Extended animations and keyframes
- Glassmorphism utility classes
- Gradient text and border utilities

### CSS Utilities
- `.glass`: Backdrop blur with transparency
- `.gradient-text`: Cyan to purple text gradients
- `.btn-primary`: Primary button styling
- `.card-hover`: Hover effects for cards

## 🔧 Customization

### Colors
Update the color palette in `tailwind.config.js`:
```javascript
colors: {
  'sni-blue': '#1e3a8a',
  'sni-cyan': '#00d4ff',
  'sni-purple': '#6366f1',
  'sni-dark': '#0f172a',
  'sni-navy': '#1e293b',
}
```

### Animations
Modify animations in the same config file or add new keyframes in `index.css`.

### Content
Update product data in `src/data/laptops.js` to reflect your actual inventory.

## 🚀 Next Steps

### Backend Integration
- Replace mock data with real API calls
- Implement user authentication
- Add shopping cart functionality
- Integrate payment processing

### Enhanced Features
- Product comparison tool
- Customer reviews and ratings
- Live chat support
- Inventory management
- Order tracking

### Performance Optimization
- Image optimization and lazy loading
- Code splitting and lazy loading
- Service worker for offline functionality
- CDN integration for static assets

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Design inspiration from premium tech brands like Apple, Razer, and ASUS ROG
- Tailwind CSS for the excellent utility-first framework
- React community for the amazing ecosystem
- Modern web design trends for 2025 aesthetic guidance

---

Built with ❤️ for the future of e-commerce
