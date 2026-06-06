import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('heroBadge') heroBadge!: ElementRef;
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroActions') heroActions!: ElementRef;
  @ViewChild('heroVisual') heroVisual!: ElementRef;

  @ViewChildren('revealSection') revealSections!: QueryList<ElementRef>;
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;
  @ViewChildren('skillItem') skillItems!: QueryList<ElementRef>;

  projects = [
    {
      title: 'Application Full-Stack de Gestion',
      description:
        'Application web moderne avec Angular, Spring Boot et base de données relationnelle pour gérer des utilisateurs, données métier et tableaux de bord.',
      stack: ['Angular', 'Spring Boot', 'PostgreSQL']
    },
    {
      title: 'API Sécurisée Spring Boot',
      description:
        'Backend REST structuré avec authentification, gestion des rôles, endpoints sécurisés et intégration frontend Angular.',
      stack: ['Java', 'Spring Security', 'JWT']
    },
    {
      title: 'Plateforme Dockerisée',
      description:
        'Projet conteneurisé avec Docker pour simplifier le déploiement local, la configuration de l’environnement et l’intégration de la base de données.',
      stack: ['Docker', 'Angular', 'Java']
    }
  ];

  skills = [
    'Angular',
    'TypeScript',
    'Java',
    'Spring Boot',
    'Spring Security',
    'Docker',
    'PostgreSQL',
    'H2',
    'Git',
    'REST API'
  ];

  ngAfterViewInit(): void {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from(this.heroBadge.nativeElement, {
        y: 24,
        opacity: 0,
        duration: 0.6
      })
      .from(this.heroTitle.nativeElement, {
        y: 40,
        opacity: 0,
        duration: 0.9
      }, '-=0.3')
      .from(this.heroSubtitle.nativeElement, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from(this.heroText.nativeElement, {
        y: 24,
        opacity: 0,
        duration: 0.7
      }, '-=0.45')
      .from(this.heroActions.nativeElement, {
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from(this.heroVisual.nativeElement, {
        scale: 0.92,
        opacity: 0,
        duration: 1
      }, '-=0.8');

    gsap.to(this.heroVisual.nativeElement, {
      y: -14,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    this.revealSections.forEach((section) => {
      gsap.from(section.nativeElement, {
        scrollTrigger: {
          trigger: section.nativeElement,
          start: 'top 82%'
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    gsap.from(this.projectCards.map(card => card.nativeElement), {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: 'power3.out'
    });

    gsap.from(this.skillItems.map(item => item.nativeElement), {
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%'
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'back.out(1.7)'
    });
  }
}

export class Home {
}
