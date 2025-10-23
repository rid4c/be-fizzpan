CREATE TABLE public.carts (
  id bigint NOT NULL DEFAULT nextval('carts_id_seq'::regclass),
  user_id uuid NOT NULL,
  product_id bigint NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamp without time zone,
  updated_at timestamp without time zone,
  CONSTRAINT carts_pkey PRIMARY KEY (id),
  CONSTRAINT carts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT carts_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(id)
);