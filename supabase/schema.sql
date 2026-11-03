-- ==============================================================================
-- CampusFlow Master Database Schema & Row-Level Security (PostgreSQL / Supabase)
-- ==============================================================================
-- Compatible with Supabase PostgreSQL 15+
-- Generated for CampusFlow 21-Day Structured Roadmap (Day 3 Deliverable)

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 2. TABLE DEFINITIONS
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- A. DEPARTMENTS
-- ------------------------------------------------------------------------------
create table if not exists public.departments (
  id uuid primary key default gen_random_uuid(),
  name varchar(150) not null unique,
  code varchar(20) not null unique,
  faculty varchar(150) not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- B. PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email varchar(255) not null unique,
  full_name varchar(150) not null,
  role varchar(20) default 'student' not null check (role in ('student', 'admin', 'teacher')),
  student_id varchar(50) unique,
  department_id uuid references public.departments(id) on delete set null,
  semester varchar(20),
  phone varchar(30),
  avatar_url text,
  bio text,
  status varchar(20) default 'active' not null check (status in ('active', 'pending', 'suspended')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- C. NOTICES (Smart Campus Bulletins)
-- ------------------------------------------------------------------------------
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  content text not null,
  category varchar(50) default 'Academic' not null check (category in ('Academic', 'Exam', 'Accounts', 'Events', 'Emergency', 'Scholarship', 'General')),
  department_id uuid references public.departments(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  is_pinned boolean default false not null,
  is_published boolean default true not null,
  file_url text, -- Storage link for PDF attachments
  file_name varchar(255),
  file_size varchar(50),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- D. NOTICE READS (Read Receipts for Students)
-- ------------------------------------------------------------------------------
create table if not exists public.notice_reads (
  id uuid primary key default gen_random_uuid(),
  notice_id uuid references public.notices(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  read_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (notice_id, student_id)
);

-- ------------------------------------------------------------------------------
-- E. LOST & FOUND ITEMS
-- ------------------------------------------------------------------------------
create table if not exists public.lost_found_items (
  id uuid primary key default gen_random_uuid(),
  title varchar(200) not null,
  description text not null,
  type varchar(20) not null check (type in ('lost', 'found')),
  category varchar(50) not null,
  location varchar(150) not null,
  image_url text,
  status varchar(20) default 'pending' not null check (status in ('pending', 'approved', 'in_progress', 'resolved', 'cancelled')),
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- F. ITEM CLAIMS (Ownership Claims Workflow)
-- ------------------------------------------------------------------------------
create table if not exists public.item_claims (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.lost_found_items(id) on delete cascade not null,
  claimant_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  proof_identifier varchar(255),
  status varchar(20) default 'pending' not null check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- G. CAMPUS EVENTS
-- ------------------------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  description text not null,
  category varchar(50) default 'General' not null,
  event_date date not null,
  event_time varchar(50) not null,
  venue varchar(200) not null,
  banner_url text,
  capacity integer default 100 not null check (capacity > 0),
  registered_count integer default 0 not null check (registered_count >= 0),
  is_published boolean default true not null,
  author_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- H. EVENT REGISTRATIONS
-- ------------------------------------------------------------------------------
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade not null,
  student_id uuid references public.profiles(id) on delete cascade not null,
  status varchar(20) default 'registered' not null check (status in ('registered', 'attended', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (event_id, student_id)
);

-- ------------------------------------------------------------------------------
-- I. HELPDESK TICKETS
-- ------------------------------------------------------------------------------
create table if not exists public.helpdesk_tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number varchar(30) not null unique,
  title varchar(255) not null,
  description text not null,
  category varchar(50) not null,
  priority varchar(20) default 'normal' not null check (priority in ('low', 'normal', 'high', 'urgent')),
  status varchar(20) default 'open' not null check (status in ('open', 'in_progress', 'resolved', 'closed')),
  student_id uuid references public.profiles(id) on delete cascade not null,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- J. TICKET REPLIES (Threaded Conversations)
-- ------------------------------------------------------------------------------
create table if not exists public.ticket_replies (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.helpdesk_tickets(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  is_staff_reply boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- K. NOTIFICATIONS (Realtime User Alerts)
-- ------------------------------------------------------------------------------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title varchar(200) not null,
  message text not null,
  type varchar(50) default 'general' not null,
  link text,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ------------------------------------------------------------------------------
-- L. ACTIVITY LOGS (Audit Trail)
-- ------------------------------------------------------------------------------
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- 3. PERFORMANCE INDEXES
-- ==============================================================================
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_profiles_dept on public.profiles(department_id);
create index if not exists idx_notices_dept on public.notices(department_id);
create index if not exists idx_notices_pinned on public.notices(is_pinned);
create index if not exists idx_notices_published on public.notices(is_published);
create index if not exists idx_notice_reads_student on public.notice_reads(student_id);
create index if not exists idx_lost_found_status on public.lost_found_items(status);
create index if not exists idx_lost_found_user on public.lost_found_items(user_id);
create index if not exists idx_events_date on public.events(event_date);
create index if not exists idx_event_reg_student on public.event_registrations(student_id);
create index if not exists idx_helpdesk_student on public.helpdesk_tickets(student_id);
create index if not exists idx_helpdesk_status on public.helpdesk_tickets(status);
create index if not exists idx_ticket_replies_ticket on public.ticket_replies(ticket_id);
create index if not exists idx_notifications_user_read on public.notifications(user_id, is_read);
create index if not exists idx_activity_logs_user on public.activity_logs(user_id);

-- ==============================================================================
-- 4. SECURITY DEFINER HELPER FUNCTIONS
-- ==============================================================================

-- Check if current authenticated user has 'admin' role in public.profiles safely
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Check if current authenticated user has 'teacher' or 'admin' role
create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'teacher')
  );
$$;

-- ==============================================================================
-- 5. AUTOMATIC PROFILE TRIGGER ON SIGNUP (auth.users -> public.profiles)
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    role,
    avatar_url,
    student_id,
    department_id,
    semester
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student', -- Public signups ALWAYS default to student for safety!
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'student_id',
    case
      when new.raw_user_meta_data->>'department_id' is not null and new.raw_user_meta_data->>'department_id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      then (
        select d.id from public.departments d
        where d.id = (new.raw_user_meta_data->>'department_id')::uuid
        limit 1
      )
      else null
    end,
    new.raw_user_meta_data->>'semester'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Attach trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Trigger to increment/decrement event registered_count safely
create or replace function public.handle_event_registration_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (TG_OP = 'INSERT' and new.status = 'registered') then
    update public.events
    set registered_count = registered_count + 1
    where id = new.event_id;
  elsif (TG_OP = 'UPDATE') then
    if (old.status = 'registered' and new.status = 'cancelled') then
      update public.events
      set registered_count = greatest(0, registered_count - 1)
      where id = new.event_id;
    elsif (old.status = 'cancelled' and new.status = 'registered') then
      update public.events
      set registered_count = registered_count + 1
      where id = new.event_id;
    end if;
  elsif (TG_OP = 'DELETE' and old.status = 'registered') then
    update public.events
    set registered_count = greatest(0, registered_count - 1)
    where id = old.event_id;
  end if;
  return null;
end;
$$;

drop trigger if exists on_event_registration_changed on public.event_registrations;
create trigger on_event_registration_changed
  after insert or update or delete on public.event_registrations
  for each row execute function public.handle_event_registration_count();

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on ALL tables
alter table public.departments enable row level security;
alter table public.profiles enable row level security;
alter table public.notices enable row level security;
alter table public.notice_reads enable row level security;
alter table public.lost_found_items enable row level security;
alter table public.item_claims enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.helpdesk_tickets enable row level security;
alter table public.ticket_replies enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

-- ------------------------------------------------------------------------------
-- RLS: departments
-- ------------------------------------------------------------------------------
create policy "Departments are viewable by everyone"
  on public.departments for select
  using (true);

create policy "Departments manageable only by admins"
  on public.departments for all
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: profiles
-- ------------------------------------------------------------------------------
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id and role = (select role from public.profiles where id = auth.uid())); -- Prevent self-privilege escalation

create policy "Admins can update any profile"
  on public.profiles for update
  to authenticated
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: notices
-- ------------------------------------------------------------------------------
create policy "Published notices are viewable by everyone"
  on public.notices for select
  using (is_published = true or public.is_staff());

create policy "Staff and Admins can create notices"
  on public.notices for insert
  to authenticated
  with check (public.is_staff());

create policy "Staff and Admins can update notices"
  on public.notices for update
  to authenticated
  using (public.is_staff());

create policy "Admins can delete notices"
  on public.notices for delete
  to authenticated
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: notice_reads
-- ------------------------------------------------------------------------------
create policy "Students can view their own notice reads"
  on public.notice_reads for select
  to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy "Students can mark notices as read"
  on public.notice_reads for insert
  to authenticated
  with check (student_id = auth.uid());

-- ------------------------------------------------------------------------------
-- RLS: lost_found_items
-- ------------------------------------------------------------------------------
create policy "Approved items are viewable by authenticated users"
  on public.lost_found_items for select
  to authenticated
  using (status in ('approved', 'in_progress', 'resolved') or user_id = auth.uid() or public.is_admin());

create policy "Authenticated users can report lost or found items"
  on public.lost_found_items for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Users can edit their own item reports"
  on public.lost_found_items for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "Users and admins can delete item reports"
  on public.lost_found_items for delete
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: item_claims
-- ------------------------------------------------------------------------------
create policy "Claimants, item posters, and admins can view claims"
  on public.item_claims for select
  to authenticated
  using (
    claimant_id = auth.uid() or
    exists (select 1 from public.lost_found_items where id = item_claims.item_id and user_id = auth.uid()) or
    public.is_admin()
  );

create policy "Authenticated users can submit claims"
  on public.item_claims for insert
  to authenticated
  with check (claimant_id = auth.uid());

create policy "Item owners and admins can update claim status"
  on public.item_claims for update
  to authenticated
  using (
    exists (select 1 from public.lost_found_items where id = item_claims.item_id and user_id = auth.uid()) or
    public.is_admin()
  );

-- ------------------------------------------------------------------------------
-- RLS: events
-- ------------------------------------------------------------------------------
create policy "Published events are viewable by everyone"
  on public.events for select
  using (is_published = true or public.is_admin());

create policy "Admins can manage events"
  on public.events for all
  to authenticated
  using (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: event_registrations
-- ------------------------------------------------------------------------------
create policy "Students can view their own event registrations"
  on public.event_registrations for select
  to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy "Students can register for events"
  on public.event_registrations for insert
  to authenticated
  with check (student_id = auth.uid());

create policy "Students can update/cancel their own event registration"
  on public.event_registrations for update
  to authenticated
  using (student_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: helpdesk_tickets
-- ------------------------------------------------------------------------------
create policy "Students can view their own tickets, admins can view all"
  on public.helpdesk_tickets for select
  to authenticated
  using (student_id = auth.uid() or public.is_admin());

create policy "Students can create support tickets"
  on public.helpdesk_tickets for insert
  to authenticated
  with check (student_id = auth.uid());

create policy "Admins and ticket owners can update tickets"
  on public.helpdesk_tickets for update
  to authenticated
  using (student_id = auth.uid() or public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: ticket_replies
-- ------------------------------------------------------------------------------
create policy "Users can view replies for tickets they have access to"
  on public.ticket_replies for select
  to authenticated
  using (
    exists (select 1 from public.helpdesk_tickets where id = ticket_replies.ticket_id and student_id = auth.uid()) or
    public.is_admin()
  );

create policy "Users and admins can post ticket replies"
  on public.ticket_replies for insert
  to authenticated
  with check (
    sender_id = auth.uid() and (
      exists (select 1 from public.helpdesk_tickets where id = ticket_replies.ticket_id and student_id = auth.uid()) or
      public.is_admin()
    )
  );

-- ------------------------------------------------------------------------------
-- RLS: notifications
-- ------------------------------------------------------------------------------
create policy "Users can only view their own notifications"
  on public.notifications for select
  to authenticated
  using (user_id = auth.uid());

create policy "Users can update their own notifications (mark as read)"
  on public.notifications for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "Authenticated users or system can insert notifications"
  on public.notifications for insert
  to authenticated
  with check (true);

-- ------------------------------------------------------------------------------
-- RLS: activity_logs
-- ------------------------------------------------------------------------------
create policy "Users can view their own activity logs"
  on public.activity_logs for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

create policy "Users can insert their own activity log"
  on public.activity_logs for insert
  to authenticated
  with check (user_id = auth.uid());

-- ==============================================================================
-- 7. STORAGE BUCKETS SETUP & POLICIES
-- ==============================================================================
-- Insert the 4 dedicated storage buckets
insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('notices', 'notices', true),
  ('lost-found', 'lost-found', true),
  ('event-banners', 'event-banners', true)
on conflict (id) do update set public = excluded.public;

-- Storage RLS: Public read access for images and public files
create policy "Public Access to CampusFlow Media"
  on storage.objects for select
  using (bucket_id in ('avatars', 'notices', 'lost-found', 'event-banners'));

-- Storage RLS: Authenticated uploads
create policy "Authenticated users can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id in ('avatars', 'notices', 'lost-found', 'event-banners'));

create policy "Users can update or delete their uploaded media"
  on storage.objects for delete
  to authenticated
  using (auth.uid() = owner or public.is_admin());

