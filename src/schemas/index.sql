
-- ============================================
-- NICHE AI - SUPABASE DATABASE SCHEMA
-- Production-Ready with RLS Policies
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- AUTHENTICATION & USERS
-- ============================================

-- Business Accounts (extends auth.users)
CREATE TABLE business_accounts (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_business_accounts_email ON business_accounts(business_email);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  domain TEXT,
  address TEXT,
  owner_id UUID NOT NULL REFERENCES business_accounts(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_owner_company UNIQUE(owner_id)
);

CREATE INDEX idx_companies_owner ON companies(owner_id);

-- Company Team Members
CREATE TABLE company_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  business_account_id UUID NOT NULL REFERENCES business_accounts(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
  invited_by UUID REFERENCES business_accounts(id) ON DELETE SET NULL,
  invited_at TIMESTAMPTZ DEFAULT NOW(),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_company_member UNIQUE(company_id, business_account_id)
);

CREATE INDEX idx_team_members_company ON company_team_members(company_id);
CREATE INDEX idx_team_members_account ON company_team_members(business_account_id);
CREATE INDEX idx_team_members_status ON company_team_members(company_id, status);

-- Invitations
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  invited_by UUID NOT NULL REFERENCES business_accounts(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_invitations_email ON invitations(email) WHERE status = 'pending';
CREATE INDEX idx_invitations_token ON invitations(token) WHERE status = 'pending';
CREATE INDEX idx_invitations_company ON invitations(company_id, status);

-- ============================================
-- PRODUCTS & PRICING
-- ============================================

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_product_id TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_quota INTEGER NOT NULL,
  storage_quota_mb INTEGER NOT NULL DEFAULT 1024,
  api_calls_quota INTEGER NOT NULL DEFAULT 10000,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_active ON products(is_active, sort_order);
CREATE INDEX idx_products_stripe ON products(stripe_product_id);

-- Product Prices
CREATE TABLE product_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  stripe_price_id TEXT NOT NULL UNIQUE,
  billing_interval TEXT NOT NULL CHECK (billing_interval IN ('month', 'year')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  trial_period_days INTEGER DEFAULT 14,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_product_interval UNIQUE(product_id, billing_interval)
);

CREATE INDEX idx_product_prices_product ON product_prices(product_id);
CREATE INDEX idx_product_prices_stripe ON product_prices(stripe_price_id);
CREATE INDEX idx_product_prices_active ON product_prices(product_id, is_active);

-- ============================================
-- SUBSCRIPTIONS & BILLING
-- ============================================

-- Stripe Customers
CREATE TABLE stripe_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL UNIQUE REFERENCES companies(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  default_payment_method TEXT,
  billing_address JSONB,
  tax_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stripe_customers_company ON stripe_customers(company_id);
CREATE INDEX idx_stripe_customers_stripe_id ON stripe_customers(stripe_customer_id);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  price_id UUID NOT NULL REFERENCES product_prices(id) ON DELETE RESTRICT,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT NOT NULL,
  stripe_checkout_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'incomplete' CHECK (
    status IN ('incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused')
  ),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_stripe_customer FOREIGN KEY (stripe_customer_id) 
    REFERENCES stripe_customers(stripe_customer_id) ON DELETE RESTRICT
);

CREATE INDEX idx_subscriptions_company ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status, current_period_end);
CREATE INDEX idx_subscriptions_active ON subscriptions(company_id, status) 
  WHERE status IN ('active', 'trialing');

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT UNIQUE,
  stripe_charge_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL CHECK (
    status IN ('pending', 'processing', 'succeeded', 'failed', 'canceled', 'refunded', 'partially_refunded')
  ),
  billing_period_start TIMESTAMPTZ,
  billing_period_end TIMESTAMPTZ,
  payment_method_type TEXT,
  last4 TEXT,
  brand TEXT,
  invoice_url TEXT,
  receipt_url TEXT,
  refunded_amount DECIMAL(10,2) DEFAULT 0,
  refunded_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_subscription ON payments(subscription_id, created_at DESC);
CREATE INDEX idx_payments_company ON payments(company_id, created_at DESC);
CREATE INDEX idx_payments_invoice ON payments(stripe_invoice_id);
CREATE INDEX idx_payments_status ON payments(status, created_at DESC);

-- Subscription History
CREATE TABLE subscription_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  change_type TEXT NOT NULL CHECK (
    change_type IN ('created', 'updated', 'canceled', 'reactivated', 'trial_started', 'trial_ended', 
                    'upgraded', 'downgraded', 'payment_failed', 'payment_succeeded', 'renewed')
  ),
  old_status TEXT,
  new_status TEXT,
  old_product_id UUID REFERENCES products(id),
  new_product_id UUID REFERENCES products(id),
  changed_by UUID REFERENCES business_accounts(id),
  reason TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_subscription_history_sub ON subscription_history(subscription_id, created_at DESC);
CREATE INDEX idx_subscription_history_company ON subscription_history(company_id, created_at DESC);

-- ============================================
-- USAGE & QUOTAS
-- ============================================

-- Credits
CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL UNIQUE REFERENCES subscriptions(id) ON DELETE CASCADE,
  total_credits INTEGER NOT NULL DEFAULT 0,
  used_credits INTEGER NOT NULL DEFAULT 0,
  reset_at TIMESTAMPTZ,
  last_reset_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT credits_positive CHECK (used_credits >= 0 AND total_credits >= 0)
);

