create table public.people (
  id uuid not null references auth.users on delete cascade,
  full_name text not null,
  avatar_url text,

  primary key (id)
);

alter table public.people enable row level security;

create function public.handle_new_people()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_people();