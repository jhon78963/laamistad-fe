import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroSection } from './sections/hero-section/hero-section';
import { NewsSection } from './sections/news-section/news-section';
import { GallerySection } from './sections/gallery-section/gallery-section';
import { ContactSection } from './sections/contact-section/contact-section';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeroSection, NewsSection, GallerySection, ContactSection],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
