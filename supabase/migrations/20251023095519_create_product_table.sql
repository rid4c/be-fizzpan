CREATE TABLE public.products (
  id bigint NOT NULL DEFAULT nextval('products_id_seq'::regclass),
  name character varying NOT NULL,
  description text,
  price numeric NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  image character varying,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  CONSTRAINT products_pkey PRIMARY KEY (id)
);