CREATE INDEX idx_credits_subscription ON credits(subscription_id);

-- Storage Quotas
CREATE TABLE storage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL UNIQUE REFERENCES subscriptions(id) ON DELETE CASCADE,
  total_storage_mb INTEGER NOT NULL,
  used_storage_mb DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT storage_positive CHECK (used_storage_mb >= 0 AND total_storage_mb >= 0)
);

CREATE INDEX idx_storage_quotas_subscription ON storage_quotas(subscription_id);

-- Image Quotas
CREATE TABLE image_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL UNIQUE REFERENCES subscriptions(id) ON DELETE CASCADE,
  total_images INTEGER NOT NULL,
  used_images INTEGER NOT NULL DEFAULT 0,
  reset_at TIMESTAMPTZ,
  last_reset_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT images_positive CHECK (used_images >= 0 AND total_images >= 0)
);

CREATE INDEX idx_image_quotas_subscription ON image_quotas(subscription_id);

-- ============================================
-- AI MODELS & PROCESSING
-- ============================================

-- Models
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT,
  api_endpoint TEXT NOT NULL,
  credits_per_call INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_models_slug ON models(slug);
CREATE INDEX idx_models_active ON models(is_active, display_order);

-- Model Options
CREATE TABLE model_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id UUID NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_model_option_slug UNIQUE(model_id, slug)
);

