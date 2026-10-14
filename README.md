# OLLIC Immersive Website — combined project

This is the combined project package prepared from Stage 1 and Stage 2. Stage 2 is the newer version of the application and takes precedence for files that changed between the two packages. All Stage 1 project/configuration files are included, along with the actual supplied project image assets.

## Included
- React + TypeScript + Vite application
- Three.js / React Three Fiber / Drei starter scene component
- GSAP + ScrollTrigger animations
- Supabase client and initial `enquiries` table schema
- Netlify build configuration and SPA fallback
- OLLIC Residences — Maitama, Abuja image gallery
- The Grove — Centenary City, Abuja image gallery
- Responsive styling and WhatsApp enquiry fallback

## Run locally
Requires Node.js 20.19+ or 22.12+.

```bash
npm install
cp .env.example .env
npm run dev
```

The website can be previewed without Supabase credentials. Configure `.env` to enable Supabase submissions and direct WhatsApp contact:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_WHATSAPP_NUMBER=
```

Use the public/publishable Supabase client key only. Never place the service-role key in frontend variables.

## Supabase
Run `supabase/schema.sql` in the Supabase SQL Editor. The current policy permits public submissions but does not permit public reading of enquiry records. Configure authenticated admin access separately before building an admin dashboard.

## Netlify deployment
- Build command: `npm run build`
- Publish directory: `dist`
- Import this project from a NEW GitHub repository into Netlify.
- Add the three environment variables in Netlify's site configuration.
- Test the generated Netlify preview URL before connecting the live domain.

## Important notes
- This is a starter build, not yet a verified production deployment. Dependency installation/build verification could not be completed in the preparation environment because the install timed out. Run `npm install` and `npm run build` locally and resolve any reported errors before deploying.
- The current homepage uses the supplied OLLIC project renders and image galleries. The included procedural Three.js house component is retained from Stage 1 as a starter component, but it is not a model of either actual OLLIC development and is not used as a substitute for your project images.
- The current site is a single-page experience. Add real project detail routes, per-page SEO metadata, canonical URLs, sitemap, robots.txt, privacy policy and verified company/project details before production launch.
- The supplied renders are images, not fully interactive 3D model files. True free-rotation and camera navigation requires the original 3D model (preferably `.glb` or `.gltf`).
- Keep the Lovable site and current DNS unchanged until the new Netlify deployment has been tested and approved. Follow the exact DNS records shown by Netlify for your site; do not reuse records from another project.
