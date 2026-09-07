export interface ChurchSettings {
  id: string;
  church_name: string;
  slogan: string;
  sub_slogan: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  google_maps_url: string;
  facebook_url: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  mission: string;
  vision: string;
}

export interface Pastor {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  order_index: number;
}

export interface ChurchService {
  id: string;
  name: string;
  day: string;
  time: string;
  location: string;
  description: string;
  image_url?: string;
  order_index: number;
  is_active: boolean;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image_url: string;
  is_published: boolean;
}

export interface CellRequest {
  id: string;
  full_name: string;
  phone_whatsapp: string;
  email?: string;
  age?: number;
  sector?: string;
  city?: string;
  belongs_to_church?: string;
  message?: string;
  status: string;
  created_at: string;
}

export interface IntercessionRequest {
  id: string;
  full_name: string;
  phone_whatsapp: string;
  email?: string;
  age?: number;
  message?: string;
  status: string;
  created_at: string;
}

export interface PrayerRequest {
  id: string;
  full_name: string;
  contact?: string;
  request_text: string;
  is_confidential: boolean;
  status: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string;
}

export interface DonationMethod {
  id: string;
  bank_name: string;
  account_type: string;
  account_number: string;
  account_holder: string;
  id_number?: string;
  qr_image_url?: string;
  instructions?: string;
  is_active: boolean;
}