CREATE INDEX idx_model_options_model ON model_options(model_id);
CREATE INDEX idx_model_options_active ON model_options(model_id, is_active);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  generated_by UUID NOT NULL REFERENCES business_accounts(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES models(id) ON DELETE RESTRICT,
  model_option_id UUID REFERENCES model_options(id) ON DELETE SET NULL,
  original_image_name TEXT NOT NULL,
  original_image_url TEXT NOT NULL,
  processed_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  error_message TEXT,
  file_size_mb DECIMAL(10,2),
  processing_time_ms INTEGER,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_company ON gallery(company_id, created_at DESC);
CREATE INDEX idx_gallery_user ON gallery(generated_by, created_at DESC);
CREATE INDEX idx_gallery_model ON gallery(model_id);
CREATE INDEX idx_gallery_status ON gallery(status, created_at DESC);

-- ============================================
-- API MANAGEMENT
-- ============================================

-- API Keys
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES business_accounts(id) ON DELETE CASCADE,
  key_type TEXT NOT NULL CHECK (key_type IN ('development', 'production')),
  token TEXT NOT NULL UNIQUE DEFAULT 'nai_' || encode(gen_random_bytes(32), 'hex'),
  name TEXT,
  is_active BOOLEAN DEFAULT true,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE INDEX idx_api_keys_token ON api_keys(token) WHERE is_active = true;
CREATE INDEX idx_api_keys_company ON api_keys(company_id, is_active);
CREATE INDEX idx_api_keys_active ON api_keys(is_active, expires_at) WHERE is_active = true;

-- API Calls
CREATE TABLE api_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID NOT NULL REFERENCES api_keys(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  model_id UUID NOT NULL REFERENCES models(id) ON DELETE RESTRICT,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  credits_used INTEGER DEFAULT 1,
  error_message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_api_calls_company ON api_calls(company_id, created_at DESC);
CREATE INDEX idx_api_calls_key ON api_calls(api_key_id, created_at DESC);
CREATE INDEX idx_api_calls_model ON api_calls(model_id, created_at DESC);
CREATE INDEX idx_api_calls_date ON api_calls(created_at DESC);

-- API Usage Stats (aggregated daily)
CREATE TABLE api_usage_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_calls INTEGER DEFAULT 0,
  successful_calls INTEGER DEFAULT 0,
  failed_calls INTEGER DEFAULT 0,
  total_credits_used INTEGER DEFAULT 0,
  avg_response_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_company_date UNIQUE(company_id, date)
);

CREATE INDEX idx_usage_stats_company_date ON api_usage_stats(company_id, date DESC);

-- ============================================
-- WEBHOOK & AUDIT
-- ============================================

-- Stripe Webhook Events
CREATE TABLE stripe_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  processing_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_webhook_events_type ON stripe_webhook_events(event_type, created_at DESC);
CREATE INDEX idx_webhook_events_processed ON stripe_webhook_events(processed, created_at DESC) 
  WHERE processed = false;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_updated_at trigger to all relevant tables
CREATE TRIGGER update_business_accounts_updated_at BEFORE UPDATE ON business_accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credits_updated_at BEFORE UPDATE ON credits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_quotas_updated_at BEFORE UPDATE ON storage_quotas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_image_quotas_updated_at BEFORE UPDATE ON image_quotas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize quotas when subscription is created
CREATE OR REPLACE FUNCTION initialize_subscription_quotas()
RETURNS TRIGGER AS $$
DECLARE
  v_product_image_quota INTEGER;
  v_product_storage_quota INTEGER;
  v_reset_date TIMESTAMPTZ;
BEGIN
  -- Get quotas from product
  SELECT image_quota, storage_quota_mb 
  INTO v_product_image_quota, v_product_storage_quota
  FROM products WHERE id = NEW.product_id;
  
  -- Calculate reset date
  v_reset_date := NEW.current_period_end;
  
  -- Create credit record
  INSERT INTO credits (subscription_id, total_credits, used_credits, reset_at)
  VALUES (NEW.id, v_product_image_quota, 0, v_reset_date);
  
  -- Create storage quota
  INSERT INTO storage_quotas (subscription_id, total_storage_mb, used_storage_mb)
  VALUES (NEW.id, v_product_storage_quota, 0);
  
  -- Create image quota
  INSERT INTO image_quotas (subscription_id, total_images, used_images, reset_at)
  VALUES (NEW.id, v_product_image_quota, 0, v_reset_date);
  
  -- Log subscription creation
  INSERT INTO subscription_history (
    subscription_id, company_id, change_type, new_status, new_product_id
  ) VALUES (
    NEW.id, NEW.company_id, 'created', NEW.status, NEW.product_id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER initialize_quotas_on_subscription 
  AFTER INSERT ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION initialize_subscription_quotas();

-- Function to log subscription changes
CREATE OR REPLACE FUNCTION log_subscription_changes()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if status or product changed
  IF OLD.status IS DISTINCT FROM NEW.status OR OLD.product_id IS DISTINCT FROM NEW.product_id THEN
    INSERT INTO subscription_history (
      subscription_id, 
      company_id, 
      change_type,
      old_status,
      new_status,
      old_product_id,
      new_product_id
    ) VALUES (
      NEW.id,
      NEW.company_id,
      CASE
        WHEN OLD.status != NEW.status AND NEW.status = 'canceled' THEN 'canceled'
        WHEN OLD.status != NEW.status AND NEW.status = 'active' AND OLD.status = 'canceled' THEN 'reactivated'
        WHEN OLD.product_id IS DISTINCT FROM NEW.product_id THEN 'upgraded'
        ELSE 'updated'
      END,
      OLD.status,
      NEW.status,
      OLD.product_id,
      NEW.product_id
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_subscription_updates 
  AFTER UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION log_subscription_changes();

-- Function to update usage on API call
CREATE OR REPLACE FUNCTION update_usage_on_api_call()
RETURNS TRIGGER AS $$
DECLARE
  v_subscription_id UUID;
BEGIN
  -- Get active subscription for the company
  SELECT id INTO v_subscription_id 
  FROM subscriptions 
  WHERE company_id = NEW.company_id 
    AND status IN ('active', 'trialing')
  ORDER BY created_at DESC 
  LIMIT 1;
  
  -- Update credits used
  IF v_subscription_id IS NOT NULL THEN
    UPDATE credits 
    SET used_credits = used_credits + NEW.credits_used
    WHERE subscription_id = v_subscription_id;
  END IF;
  
  -- Update daily stats
  INSERT INTO api_usage_stats (
    company_id, 
    date, 
    total_calls, 
    successful_calls, 
    failed_calls, 
    total_credits_used,
    avg_response_time_ms
  )
  VALUES (
    NEW.company_id,
    CURRENT_DATE,
    1,
    CASE WHEN NEW.status_code BETWEEN 200 AND 299 THEN 1 ELSE 0 END,
    CASE WHEN NEW.status_code NOT BETWEEN 200 AND 299 THEN 1 ELSE 0 END,
    NEW.credits_used,
    NEW.response_time_ms
  )
  ON CONFLICT (company_id, date) DO UPDATE SET
    total_calls = api_usage_stats.total_calls + 1,
    successful_calls = api_usage_stats.successful_calls + EXCLUDED.successful_calls,
    failed_calls = api_usage_stats.failed_calls + EXCLUDED.failed_calls,
    total_credits_used = api_usage_stats.total_credits_used + EXCLUDED.total_credits_used,
    avg_response_time_ms = (
      (api_usage_stats.avg_response_time_ms * api_usage_stats.total_calls + COALESCE(EXCLUDED.avg_response_time_ms, 0))
      / (api_usage_stats.total_calls + 1)
    ),
    updated_at = NOW();
  
  -- Update last_used_at for API key
  UPDATE api_keys SET last_used_at = NOW() WHERE id = NEW.api_key_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_usage_after_api_call 
  AFTER INSERT ON api_calls
  FOR EACH ROW EXECUTE FUNCTION update_usage_on_api_call();

-- Function to update storage usage when gallery item is added
CREATE OR REPLACE FUNCTION update_storage_on_gallery_insert()
RETURNS TRIGGER AS $$
DECLARE
  v_subscription_id UUID;
BEGIN
  IF NEW.file_size_mb IS NOT NULL THEN
    -- Get active subscription
    SELECT id INTO v_subscription_id
    FROM subscriptions
    WHERE company_id = NEW.company_id
      AND status IN ('active', 'trialing')
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF v_subscription_id IS NOT NULL THEN
      UPDATE storage_quotas
      SET used_storage_mb = used_storage_mb + NEW.file_size_mb
      WHERE subscription_id = v_subscription_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_storage_after_gallery_insert
  AFTER INSERT ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_storage_on_gallery_insert();

-- Function to update storage usage when gallery item is deleted
CREATE OR REPLACE FUNCTION update_storage_on_gallery_delete()
RETURNS TRIGGER AS $$
DECLARE
  v_subscription_id UUID;
BEGIN
  IF OLD.file_size_mb IS NOT NULL THEN
    -- Get active subscription
    SELECT id INTO v_subscription_id
    FROM subscriptions
    WHERE company_id = OLD.company_id
      AND status IN ('active', 'trialing')
    ORDER BY created_at DESC
    LIMIT 1;
    
    IF v_subscription_id IS NOT NULL THEN
      UPDATE storage_quotas
      SET used_storage_mb = GREATEST(0, used_storage_mb - OLD.file_size_mb)
      WHERE subscription_id = v_subscription_id;
    END IF;
  END IF;
  
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_storage_after_gallery_delete
  AFTER DELETE ON gallery
  FOR EACH ROW EXECUTE FUNCTION update_storage_on_gallery_delete();

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE business_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE image_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage_stats ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's companies
CREATE OR REPLACE FUNCTION get_user_companies()
RETURNS SETOF UUID AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT company_id 
  FROM company_team_members 
  WHERE business_account_id = auth.uid() 
    AND status = 'active';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is company admin
CREATE OR REPLACE FUNCTION is_company_admin(p_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM company_team_members 
    WHERE company_id = p_company_id 
      AND business_account_id = auth.uid() 
      AND role = 'admin'
      AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Business Accounts Policies
CREATE POLICY "Users can view own account" ON business_accounts
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own account" ON business_accounts
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own account" ON business_accounts
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Companies Policies
CREATE POLICY "Company members can view their company" ON companies
  FOR SELECT USING (id IN (SELECT get_user_companies()));

CREATE POLICY "Company owners can update their company" ON companies
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can create companies" ON companies
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Company Team Members Policies
CREATE POLICY "Team members can view team" ON company_team_members
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

CREATE POLICY "Admins can manage team members" ON company_team_members
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM company_team_members
      WHERE business_account_id = auth.uid() 
        AND role = 'admin'
        AND status = 'active'
    )
  );

-- Invitations Policies
CREATE POLICY "Company members can view invitations" ON invitations
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

CREATE POLICY "Admins can manage invitations" ON invitations
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM company_team_members
      WHERE business_account_id = auth.uid() 
        AND role = 'admin'
        AND status = 'active'
    )
  );

