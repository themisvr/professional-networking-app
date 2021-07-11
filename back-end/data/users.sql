INSERT INTO USERS (
	user_id,
	name,
	surname,
	email,
	password,
	telephone,
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
