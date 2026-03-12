import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService, Product } from '../../services/supabase.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    try {
      this.featuredProducts = await this.supabaseService.getFeaturedProducts();
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  }
}
