# Tommaso Rossino — Portfolio

Personal portfolio website of Tommaso Rossino, Staff Software Engineer.

Built with:

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting started

Requires Node.js and npm.

```bash
npm install
npm run dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start the development server (Turbopack)     |
| `npm run build` | Create a production build                    |
| `npm run start` | Serve the production build                   |
## Deployment

The site is deployed on [Vercel](https://vercel.com/). Every push to `main` triggers an automatic production deploy.

Live site (both URLs serve the same build):

- https://tommasorossino.com
- https://tommaso-rossino.vercel.app

## Chat logs

Site chat conversations can be logged to Upstash Redis and read on a private dashboard at `/admin/chat-logs`. To enable it, add the Upstash integration in Vercel (Storage → Marketplace) so `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set, set `ADMIN_TOKEN` to a long random string, and redeploy. Sign in on the dashboard with that token (or open `/admin/chat-logs?token=...` once). Without Redis credentials logging is a silent no-op; without `ADMIN_TOKEN` the dashboard returns 404. Only coarse geo (country/region/city), user agent, referer and language are stored — never the IP — and at most the latest 500 conversations are kept.

## Project structure

```
src/
  app/          # App Router routes, root layout, global styles
  components/   # UI components (layout, sections, ui, providers)
  data/         # Site content: personal info, experience, projects, skills
  lib/          # Utilities and hooks
  types/        # Shared TypeScript types
public/         # Static assets: images, screenshots, resume PDF
```

Most content changes (bio, experience, projects, skills) only require editing the files in `src/data/`.
