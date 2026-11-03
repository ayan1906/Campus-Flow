-- ==============================================================================
-- CampusFlow Seed Data Script (Initial Institutional Data)
-- ==============================================================================

-- 1. Insert Core University Departments
insert into public.departments (id, name, code, faculty, description)
values
  (
    'd1111111-1111-1111-1111-111111111111',
    'Computer Science & Engineering',
    'CSE',
    'Faculty of Science & Information Technology',
    'Undergraduate and graduate programs in software engineering, AI, cybersecurity, and computer systems.'
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    'Electrical & Electronic Engineering',
    'EEE',
    'Faculty of Engineering',
    'Specializations in microelectronics, power grids, telecommunications, and signal processing.'
  ),
  (
    'd3333333-3333-3333-3333-333333333333',
    'Business Administration',
    'BBA',
    'Faculty of Business & Economics',
    'Programs in accounting, corporate finance, marketing, and supply chain management.'
  ),
  (
    'd4444444-4444-4444-4444-444444444444',
    'Department of Law',
    'LAW',
    'Faculty of Law & Human Rights',
    'LL.B. and LL.M. curricula covering international law, constitutional jurisdiction, and corporate litigation.'
  )
on conflict (code) do update set
  name = excluded.name,
  faculty = excluded.faculty,
  description = excluded.description;

-- 2. Insert Initial Public Events
insert into public.events (
  id,
  title,
  description,
  category,
  event_date,
  event_time,
  venue,
  banner_url,
  capacity,
  registered_count,
  is_published
)
values
  (
    'e1111111-1111-1111-1111-111111111111',
    'Annual University Hackathon 2026',
    'A 48-hour competitive innovation hackathon focusing on AI for education, smart urban solutions, and sustainability.',
    'Tech & Coding',
    '2026-05-15',
    '09:00 AM – 06:00 PM',
    'Main Auditorium Hall',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&auto=format&fit=crop&q=80',
    120,
    0,
    true
  ),
  (
    'e2222222-2222-2222-2222-222222222222',
    'AI in Healthcare & Biotechnology Workshop',
    'Hands-on masterclass in clinical machine learning algorithms, biomedical image processing, and data ethics.',
    'Academic',
    '2026-05-18',
    '02:00 PM – 05:00 PM',
    'Room 402, CS Complex',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1000&auto=format&fit=crop&q=80',
    60,
    0,
    true
  ),
  (
    'e3333333-3333-3333-3333-333333333333',
    'Inter-Department Debate Championship 2026',
    'Parliamentary debate tournament addressing global economic policies, digital rights, and higher education reform.',
    'Cultural',
    '2026-05-20',
    '03:30 PM – 07:00 PM',
    'Open Amphitheatre',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1000&auto=format&fit=crop&q=80',
    200,
    0,
    true
  )
on conflict (id) do nothing;

-- 3. Insert Initial Official Notices
insert into public.notices (
  id,
  title,
  content,
  category,
  department_id,
  is_pinned,
  is_published,
  file_name,
  file_size
)
values
  (
    'n1111111-1111-1111-1111-111111111111',
    'Spring 2026 Midterm Examination Routine & Seating Plan',
    'The Controller of Examinations has published the finalized midterm routine for all departments. Review your assigned lab shifts and room numbers. Physical student IDs are strictly mandatory.',
    'Exam',
    'd1111111-1111-1111-1111-111111111111',
    true,
    true,
    'Official_Midterm_Routine_Spring2026.pdf',
    '1.4 MB'
  ),
  (
    'n2222222-2222-2222-2222-222222222222',
    'Tuition Fee Payment Schedule & Late Fine Waiver Window',
    'All enrolled students must clear their semester tuition installments before May 20, 2026 to ensure admit card generation is not blocked.',
    'Accounts',
    null, -- null means campus-wide
    false,
    true,
    'Tuition_Payment_Notice_2026.pdf',
    '820 KB'
  ),
  (
    'n3333333-3333-3333-3333-333333333333',
    'Central Library Extended Study Hours During Finals Week',
    'To support students during the examination period, the central library reference wing will remain open until 11:30 PM on weekdays.',
    'General',
    null,
    false,
    true,
    null,
    null
  )
on conflict (id) do nothing;
