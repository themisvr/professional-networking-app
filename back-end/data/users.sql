INSERT INTO USERS (
	user_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
	'Admin',
	'Mc Admin',
	'admin@dina.com',
	'$2b$12$uPEqW12XhBjnelFRF.s.TuSVytzc.yFgptgGEEnN/e4VPxdRI.rCa', -- admin
	null,
	true
) ON CONFLICT DO NOTHING;

INSERT INTO USERS (
	user_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
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
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	nextval('user_id_seq'),
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

INSERT INTO JOB_POSTS (
    job_post_id,
    poster_id,
    title,
    description
) VALUES (
    nextval('job_post_id_seq'),
    3,
    'A job from a connected user',
    'We are looking for a connection to apply'
) ON CONFLICT DO NOTHING;

INSERT INTO USER_CONNECTIONS (
    user_id,
    follower_id
) VALUES (
    2,
    3
) ON CONFLICT DO NOTHING;

INSERT INTO USER_CONNECTIONS (
    user_id,
    follower_id
) VALUES (
    3,
    2

INSERT INTO POSTS (
    post_id,
    user_id,
    likes,
    content
) VALUES (
    nextval('post_id_seq'),
    2,
    4,
    'Facebook is hiring Software Engineers'
) ON CONFLICT DO NOTHING;


INSERT INTO POST_COMMENTS (
    comment_id,
    post_id,
    user_id,
    comment
) VALUES (
    nextval('post_comment_id_seq'),
    1,
    3,
    'This is a very nice post!'
) ON CONFLICT DO NOTHING;