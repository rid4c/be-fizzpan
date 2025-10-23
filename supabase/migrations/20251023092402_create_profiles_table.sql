CREATE TABLE profiles (
    id UUID PRIMARY KEY,
    username TEXT NOT NULL,
    role character varying NOT NULL DEFAULT 'user'::character varying CHECK (role::text = ANY (ARRAY['admin'::character varying, 'user'::character varying]::text[])),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)