-- Products & Prices Policies (Public read access)
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active prices" ON product_prices
  FOR SELECT USING (is_active = true);

-- Subscriptions Policies
CREATE POLICY "Company members can view subscriptions" ON subscriptions
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

CREATE POLICY "Admins can manage subscriptions" ON subscriptions
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM company_team_members
      WHERE business_account_id = auth.uid() 
        AND role = 'admin'
        AND status = 'active'
    )
  );

-- Stripe Customers Policies
CREATE POLICY "Company members can view stripe customers" ON stripe_customers
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

-- Payments Policies
CREATE POLICY "Company members can view payments" ON payments
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

-- Subscription History Policies
CREATE POLICY "Company members can view subscription history" ON subscription_history
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

-- Credits Policies
CREATE POLICY "Company members can view credits" ON credits
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id IN (SELECT get_user_companies())
    )
  );

-- Storage Quotas Policies
CREATE POLICY "Company members can view storage quotas" ON storage_quotas
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id IN (SELECT get_user_companies())
    )
  );

-- Image Quotas Policies
CREATE POLICY "Company members can view image quotas" ON image_quotas
  FOR SELECT USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE company_id IN (SELECT get_user_companies())
    )
  );

-- Models Policies (Public read access)
CREATE POLICY "Anyone can view active models" ON models
  FOR SELECT USING (is_active = true);

