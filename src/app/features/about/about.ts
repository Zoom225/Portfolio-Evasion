import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameworkGridComponent } from '../../app/shared/components/framework-grid/framework-grid';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FrameworkGridComponent],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {}
