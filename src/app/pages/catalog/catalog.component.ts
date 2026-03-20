import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService, Product } from '../../services/supabase.service';
import { SeoService } from '../../services/seo.service';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BreadcrumbsComponent, ProductCardComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  categories: string[] = ['Tout'];
  selectedCategory: string = 'Tout';
  isCategoryCollapsed: boolean = true;
  isLoading: boolean = true;
  
  // Search and Pagination
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 9;
  totalPages: number = 1;

  constructor(
    private supabaseService: SupabaseService,
    private seoService: SeoService
  ) {}

  async ngOnInit() {
    this.seoService.updateTags(
      "Orisif - Fournisseur de solutions et d'équipements de laboratoire en Tunisie",
      "Découvrez notre catalogue complet d'équipements de laboratoire : Biosan, micropipettes, et solutions de haute technologie pour votre laboratoire.",
      "assets/img/backgroundOrisif.png",
      "https://orisif.com/catalogue"
    );
    this.isLoading = true;
    try {
      this.products = await this.supabaseService.getProducts();
      this.filteredProducts = this.products;
      
      const cats = Array.from(new Set(this.products.map(p => p.category)));
      this.categories = ['Tout', ...cats];
      
      this.applyFilters();
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters() {
    // 1. Filter by Category
    let result = this.selectedCategory === 'Tout' 
      ? this.products 
      : this.products.filter(p => p.category === this.selectedCategory);

    // 2. Filter by Search Term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    this.filteredProducts = result;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize) || 1;
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProducts = this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.isCategoryCollapsed = true; // Auto-collapse on mobile
    this.applyFilters();
    
    // Smooth scroll to top of product list on mobile
    if (window.innerWidth < 992) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearch() {
    this.applyFilters();
  }

  getCategoryCount(category: string): number {
    return this.products.filter(p => p.category === category).length;
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
