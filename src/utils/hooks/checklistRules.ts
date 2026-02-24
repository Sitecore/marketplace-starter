export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  check: (fields: PageFields) => boolean;
}

export interface PageFields {
  pageTitle?: string;
  metaDescription?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export const checklistRules: ChecklistItem[] = [
  {
    id: 'page-title',
    label: 'Page Title',
    description: 'Between 30–60 characters',
    check: (f) => !!f.pageTitle && 
                   f.pageTitle.length >= 30 && 
                   f.pageTitle.length <= 60,
  },
  {
    id: 'meta-description',
    label: 'Meta Description',
    description: 'Between 120–160 characters',
    check: (f) => !!f.metaDescription && 
                   f.metaDescription.length >= 120 && 
                   f.metaDescription.length <= 160,
  },
  {
    id: 'hero-image',
    label: 'Hero Image',
    description: 'Hero image is set',
    check: (f) => !!f.heroImage && f.heroImage.length > 0,
  },
  {
    id: 'hero-image-alt',
    label: 'Hero Image Alt Text',
    description: 'Alt text is present for accessibility',
    check: (f) => !!f.heroImageAlt && f.heroImageAlt.length > 0,
  },
];
