--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-06 16:11:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 16505)
-- Name: contact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contact (
    id numeric,
    first_name text,
    last_name text,
    email text,
    phone_number numeric,
    users_contact text
);


ALTER TABLE public.contact OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16517)
-- Name: message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message (
    id numeric,
    message_to text,
    message_from text,
    message_text text,
    read boolean
);


ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16499)
-- Name: photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photo (
    id numeric,
    url text,
    description text,
    uploaded_by text
);


ALTER TABLE public.photo OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16524)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    profilbild text,
    status text,
    name text,
    password character(32),
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 16505)
-- Dependencies: 201
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (id, first_name, last_name, email, phone_number, users_contact) FROM stdin;
0	Tester	Testnachname	test@nomail.com	1111111111	testUser
\.


--
-- TOC entry 2996 (class 0 OID 16517)
-- Dependencies: 202
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (id, message_to, message_from, message_text, read) FROM stdin;
0	testUser	0	test	f
1	0	testUser	testTest	f
2	testUser	1	blablabla	f
\.


--
-- TOC entry 2994 (class 0 OID 16499)
-- Dependencies: 200
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photo (id, url, description, uploaded_by) FROM stdin;
0	http://test.at	testDesc	testUser
1	http://test.at	testDesc	0
\.


--
-- TOC entry 2997 (class 0 OID 16524)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (profilbild, status, name, password, email) FROM stdin;
		Test	test                            	\N
bild.jpg	Hallo ich benutze WhatsApp	Testname	test1234                        	\N
\.


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE contact; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.contact TO whatsapp_root;
GRANT ALL ON TABLE public.contact TO gallery_root;


--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE message; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.message TO whatsapp_root;
GRANT ALL ON TABLE public.message TO gallery_root;


--
-- TOC entry 3005 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE photo; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.photo TO whatsapp_root;
GRANT ALL ON TABLE public.photo TO gallery_root;


--
-- TOC entry 3006 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE users; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.users TO whatsapp_root;
GRANT ALL ON TABLE public.users TO gallery_root;


-- Completed on 2021-01-06 16:11:56

--
-- PostgreSQL database dump complete
--

