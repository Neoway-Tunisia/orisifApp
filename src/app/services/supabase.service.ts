import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  marques?: string;
  description: string;
  images: string[];
  specifications: { [key: string]: string };
  is_featured: boolean;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        persistSession: false, // Pas besoin de persister la session pour un catalogue public
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  }

  async getProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as Product[];
  }

  async getProductBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data as Product;
  }

  async getFeaturedProducts() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('is_featured', true);
    
    if (error) throw error;
    return data as Product[];
  }
}
