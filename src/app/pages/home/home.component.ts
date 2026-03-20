import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService, Product } from '../../services/supabase.service';
import { SeoService } from '../../services/seo.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  isLoading: boolean = true;

  constructor(
    private supabaseService: SupabaseService,
    private seoService: SeoService
  ) {}

  async ngOnInit() {
    this.seoService.setDefaults();
    this.injectOrganizationSchema();
    this.isLoading = true;
    try {
      this.featuredProducts = await this.supabaseService.getFeaturedProducts();
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private injectOrganizationSchema() {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Orisif",
      "url": "https://orisif.com",
      "logo": "https://orisif.com/assets/img/OrisifColor.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+21654453439",
        "contactType": "customer service",
        "areaServed": "TN",
        "availableLanguage": "French"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tunis",
        "addressCountry": "TN"
      }
    };
    this.seoService.setJsonLd(organizationSchema);
  }
}
