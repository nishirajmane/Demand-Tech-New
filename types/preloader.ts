export interface PreloaderConfig {
  duration: number;
  showBrand: boolean;
  brandName: string;
  brandSubtitle: string;
  customMessages?: string[];
}

export interface PreloaderState {
  progress: number;
  phase: 'loading' | 'complete' | 'exit';
  isVisible: boolean;
}


