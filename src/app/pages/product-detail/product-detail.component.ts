import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SupabaseService, Product } from '../../services/supabase.service';
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
    private supabaseService: SupabaseService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      try {
        this.product = await this.supabaseService.getProductBySlug(slug);
        if (this.product) {
          this.selectedImage = this.product.images[0];
          this.specKeys = Object.keys(this.product.specifications || {});
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
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
