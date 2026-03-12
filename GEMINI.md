# Orisif Medical Laboratory - Angular App Documentation

## 1. Project Context
Angular 19 migration of the "Karma" template for **Orisif**, a medical laboratory equipment supplier. The app serves as a professional virtual catalog integrated with Supabase.

## 2. Branding & Visual Identity
- **Primary Color:** `#01766E` (Medical Teal). Defined as `--primary-color`.
- **Secondary Color:** `#02a196` (Vibrant Teal). Used for "Devis" buttons for better visibility.
- **Background Shade:** `#f4f4f4` (Light Grey). Defined as `--bg-shade`.
- **Hero/Breadcrumb Overlay:** `src/assets/img/backgroundOrisif.png` with a consistent 50% black overlay (`rgba(0, 0, 0, 0.5)`).
- **Logos:**
  - Color: `src/assets/img/OrisifColor.png` (Used when header is sticky/white).
  - White: `src/assets/img/OrisifWhite.png` (Used on transparent hero backgrounds).

## 3. Tech Stack
- **Framework:** Angular 19 (Standalone components).
- **Backend:** Supabase (Auth/Database/Storage).
- **Styling:** Global `styles.scss` with specific component-level overrides for modern UI.

## 4. UI/UX Features & Component Logic
- **Header**: 
  - Dynamic sticky behavior (transparent to white).
  - Mobile menu with dark text visibility fixes and collapsible functionality.
- **Product Cards**:
  - **Grid**: 4 items/row on Desktop, 2 items/row on Mobile (`col-6`).
  - **Design**: Sharp corners (`border-radius: 0`), full-bleed images (`object-fit: cover`), and modern "pop-up" hover effects.
  - **Actions**: "Détails" (Outline) and "Devis" (Solid) buttons fixed to the bottom row.
- **Product Detail**:
  - **Layout**: Details on Left, Images on Right (Swaps on mobile).
  - **Gallery**: Professional lightbox slideshow with full-screen navigation and counter.
  - **Description**: Truncated top description with smooth-scroll "Lire la suite" link.
- **Catalog**:
  - **Sidebar**: Collapsible "Catégories" toggle on mobile.
  - **Search**: Functional real-time search filtering.
  - **Pagination**: Dynamic bottom pagination (9 items/page).

## 5. Supabase Integration & Security
- **Service:** `SupabaseService` (`src/app/services/supabase.service.ts`).
- **Data Source:** `products` table.
- **Security (Critical):** 
  - Uses **Row Level Security (RLS)**. 
  - `SELECT` is authorized for `anon` (public). 
  - `INSERT/UPDATE/DELETE` are strictly restricted to authenticated roles or disabled for public keys.
- **Image Strategy:** Public URLs from Supabase Storage are stored in the `images` array.

## 6. Critical Operational Notes
- **Memory Management:** Always run Angular CLI with increased memory limit:
  ```bash
  node --max-old-space-size=1024 node_modules/@angular/cli/bin/ng serve
  ```
- **Build Configuration:** Assets are mapped in `angular.json` from `src/assets` and `public`.

## 7. Developer Guidelines
- **No E-commerce:** Cart and Price features must remain disabled.
- **Language:** All UI labels must be in French.
- **Styling Standards:** 
  - Maintain sharp corners for containers/cards.
  - Buttons should use pill shapes (`border-radius: 25px`).
  - Standardize 50% overlay for all hero banners.
