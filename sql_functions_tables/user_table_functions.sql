DROP FUNCTION IF EXISTS public.insert_user(VARCHAR(50), VARCHAR(50), text, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS public.insert_user(json);
CREATE OR REPLACE FUNCTION public.insert_user(
    p_json_data json
)
RETURNS text AS $f$
DECLARE
    v_data users;
BEGIN
    INSERT INTO users (email, username, password, date_joined)
    VALUES (
        (SELECT value FROM json_each_text(p_json_data) WHERE key = 'email'),
        (SELECT value FROM json_each_text(p_json_data) WHERE key = 'username'),
        (SELECT value FROM json_each_text(p_json_data) WHERE key = 'password'),
        (NOW())
    )
    RETURNING * INTO v_data;
    RETURN v_data.username;
END;
$f$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS public.find_user(VARCHAR(50));
CREATE OR REPLACE FUNCTION public.find_user(
    p_username VARCHAR(50)
)
RETURNS json AS $f$
DECLARE
    v_json json;
BEGIN
    v_json := to_json(u) FROM(
            SELECT * FROM users WHERE username = p_username
        ) u;
    RETURN v_json;
END;
$f$ LANGUAGE plpgsql;
