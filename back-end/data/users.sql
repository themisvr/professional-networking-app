INSERT INTO USERS (
	user_id,
	first_name,
	last_name,
	email,
	password,
	phone_number,
	is_admin
) VALUES (
	1,
	'Admin',
	'Mc Admin',
	'admin@dina.com',
	'$2b$12$uPEqW12XhBjnelFRF.s.TuSVytzc.yFgptgGEEnN/e4VPxdRI.rCa',
	null,
	true
) ON CONFLICT DO NOTHING;