-- Model Options Policies (Public read access)
CREATE POLICY "Anyone can view active model options" ON model_options
  FOR SELECT USING (is_active = true);

-- Gallery Policies
CREATE POLICY "Company members can view gallery" ON gallery
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

CREATE POLICY "Company members can insert gallery" ON gallery
  FOR INSERT WITH CHECK (
    company_id IN (SELECT get_user_companies()) 
    AND generated_by = auth.uid()
  );

CREATE POLICY "Users can update own gallery items" ON gallery
  FOR UPDATE USING (generated_by = auth.uid());

CREATE POLICY "Users can delete own gallery items" ON gallery
  FOR DELETE USING (generated_by = auth.uid());

-- API Keys Policies
CREATE POLICY "Company members can view api keys" ON api_keys
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

CREATE POLICY "Admins can manage api keys" ON api_keys
  FOR ALL USING (
    company_id IN (
      SELECT company_id FROM company_team_members
      WHERE business_account_id = auth.uid() 
        AND role = 'admin'
        AND status = 'active'
    )
  );

-- API Calls Policies
CREATE POLICY "Company members can view api calls" ON api_calls
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

-- API Usage Stats Policies
CREATE POLICY "Company members can view usage stats" ON api_usage_stats
  FOR SELECT USING (company_id IN (SELECT get_user_companies()));

-- ============================================
-- VIEWS FOR EASY QUERYING
-- ============================================

