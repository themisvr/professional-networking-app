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
