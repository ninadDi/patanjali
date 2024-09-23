import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

export interface Sutra {
  id: number;
  chapter: number;
  title: {
    original: string;
    original_english: string;
  };
  meaning: {
    en: string;
    hi: string;
  };
  translations: Translation[];
}

export interface Translation {
  page: number;
  text?: {
    original: string;
    original_english: string;
  };
  meaning?: {
    en: string;
    hi: string;
  };
  significance?: {
    en: string;
    hi: string;
  };
  contextual_interpretation?: {
    en: string;
    hi: string;
  };
  deeper_implications?: {
    en: string;
    hi: string;
  };
}


@Component({
  selector: 'app-sutra-reel',
  templateUrl: './sutra-reel.component.html',
  styleUrls: ['./sutra-reel.component.scss'],
})
export class SutraReelComponent implements OnInit {
  @Input() sutraPages: Sutra | undefined;
  @Input() color =  'white'
  @Input() isLoading = false;  
  @Input() selectedLanguage: 'en' | 'hi' = 'en'; 
  @ViewChild('swiper') swiperRef!: ElementRef;
  isBookmarked = false;


  @ViewChild(IonContent) content!: IonContent;  // Reference to ion-content for scroll control

  constructor(private modalController: ModalController,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    if(this.sutraPages){
      this.isBookmarked = await this.storageService.isBookmarked(this.sutraPages?.id);

    }
  }

  ngAfterViewInit() {
    if (this.swiperRef && this.swiperRef.nativeElement) {
      // Make sure swiper is correctly initialized
      console.log('Swiper initialized:', this.swiperRef.nativeElement);
    }
  }
  
  async toggleBookmark(sutraId: number) {
    if (this.isBookmarked) {
      await this.storageService.removeBookmark(sutraId);
    } else {
      await this.storageService.setBookmark(sutraId);
    }
    this.isBookmarked = !this.isBookmarked;
  }
  
splitTextIntoSlides(text: string, maxLength: number): string[] {
  const words = text.split(' ');
  const slides = [];
  let slideText = '';

  words.forEach(word => {
    if (slideText.length + word.length < maxLength) {
      slideText += word + ' ';
      console.log('slidetext => ', slideText)
    } else {
      slides.push(slideText.trim());
      slideText = word + ' ';
    }
  });

  if (slideText) {
    slides.push(slideText.trim());
  }

  return slides;
}


  closeModal() {
    this.modalController.dismiss();
  }

  scrollToTop() {
    this.content?.scrollToTop(500);  // Scroll to the top when necessary
  }
}