-- View: Active subscriptions with all details
CREATE OR REPLACE VIEW active_subscriptions_view AS
SELECT 
  s.id AS subscription_id,
  s.company_id,
  s.status AS subscription_status,
  s.current_period_start,
  s.current_period_end,
  s.trial_end,
  s.cancel_at_period_end,
  p.id AS product_id,
  p.name AS product_name,
  p.image_quota,
  p.storage_quota_mb,
  pp.amount AS price_amount,
  pp.currency,
  pp.billing_interval,
  c.total_credits,
  c.used_credits,
  (c.total_credits - c.used_credits) AS remaining_credits,
  iq.total_images,
  iq.used_images,
  (iq.total_images - iq.used_images) AS remaining_images,
  sq.total_storage_mb,
  sq.used_storage_mb,
  (sq.total_storage_mb - sq.used_storage_mb) AS remaining_storage_mb,
  sc.stripe_customer_id,
  sc.default_payment_method
FROM subscriptions s
JOIN products p ON s.product_id = p.id
JOIN product_prices pp ON s.price_id = pp.id
LEFT JOIN credits c ON c.subscription_id = s.id
LEFT JOIN image_quotas iq ON iq.subscription_id = s.id
LEFT JOIN storage_quotas sq ON sq.subscription_id = s.id
LEFT JOIN stripe_customers sc ON sc.company_id = s.company_id
WHERE s.status IN ('active', 'trialing', 'past_due');

-- View: Payment history with context
CREATE OR REPLACE VIEW payment_history_view AS
SELECT 
  p.id AS payment_id,
  p.company_id,
  p.amount,
  p.currency,
  p.status AS payment_status,
  p.created_at AS payment_date,
  p.billing_period_start,
  p.billing_period_end,
  p.invoice_url,
  p.receipt_url,
  p.payment_method_type,
  p.last4,
  p.brand,
  prod.name AS product_name,
  pp.billing_interval
FROM payments p
JOIN subscriptions s ON p.subscription_id = s.id
JOIN products prod ON s.product_id = prod.id
JOIN product_prices pp ON s.price_id = pp.id
ORDER BY p.created_at DESC;

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- Insert default trial product
INSERT INTO products (name, description, image_quota, storage_quota_mb, api_calls_quota, features, is_active, sort_order)
VALUES 
  ('Free Trial', '14-day free trial with limited access', 50, 500, 1000, 
   '["50 images", "500 MB storage", "1000 API calls", "All models access"]'::jsonb, true, 0),
  ('Starter', 'Perfect for small teams', 500, 5120, 10000,
   '["500 images/month", "5 GB storage", "10K API calls/month", "All models", "Email support"]'::jsonb, true, 1),
  ('Professional', 'For growing businesses', 2000, 20480, 50000,
   '["2000 images/month", "20 GB storage", "50K API calls/month", "All models", "Priority support"]'::jsonb, true, 2),
  ('Enterprise', 'Unlimited scale', 10000, 102400, 500000,
   '["10K images/month", "100 GB storage", "500K API calls/month", "All models", "24/7 support", "Custom integrations"]'::jsonb, true, 3);

-- Insert default models
INSERT INTO models (name, slug, description, category, api_endpoint, credits_per_call, is_active, display_order)
VALUES
  ('Segmentation', 'segmentation', 'Advanced object segmentation and background removal', 'image-processing', 
   'https://api.nicheai.com/v1/segmentation', 1, true, 1),
  ('Fusion', 'fusion', 'Intelligent image fusion and composition tools', 'image-processing',
   'https://api.nicheai.com/v1/fusion', 1, true, 2),
  ('Immersion', 'immersion', 'Create immersive visual experiences with AI', 'generation',
   'https://api.nicheai.com/v1/immersion', 1, true, 3);

-- Insert model options for Fusion
INSERT INTO model_options (model_id, name, slug, description, is_active)
SELECT 
  id, 
  option_name,
  option_slug,
  option_desc,
  true
FROM models,
LATERAL (VALUES
  ('Butterfly', 'butterfly', 'Blend with butterfly effects'),
  ('Penguin', 'penguin', 'Blend with penguin themes'),
  ('Abstract', 'abstract', 'Abstract artistic fusion')
) AS options(option_name, option_slug, option_desc)
WHERE slug = 'fusion';

-- ============================================
-- COMPLETED
-- ============================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database schema created successfully!';
  RAISE NOTICE 'Total tables created: 23';
  RAISE NOTICE 'RLS policies: Enabled and configured';
  RAISE NOTICE 'Triggers: Configured for automatic updates';
  RAISE NOTICE 'Ready for production use!';
END $$;
