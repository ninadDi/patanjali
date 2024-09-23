import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { SutraService } from 'src/app/services/sutra.service';
import { SutraReelComponent } from '../sutra-reel/sutra-reel.component';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute } from '@angular/router';
import sutraData from '../../../assets/data/four_padas.json';

register();

@Component({
  selector: 'app-sutra-list',
  templateUrl: './sutra-list.component.html',
  styleUrls: ['./sutra-list.component.scss']
})
export class SutraListComponent implements OnInit {
  @Input() title? :string = '';
  @Input() selectedLanguage? :string = 'en';

  filteredSutras$: Observable<any[]> | undefined;
  colors: string[] = ['#1F2937', '#F97316', '#6B21A8', '#DC2626'];
  colorMap: { [id: number]: string } = {}; // To store the color for each sutra

  constructor(
    private sutraService: SutraService, 
    private modalController: ModalController, 
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
//     const idParam = await this.route.snapshot.paramMap.get('id'); 
//     if (idParam !== null) {
//       const id = Number(idParam); 
//       if (id < 5) {
//         this.filteredSutras$ = this.sutraService.getSutrasByChapter(id);
//         this.assignColors();
//       } else {
//         const sutraCategory = (sutraData as any[]).find(category => category.id === id);
//         if (sutraCategory && sutraCategory.sutrasList) {
//           const sutraArray = sutraCategory.sutrasList;
//           this.filteredSutras$ = this.sutraService.getSutrasByList(sutraArray);
//           this.assignColors();
//         } else {
//           console.error('No sutrasList found for the category.');
//         }
//       }
//     } else if(idParam === 5) {
// console.log('inside else if')      
// this.assignColors();
//     }
//      else {
//       this.filteredSutras$ = this.sutraService.getSutrasByChapter(1);
//       this.assignColors();
//     }
//   }
const idParam = await this.route.snapshot.paramMap.get('id'); 
  
  if (idParam !== null) {
    const id = Number(idParam); 
    
    if (id === 5) {
      this.loadFavoriteSutras();
    } else if (id < 5) {
      this.filteredSutras$ = this.sutraService.getSutrasByChapter(id);
      this.assignColors();
    } else {
      const sutraCategory = (sutraData as any[]).find(category => category.id === id);
      if (sutraCategory && sutraCategory.sutrasList) {
        const sutraArray = sutraCategory.sutrasList;
        this.filteredSutras$ = this.sutraService.getSutrasByList(sutraArray);
        this.assignColors();
      } else {
        console.error('No sutrasList found for the category.');
      }
    }
  } else {
    this.filteredSutras$ = this.sutraService.getSutrasByChapter(1);
    this.assignColors();
  }
}
// Fetch favorite Sutras logic
async loadFavoriteSutras() {
  this.filteredSutras$ = this.sutraService.getFavoriteSutras(); 
  this.assignColors();
}

  // Assign colors to each sutra using its ID
  assignColors() {
    if (this.filteredSutras$) {
      this.filteredSutras$.subscribe(sutras => {
        sutras.forEach((sutra, index) => {
          this.colorMap[sutra.id] = this.colors[index % this.colors.length]; // Cycle through colors
        });
      });
    }
  }

  onSearchChange(event: any) {
    this.sutraService.setSearchTerm(event.detail.value);
  }

  scrollToTop() {
    document.querySelector('ion-content')?.scrollToTop(500);
  }

  async openSutraReel(sutra: any, selectedLanguage: string) {
    if (!sutra || !sutra.translations) {
      return;
    }

    const modal = await this.modalController.create({
      component: SutraReelComponent,
      componentProps: {
        sutraPages: sutra,
        selectedLanguage: selectedLanguage
      }
    });

    return await modal.present();
  }
}
