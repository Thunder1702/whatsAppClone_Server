--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2021-01-17 17:03:05

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
    first_name text,
    last_name text,
    email text,
    phone_number numeric,
    users_contact text,
    contact_username text
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
    message_text text
);


ALTER TABLE public.message OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16499)
-- Name: photo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.photo (
    url text,
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
    password text,
    email text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 16505)
-- Dependencies: 201
-- Data for Name: contact; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contact (first_name, last_name, email, phone_number, users_contact, contact_username) FROM stdin;
Tester	Testnachname	test@nomail.com	1111111111	testUser	\N
Klaus	Heinz	test0@no-mail.com	123456789	Larissa	test0
Lari	Fari	larissa@test.com	2222222	test0	Larissa
Testeer	TestHerr	test@nomail.com	23687	Larissa	TesterUsername
Test1	Herr Test	test1@nomail.com	100100	Larissa	test1
Lari	Fari	larissa@test.com	10010010	test1	Larissa
Klea	Lula	hasttest@nomail.com	7777777	Larissa	hashtest
\.


--
-- TOC entry 2996 (class 0 OID 16517)
-- Dependencies: 202
-- Data for Name: message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.message (id, message_to, message_from, message_text) FROM stdin;
2	test0	Larissa	Hallo test0 wie gehts?
0	testUser	0	test
1	0	testUser	testTest
3	Larissa	test0	Danke mir geht es gut und dir Larissa?
4	test0	Larissa	auch gut.
5	test0	Larissa	was gibt es neues?
6	Larissa	test0	nicht viel, bei dir?
7	test0	Larissa	alles beim alten :D
8	Larissa	test0	das ist gut
9	test1	Larissa	Hallo test1, steht das Meeting noch ?
10	Larissa	test1	Hallo , soweit ich weiß alles noch beim alten :D
11	test1	Larissa	gut dann sehen wir uns eh später :)
12	Larissa	test1	passt bis dann
13	Larissa	test1	Vergiss nicht auf die Kekse !!!!!!!!!!!!!!!!!
14	test1	Larissa	Nein keine Angst :'D
15	Larissa	test1	Hallo, ich will die neue Funktion testen. 
16	test1	Larissa	scheint zu funktionieren
17	test1	Larissa	nein es funktioniert doch nicht
18	Larissa	test1	test test
19	test0	Larissa	Hallo test0 TEST
20	Larissa	test0	Hallo zurück Larissa TEST
21	test1	Larissa	Hallo test1
22	Larissa	test1	Hallo Larissa
23	test0	Larissa	Hallo test0
24	Larissa	test0	hallo zurück
25	Larissa	test1	hallo
26	test1	Larissa	hallo 2
27	Larissa	test1	hallo 3
\.


--
-- TOC entry 2994 (class 0 OID 16499)
-- Dependencies: 200
-- Data for Name: photo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.photo (url, uploaded_by) FROM stdin;
	test0
	test1
bild_3.jpg	Larissa
\.


--
-- TOC entry 2997 (class 0 OID 16524)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (profilbild, status, name, password, email) FROM stdin;
		Test	test	\N
bild.jpg	Hallo ich benutze WhatsApp	Testname	test1234	\N
		Larissa	12345	larissa@test.com
		test0	333	test0@no-mail.com
		test1	4444	test1@nomail.com
		hashtest	$2b$10$9sS.P31nX.CZwWgK2cwIxOp/UsM469xqQ8kzdF5nrlTqJ7LDh3Fhq	hasttest@nomail.com
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


-- Completed on 2021-01-17 17:03:05

--
-- PostgreSQL database dump complete
--

