INSERT INTO USERS (
	user_id,
    parent_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
    null,
	'Admin',
	'Mc Admin',
	'admin@dina.com',
	'$2b$12$uPEqW12XhBjnelFRF.s.TuSVytzc.yFgptgGEEnN/e4VPxdRI.rCa', -- admin
	null,
	true
) ON CONFLICT DO NOTHING;

INSERT INTO USERS (
	user_id,
    parent_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
    null,
	'Tester',
	'Mc Tester',
	'tester@dina.com',
	'$2b$12$5dYYpgHuKW6K6mDK1BaMjuJEOrYPFVg3F5Sl1VREqcqfTSr/GzzZG', -- 12345678
	null,
	false
) ON CONFLICT DO NOTHING;

INSERT INTO PERSONAL_INFOS (
    personal_info_id,
    user_id,
    work_experience,
    education,
    personal_skills,
    work_experience_public,
    education_public,
    personal_skills_public
) VALUES (
    nextval('personal_info_id_seq'),
    2,
    'QA at Intel',
    'Harvard University',
    'Great QA',
    true,
    true,
    true
) ON CONFLICT DO NOTHING;

INSERT INTO USERS (
	user_id,
    parent_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
    2,
	'Cole',
	'Mc Cole',
	'cole@dina.com',
	'$2b$12$5dYYpgHuKW6K6mDK1BaMjuJEOrYPFVg3F5Sl1VREqcqfTSr/GzzZG', -- 12345678
	null,
	false
) ON CONFLICT DO NOTHING;

INSERT INTO PERSONAL_INFOS (
    personal_info_id,
    user_id,
    work_experience,
    education,
    personal_skills,
    work_experience_public,
    education_public,
    personal_skills_public
) VALUES (
    nextval('personal_info_id_seq'),
    3,
    'Software Engineer at Intel',
    'MIT University',
    'Team Player',
    true,
    true,
    true
) ON CONFLICT DO NOTHING;

INSERT INTO JOB_POSTS (
    job_post_id,
    poster_id,
    title,
    description
) VALUES (
    nextval('job_post_id_seq'),
    2,
    'Principal Software Engineer at Intel',
    'We are looking for a truly experienced software engineer to work at Intel.\nWe are looking for someone with good programming skills'
) ON CONFLICT DO NOTHING;