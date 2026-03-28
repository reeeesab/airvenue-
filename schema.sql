-- Venues table
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INT NOT NULL,
  price_range TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  whatsapp_number TEXT,
  calendly_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- Clerk user ID
  venue_id UUID REFERENCES venues(id) ON DELETE CASCADE,
  event_type TEXT,
  guests INT,
  budget TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed some sample data
INSERT INTO venues (name, location, capacity, price_range, description, images, amenities, whatsapp_number, calendly_link)
VALUES 
('The Grand Ballroom', 'Central London', 500, '£2000 - £5000', 'A majestic ballroom for large weddings and corporate events.', 
ARRAY['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000'], 
ARRAY['WiFi', 'Catering', 'AV System', 'Parking'], '+447000000000', 'https://calendly.com/airvenue-ai/visit'),

('Sky Garden Lounge', 'The Shard, London', 100, '£1500 - £3000', 'Breathtaking views of the city skyline.', 
ARRAY['https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1000'], 
ARRAY['Panoramic Views', 'Bar', 'Sound System'], '+447000000001', 'https://calendly.com/airvenue-ai/visit'),

('The Rustic Barn', 'Cotswolds', 150, '£1000 - £2000', 'A charming rustic barn perfect for intimate weddings.', 
ARRAY['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1000'], 
ARRAY['Outdoor Space', 'Pet Friendly', 'Accommodation'], '+447000000002', 'https://calendly.com/airvenue-ai/visit');
