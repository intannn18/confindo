-- ============================================================================
-- CONFINDO DATABASE SCHEMA (PostgreSQL / Supabase)
-- Public Speaking Self-Learning Platform
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    profile_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TUTORIALS TABLE
CREATE TABLE IF NOT EXISTS public.tutorials (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    youtube_url TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    duration VARCHAR(50) DEFAULT '10 Menit',
    speaker VARCHAR(255),
    level VARCHAR(50) DEFAULT 'Semua Tingkat',
    takeaways JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRACTICE SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.practice_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    duration VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT TRUE,
    checklist_score VARCHAR(50),
    filler_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CHALLENGES TABLE (30-Day Speaking Challenge)
CREATE TABLE IF NOT EXISTS public.challenges (
    id VARCHAR(50) PRIMARY KEY,
    day INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT NOT NULL
);

-- 5. USER CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS public.user_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    challenge_id VARCHAR(50) REFERENCES public.challenges(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, challenge_id)
);

-- 6. PRODUCTS TABLE (Digital Products)
CREATE TABLE IF NOT EXISTS public.products (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    original_price NUMERIC(12, 2),
    image TEXT NOT NULL,
    file_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    badge VARCHAR(50),
    rating NUMERIC(3, 1) DEFAULT 4.9,
    includes JSONB DEFAULT '[]'::jsonb,
    file_format VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    total NUMERIC(12, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled')),
    payment_reference VARCHAR(255),
    payment_method VARCHAR(50) DEFAULT 'QRIS',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id VARCHAR(100) REFERENCES public.products(id) ON DELETE RESTRICT,
    price NUMERIC(12, 2) NOT NULL
);

-- 9. SAVED TUTORIALS (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_tutorials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    tutorial_id VARCHAR(100) REFERENCES public.tutorials(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, tutorial_id)
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_tutorials ENABLE ROW LEVEL SECURITY;

-- Public read for tutorials, challenges, products
CREATE POLICY "Public tutorials view" ON public.tutorials FOR SELECT USING (true);
CREATE POLICY "Public challenges view" ON public.challenges FOR SELECT USING (true);
CREATE POLICY "Public products view" ON public.products FOR SELECT USING (true);

-- User-specific access
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can manage own practice sessions" ON public.practice_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own challenge progress" ON public.user_challenges FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own saved tutorials" ON public.saved_tutorials FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Secure digital product access: user can only access file_url if order is paid
CREATE OR REPLACE FUNCTION public.user_owns_product(user_uuid UUID, prod_id VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.orders o
        JOIN public.order_items oi ON oi.order_id = o.id
        WHERE o.user_id = user_uuid
          AND oi.product_id = prod_id
          AND o.payment_status = 'paid'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
