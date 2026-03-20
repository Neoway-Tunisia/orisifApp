import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { SupabaseService, Product } from '../../services/supabase.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, BreadcrumbsComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';
  specKeys: string[] = [];
  activeTab: 'description' | 'specifications' = 'description';
  
  // Lightbox properties
  isLightboxOpen: boolean = false;
  lightboxIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private seoService: SeoService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      try {
        this.product = await this.supabaseService.getProductBySlug(slug);
        if (this.product) {
          this.selectedImage = this.product.images[0];
          this.specKeys = Object.keys(this.product.specifications || {});
          this.updateSeoTags();
        } else {
          // No product found with this slug
          this.handleProductNotFound();
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        this.handleProductNotFound();
      }
    } else {
      this.handleProductNotFound();
    }
  }

  private handleProductNotFound() {
    // Redirect to catalog or home
    this.router.navigate(['/catalogue']);
  }

  updateSeoTags() {
    if (!this.product) return;

    const keywords = `${this.product.name}${this.product.marques ? ', ' + this.product.marques : ''}, Biosan Tunisie, Orisif, Equipement de laboratoire Tunisie`;

    this.seoService.updateTags(
      `${this.product.name} - Orisif Tunisie`,
      this.product.description.substring(0, 160),
      this.product.images[0],
      `https://orisif.com/produit/${this.product.slug}`,
      keywords
    );

    // Structured Data (JSON-LD)
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.product.name,
      "image": this.product.images,
      "description": this.product.description,
      "brand": {
        "@type": "Brand",
        "name": this.product.marques || "Orisif"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://orisif.com/produit/${this.product.slug}`,
        "availability": "https://schema.org/InStock"
      }
    };
    this.seoService.setJsonLd(productSchema);
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    document.body.style.overflow = 'auto';
  }

  nextImage(event: Event) {
    event.stopPropagation();
    if (this.product && this.product.images.length > 0) {
      this.lightboxIndex = (this.lightboxIndex + 1) % this.product.images.length;
    }
  }

  prevImage(event: Event) {
    event.stopPropagation();
    if (this.product && this.product.images.length > 0) {
      this.lightboxIndex = (this.lightboxIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  setActiveTab(tab: 'description' | 'specifications') {
    this.activeTab = tab;
  }

  scrollToDescription() {
    this.activeTab = 'description';
    const element = document.getElementById('myTab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
