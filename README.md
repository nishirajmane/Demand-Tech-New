# DemandTech - Next.js + Sanity CMS

A complete Next.js application with Sanity CMS integration for DemandTech, featuring demand generation and marketing solutions.

## 🚀 Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Sanity CMS** for content management
- **Responsive Design** optimized for all devices
- **SEO Optimized** with proper meta tags
- **Blog System** with dynamic routing
- **Case Studies** showcase
- **Resource Library** management
- **Contact API** endpoint

## 📁 Project Structure

```
demandtech/
├── src/
│   └── app/
│       ├── about/
│       │   ├── blogs/
│       │   ├── case-studies/
│       │   ├── clients/
│       │   ├── overview/
│       │   └── resources/
│       ├── api/
│       │   └── contact/
│       ├── pricing/
│       ├── services/
│       │   ├── demand-generation/
│       │   └── marketing/
│       ├── solutions/
│       └── studio/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── lib/
├── sanity/
│   └── schemaTypes/
└── public/
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Sanity

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Copy `.env.local.example` to `.env.local`
3. Update the environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 4. Access Sanity Studio

Visit [http://localhost:3000/studio](http://localhost:3000/studio) to access the Sanity Studio for content management.

## 📝 Content Management

### Sanity Schemas

The project includes the following content types:

- **Posts** - Blog articles with rich text content
- **Authors** - Author profiles with bio and image
- **Case Studies** - Success stories with metrics and results
- **Resources** - Downloadable resources like whitepapers and guides

### Adding Content

1. Navigate to `/studio` in your browser
2. Sign in with your Sanity account
3. Create and publish content using the intuitive interface

## 🎨 Styling

The project uses:

- **Tailwind CSS** for utility-first styling
- **Custom CSS Variables** for brand colors (see `src/app/variables.css`)
- **Responsive Design** with mobile-first approach

### Brand Colors

- Primary Blue: `#2563eb`
- Purple: `#7c3aed`
- Yellow: `#fbbf24`
- Green: `#10b981`
- Orange: `#f97316`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run studio` - Start Sanity Studio development server
- `npm run studio:build` - Build Sanity Studio
- `npm run studio:deploy` - Deploy Sanity Studio

## 📱 Pages

### Main Pages
- **Homepage** (`/`) - Hero section with features and services preview
- **Services** (`/services`) - Service overview with sub-pages
- **Solutions** (`/solutions`) - Solution offerings
- **Pricing** (`/pricing`) - Pricing plans and FAQ
- **About** (`/about`) - Company information with sub-pages

### Service Pages
- **Demand Generation** (`/services/demand-generation`)
- **Marketing Solutions** (`/services/marketing`)

### About Sub-pages
- **Company Overview** (`/about/overview`)
- **Our Clients** (`/about/clients`)
- **Blog & Insights** (`/about/blogs`)
- **Resources** (`/about/resources`)
- **Case Studies** (`/about/case-studies`)

## 🔌 API Routes

- **Contact Form** (`/api/contact`) - POST endpoint for contact form submissions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary to DemandTech.