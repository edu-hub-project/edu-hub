-- Some users, all their passwords will be "dev" as defined in /keycloak/imports-dev/edu-hub.json
INSERT INTO public."User" VALUES ('152f12c3-f7d2-4b73-8d29-603c164b0139', 'Student1', 'Student1', 'student1@example.com', 'http://localhost:4001/emulated-bucket/public/userid_152f12c3-f7d2-4b73-8d29-603c164b0139/profile_image/Student1_portrait.png', 'STUDENT', 'https://www.google.com', true, 'xedz2361', '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', 'UNI_FLENSBURG', '123456', NULL);
INSERT INTO public."User" VALUES ('b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'Student2', 'Student2', 'student2@example.com', 'http://localhost:4001/emulated-bucket/public/userid_b5df4676-3d75-4413-bfac-9cc4e2f61cd9/profile_image/student2_portrait.jpg', 'OTHER', 'http://www.google.com', false, 'vb43rty', '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, '654321', NULL);
INSERT INTO public."User" VALUES ('774b371a-b391-487f-ba57-1cee492eb233', 'Student3', 'Student3', 'student3@example.com', 'http://localhost:4001/emulated-bucket/public/userid_774b371a-b391-487f-ba57-1cee492eb233/profile_image/student3_portrait.gif', 'RETIREE', 'www.google.com', true, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('efd6479e-0c87-4247-92e5-42cbb5ef6848', 'Student4', 'Student4', 'student4@example.com', 'http://localhost:4001/emulated-bucket/public/userid_efd6479e-0c87-4247-92e5-42cbb5ef6848/profile_image/student4_portrait.bmp', 'ACADEMIA', 'google.com', false, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', 'OTHER', 'xed624', 'Harward');
INSERT INTO public."User" VALUES ('f1323e97-5671-450d-a665-727f7273c190', 'Student5', 'Student5', 'student5@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('086bbe72-0ec0-44f8-af14-2057b4d8e94e', 'Expert1', 'Expert1', 'expert1@example.com', 'http://localhost:4001/emulated-bucket/public/userid_086bbe72-0ec0-44f8-af14-2057b4d8e94e/profile_image/expert1_portrait.png', 'STUDENT', 'https://www.google.com', true, 'leki300s', '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', 'CAU_KIEL', NULL, NULL);
INSERT INTO public."User" VALUES ('1cd84073-d049-4a93-b39d-e14320dd68f4', 'Expert2', 'Expert2', 'expert2@example.com', 'http://localhost:4001/emulated-bucket/public/userid_1cd84073-d049-4a93-b39d-e14320dd68f4/profile_image/expert2_porträt.jpeg', 'UNEMPLOYED', 'http://www.google.com', false, 'numatirafisaa523', '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, '918273645', NULL);
INSERT INTO public."User" VALUES ('f39054eb-8993-4469-8e36-86ce5368e380', 'Expert3', 'Expert3', 'expert3@example.com', 'http://localhost:4001/emulated-bucket/public/userid_f39054eb-8993-4469-8e36-86ce5368e380/profile_image/expert3_portrait.gif', 'SELFEMPLOYED', 'www.google.com', true, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', 'FH_KIEL', NULL, NULL);
INSERT INTO public."User" VALUES ('ed1ea3aa-efe0-4176-baef-0f1a89348ce2', 'Expert4', 'Expert4', 'expert4@example.com', 'http://localhost:4001/emulated-bucket/public/userid_ed1ea3aa-efe0-4176-baef-0f1a89348ce2/profile_image/expert4_portrait.bmp', 'EMPLOYED', 'google.com', false, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('ef6979e4-2d6c-43e4-9f80-b93c1571ecf0', 'Expert5', 'Expert5', 'expert5@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('8914bee9-0549-44af-bcae-cafeec5ba92e', 'Admin', 'Admin', 'admin@example.com', 'http://localhost:4001/emulated-bucket/public/userid_8914bee9-0549-44af-bcae-cafeec5ba92e/profile_image/admin_portrait.png', 'EMPLOYED', NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('c924cfed-0ea1-428a-ae2d-6b895234d578', 'Student mit langem namen', 'um zu schauen ob das design hällt', 'student_mit_langem_namen_zu_design_test@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."User" VALUES ('338b11d0-87e1-43dd-89d3-ecefbaf729c2', 'Expert mit langem namen', 'um zu schauen ob das design hällt', 'expert_mit_langem_namen_zu_design_test@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2022-12-19 13:56:07.483474+00', NULL, NULL, NULL);
INSERT INTO public."Expert" VALUES (1, '086bbe72-0ec0-44f8-af14-2057b4d8e94e', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" VALUES (2, '1cd84073-d049-4a93-b39d-e14320dd68f4', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" VALUES (3, 'f39054eb-8993-4469-8e36-86ce5368e380', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" VALUES (4, 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" VALUES (5, 'ef6979e4-2d6c-43e4-9f80-b93c1571ecf0', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" VALUES (6, '338b11d0-87e1-43dd-89d3-ecefbaf729c2', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Admin" VALUES (1, '8914bee9-0549-44af-bcae-cafeec5ba92e', '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');

-- Past, present and future programs as well as some special cases
INSERT INTO public."Program" VALUES (1, 'Rent-a-Scientist 2023', '2022-09-26', '2022-09-30', NULL, NULL, NULL, false, NULL, NULL, NULL, false, false, NULL, NULL, 'RaS 2023', 2, true);
INSERT INTO public."Program" VALUES (2, 'Degrees', '2023-04-17', '2024-06-30', NULL, '2023-04-16', NULL, false, NULL, NULL, NULL, false, false, NULL, NULL, 'DEGREES', 2, true);
INSERT INTO public."Program" VALUES (3, 'Events', '2023-04-01', '2024-03-13', '2023-03-13', '2023-12-31', '2023-08-01', false, NULL, NULL, NULL, false, false, NULL, NULL, 'EVENTS', 2, true);
INSERT INTO public."Program" VALUES (4, 'Past Semester', CURRENT_DATE - INTERVAL '6 month', CURRENT_DATE - INTERVAL '2 month', NULL, NULL, NULL, true, NULL, NULL, NULL, true, true, '/programid_4/participation_certificate_template/opencampus_certificate_template_WS2022.png', '/programid_4/participation_certificate_template/opencampus_attendencecert_template_WS2022.png', 'PAST', 2, false);
INSERT INTO public."Program" VALUES (5, 'Current Semester', CURRENT_DATE - INTERVAL '1 month', CURRENT_DATE + INTERVAL '5 month', CURRENT_DATE - INTERVAL '2 month', CURRENT_DATE - INTERVAL '1 month', CURRENT_DATE + INTERVAL '5 month', false, 'https://survey.opencampus.sh/', '', 'https://survey.opencampus.sh/', false, false, '/programid_5/participation_certificate_template/opencampus_certificate_template_WS2022.png', '/programid_5/participation_certificate_template/opencampus_attendencecert_template_WS2022.png', 'PRESENT', 2, true);
INSERT INTO public."Program" VALUES (6, 'Future Semester', CURRENT_DATE + INTERVAL '6 month', CURRENT_DATE + INTERVAL '10 month', NULL, NULL, NULL, false, NULL, '', NULL, false, false, NULL, NULL, 'FUTURE', 2, false);


-- Courses of a semester that happened in the past

-- Past course that has complete and realistic values for most of everything
INSERT INTO public."Course" VALUES (1, 'Past Course 1', 'APPLICANTS_INVITED', '5', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi', 'DE', CURRENT_DATE - INTERVAL '6 month', 'NO_COST', true, true, 2, 'TUESDAY', 'http://localhost:4001/emulated-bucket/public/courseid_1/cover_image/cover_image.jpg', '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, 'Morbi sed', 'Sed quis', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia sapien quis tellus posuere egestas dignissim a quam. Quisque viverra purus vel cursus pulvinar. Nam maximus, ex vel egestas volutpat, libero metus interdum urna, ac tincidunt nisi sem a ligula. Etiam lacus dui, consequat feugiat dui vel, rhoncus sagittis elit. Proin convallis placerat magna eu maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus aliquam euismod diam, nec varius odio semper egestas. Duis ornare luctus mauris, ac scelerisque massa euismod sed. Aliquam lacinia tortor in faucibus dapibus. Ut suscipit tempus nunc vitae aliquet. Sed gravida hendrerit fringilla. Nulla ullamcorper purus eget libero maximus cursus. Ut non iaculis nibh, quis feugiat mi. Quisque gravida lectus enim, ultrices aliquam erat venenatis in. Donec id nisi ullamcorper, rutrum libero et, ullamcorper felis. ', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi at, euismod pulvinar nisi. Vivamus sit amet felis consequat felis iaculis sodales. Proin volutpat nisl sit amet magna congue, ut auctor orci laoreet. Nullam consectetur ut libero ac congue. Phasellus posuere est quis interdum fermentum. Morbi laoreet purus id diam vestibulum faucibus. Curabitur sollicitudin tortor nec accumsan lacinia. Donec ut dui vitae elit dictum pretium. Sed vel tincidunt leo, in pretium risus. Nunc velit nibh, imperdiet ac libero a, semper accumsan mauris. In vulputate eu neque eget mattis. Nulla auctor sodales cursus. Nunc eu nibh vel turpis interdum blandit eu sed nisi.', 'Sed quis sapien eget urna mattis imperdiet sed ut turpis. Aenean id sem nunc. Praesent efficitur ex in nunc tincidunt, vel lobortis metus feugiat. Quisque ultricies justo non sollicitudin porttitor. Praesent sit amet condimentum velit, a congue velit. Nullam rutrum at nisl sed interdum. Ut ut felis id nulla porttitor imperdiet. Nullam convallis lorem in ex luctus, nec lacinia massa lacinia. Suspendisse pretium sed dolor sit amet iaculis. ', 'https://chat.opencampus.sh', 20, '2022-11-01 18:00:02.674+00', '2022-11-01 20:00:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (1, 1, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseLocation" VALUES (1, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'KIEL', 'Musterstraße 21, 22232 Kiel');
INSERT INTO public."CourseLocation" VALUES (2, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', 'https://zoom.us');
INSERT INTO public."CourseInstructor" VALUES (1, 1, 1, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" VALUES (2, 1, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (1, 'Session1 for Past Course 1', 'The first session for "Past Course 1"', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '2 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (1, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 1, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (2, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 1, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (1, 1, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (2, 1, 4, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (2, 'Session2 for Past Course 1', 'The second session for "Past Course 1"', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (3, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 2, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (4, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 2, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (3, 2, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (3, 'Session3 for Past Course 1', 'The third session for "Past Course 1"', CURRENT_DATE - INTERVAL '5 month' + TIME '18:00:00', CURRENT_DATE - INTERVAL '5 month' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (5, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 3, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (6, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 3, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (4, 3, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (4, 'Session4 for Past Course 1', 'The fourth session for "Past Course 1"', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '3 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '3 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (7, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 4, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (8, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 4, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (5, 4, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (5, 'Session5 for Past Course 1', 'The fifth session for "Past Course 1"', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '2 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (9, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 5, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (10, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 5, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (6, 5, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (6, 'Session6 for Past Course 1', 'The sixth session for "Past Course 1"', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '1 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (11, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 6, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (12, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 6, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (7, 6, 3, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (8, 6, 4, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (13, 6, 5, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (7, 'Session7 for Past Course 1', 'The seventh session for "Past Course 1"', CURRENT_DATE - INTERVAL '3 month' + TIME '18:00:00', CURRENT_DATE - INTERVAL '3 month' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (13, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 7, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (14, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 7, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (9, 7, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (8, 'Session8 for Past Course 1', 'The eigth session for "Past Course 1"', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '3 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '3 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (15, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 8, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (16, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 8, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (10, 8, 3, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (9, 'Session9 for Past Course 1', 'The nineth session for "Past Course 1"', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '2 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (17, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 9, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (18, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 9, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (11, 9, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (10, 'Session10 for Past Course 1', 'The tenth session for "Past Course 1"', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '1 week' + TIME '20:00:00', 1, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (19, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 10, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (20, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 10, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (12, 10, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (1, 1, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', '/152f12c3-f7d2-4b73-8d29-603c164b0139/1/achievement_certificate_1.pdf', '/152f12c3-f7d2-4b73-8d29-603c164b0139/1/participation_certificate_1.pdf', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE - INTERVAL '6 month');
INSERT INTO public."CourseEnrollment" VALUES (2, 1, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'CONFIRMED', 'Curabitur quis aliquam magna. Suspendisse potenti. Vivamus pharetra, diam quis accumsan placerat, purus felis pellentesque augue, ac condimentum orci metus at tellus. Nulla augue nibh, pellentesque in ligula eget, ornare facilisis tortor. Etiam viverra sem nec nunc dignissim tincidunt. Fusce consectetur orci in orci lacinia, molestie aliquam mi eleifend. In ut metus vitae nisl blandit ultricies in et risus. Phasellus pellentesque lectus nec tristique vestibulum. Morbi lobortis sit amet massa non posuere. Sed fringilla est eros, non iaculis eros tempus eget. ', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE - INTERVAL '6 month');
INSERT INTO public."CourseEnrollment" VALUES (3, 1, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', '', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE - INTERVAL '6 month');
INSERT INTO public."CourseEnrollment" VALUES (4, 1, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'REJECTED', '', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL);
INSERT INTO public."AchievementOption" VALUES (1, 'online course project', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOption" VALUES (2, 'regular project', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOptionCourse" VALUES (1, 1, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" VALUES (2, 2, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionMentor" VALUES (1, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementOptionMentor" VALUES (2, 2, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementRecord" VALUES (1, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'PASSED', NULL, 1, NULL, NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '152f12c3-f7d2-4b73-8d29-603c164b0139', 1);
INSERT INTO public."AchievementRecord" VALUES (2, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 2, 'achievementrecordid_1/documentation/test_doc.odt', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 1);
INSERT INTO public."AchievementRecordAuthor" VALUES (1, 1, '152f12c3-f7d2-4b73-8d29-603c164b0139', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementRecordAuthor" VALUES (2, 2, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');

-- Past course that has some faulty or incomplete values
INSERT INTO public."Course" VALUES (2, 'Past Course 2', 'APPLICANTS_INVITED', '2.5', '', 'EN', CURRENT_DATE - INTERVAL '6 month', '', false, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, NULL, NULL, NULL, NULL, NULL, NULL, 20, '2022-11-01 16:00:02.674+00', '2022-11-01 22:00:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (2, 2, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseLocation" VALUES (3, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', NULL);
INSERT INTO public."CourseInstructor" VALUES (3, 2, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (11, 'Session1 for Past Course 2', 'The first session for "Past Course 2"', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '16:00:00', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (21, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 11, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (22, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 11, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (14, 11, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (12, 'Session2 for Past Course 2', 'The second session for "Past Course 2"', CURRENT_DATE - INTERVAL '5 month' + TIME '16:00:00', CURRENT_DATE - INTERVAL '5 month' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (23, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 12, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionSpeaker" VALUES (15, 12, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (13, 'Session3 for Past Course 2', 'The third session for "Past Course 2"', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '3 week' + TIME '16:00:00', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '3 week' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."Session" VALUES (14, 'Session4 for Past Course 2', 'The fourth session for "Past Course 2"', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '2 week' + TIME '16:00:00', CURRENT_DATE - INTERVAL '4 month' - INTERVAL '2 week' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (24, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 14, 'https://zoom.us', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (25, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 14, 'Musterstraße 21, 22232 Kiel', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (16, 14, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (15, 'Session5 for Past Course 2', 'The fifth session for "Past Course 2"', CURRENT_DATE - INTERVAL '4 month' + TIME '16:00:00', CURRENT_DATE - INTERVAL '4 month' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (26, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 15, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (17, 15, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (16, 'Session6 for Past Course 2', 'The sixth session for "Past Course 2"', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '1 week' + TIME '16:00:00', CURRENT_DATE - INTERVAL '3 month' - INTERVAL '1 week' + TIME '18:00:00', 2, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (27, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 16, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (18, 16, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (5, 2, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (6, 2, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."AchievementOptionCourse" VALUES (3, 2, 2, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');

-- Past course that only has the bare minimum to be functional
INSERT INTO public."Course" VALUES (3, 'Past Course 3', 'APPLICANTS_INVITED', '3', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', CURRENT_DATE - INTERVAL '6 month', '120€', true, true, 2, 'MONDAY', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, 'test', 'test', 'test', 'test', 'test', 'https://chat.opencampus.sh', 20, '2022-11-02 22:00:02.674+00', '2022-11-02 11:45:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (3, 3, 3, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseInstructor" VALUES (4, 3, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (17, 'Session1 for Past Course 3', 'The first session for "Past Course 1"', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '16:00:00', CURRENT_DATE - INTERVAL '5 month' - INTERVAL '1 week' + TIME '18:00:00', 3, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (28, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 17, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (19, 17, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (7, 3, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');


-- Courses of a semester that is currently running

-- Present course that has complete and realistic values for most of everything
INSERT INTO public."Course" VALUES (4, 'Present Course 1', 'APPLICANTS_INVITED', '5', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi', 'DE', CURRENT_DATE + INTERVAL '2 month', 'NO_COST', true, true, 2, 'TUESDAY', 'http://localhost:4001/emulated-bucket/public/courseid_4/cover_image/cover_image.jpg', '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, 'Morbi sed', 'Sed quis', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia sapien quis tellus posuere egestas dignissim a quam. Quisque viverra purus vel cursus pulvinar. Nam maximus, ex vel egestas volutpat, libero metus interdum urna, ac tincidunt nisi sem a ligula. Etiam lacus dui, consequat feugiat dui vel, rhoncus sagittis elit. Proin convallis placerat magna eu maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus aliquam euismod diam, nec varius odio semper egestas. Duis ornare luctus mauris, ac scelerisque massa euismod sed. Aliquam lacinia tortor in faucibus dapibus. Ut suscipit tempus nunc vitae aliquet. Sed gravida hendrerit fringilla. Nulla ullamcorper purus eget libero maximus cursus. Ut non iaculis nibh, quis feugiat mi. Quisque gravida lectus enim, ultrices aliquam erat venenatis in. Donec id nisi ullamcorper, rutrum libero et, ullamcorper felis. ', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi at, euismod pulvinar nisi. Vivamus sit amet felis consequat felis iaculis sodales. Proin volutpat nisl sit amet magna congue, ut auctor orci laoreet. Nullam consectetur ut libero ac congue. Phasellus posuere est quis interdum fermentum. Morbi laoreet purus id diam vestibulum faucibus. Curabitur sollicitudin tortor nec accumsan lacinia. Donec ut dui vitae elit dictum pretium. Sed vel tincidunt leo, in pretium risus. Nunc velit nibh, imperdiet ac libero a, semper accumsan mauris. In vulputate eu neque eget mattis. Nulla auctor sodales cursus. Nunc eu nibh vel turpis interdum blandit eu sed nisi.', 'Sed quis sapien eget urna mattis imperdiet sed ut turpis. Aenean id sem nunc. Praesent efficitur ex in nunc tincidunt, vel lobortis metus feugiat. Quisque ultricies justo non sollicitudin porttitor. Praesent sit amet condimentum velit, a congue velit. Nullam rutrum at nisl sed interdum. Ut ut felis id nulla porttitor imperdiet. Nullam convallis lorem in ex luctus, nec lacinia massa lacinia. Suspendisse pretium sed dolor sit amet iaculis. ', 'https://chat.opencampus.sh', 20, '2022-11-01 18:00:02.674+00', '2022-11-01 20:00:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (4, 4, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" VALUES (5, 4, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseLocation" VALUES (4, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'KIEL', 'Musterstraße 21, 22232 Kiel');
INSERT INTO public."CourseLocation" VALUES (5, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', 'https://zoom.us');
INSERT INTO public."CourseInstructor" VALUES (5, 4, 1, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" VALUES (6, 4, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (18, 'Session1 for Present Course 1', 'The first session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '2 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (29, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 18, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (30, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 18, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (20, 18, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (21, 18, 4, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (19, 'Session2 for Present Course 1', 'The second session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '1 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (31, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 19, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (32, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 19, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (22, 19, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (20, 'Session3 for Present Course 1', 'The third session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 month' + TIME '18:00:00', CURRENT_DATE + INTERVAL '1 month' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (33, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 20, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (34, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 20, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (23, 20, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (21, 'Session4 for Present Course 1', 'The fourth session for "Present Course 1"', CURRENT_DATE + INTERVAL '3 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '3 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (35, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 21, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (36, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 21, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (24, 21, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (22, 'Session5 for Present Course 1', 'The fifth session for "Present Course 1"', CURRENT_DATE + INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '2 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (37, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 22, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (38, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 22, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (25, 22, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (23, 'Session6 for Present Course 1', 'The sixth session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '1 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (39, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 23, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (40, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 23, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (26, 23, 3, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (27, 23, 4, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."SessionSpeaker" VALUES (28, 23, 5, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (24, 'Session7 for Present Course 1', 'The seventh session for "Present Course 1"', CURRENT_DATE + TIME '18:00:00', CURRENT_DATE + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (41, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 24, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (42, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 24, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (29, 24, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (25, 'Session8 for Present Course 1', 'The eigth session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '1 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (43, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 25, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (44, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 25, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (30, 25, 3, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (26, 'Session9 for Present Course 1', 'The nineth session for "Present Course 1"', CURRENT_DATE + INTERVAL '2 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '2 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (45, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 26, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (46, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 26, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (31, 26, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (27, 'Session10 for Present Course 1', 'The tenth session for "Present Course 1"', CURRENT_DATE + INTERVAL '3 week' + TIME '18:00:00', CURRENT_DATE + INTERVAL '3 week' + TIME '20:00:00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', true);
INSERT INTO public."SessionAddress" VALUES (47, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 27, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (48, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 27, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (32, 27, 1, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (8, 4, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE + INTERVAL '2 month');
INSERT INTO public."CourseEnrollment" VALUES (9, 4, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'CONFIRMED', 'Curabitur quis aliquam magna. Suspendisse potenti. Vivamus pharetra, diam quis accumsan placerat, purus felis pellentesque augue, ac condimentum orci metus at tellus. Nulla augue nibh, pellentesque in ligula eget, ornare facilisis tortor. Etiam viverra sem nec nunc dignissim tincidunt. Fusce consectetur orci in orci lacinia, molestie aliquam mi eleifend. In ut metus vitae nisl blandit ultricies in et risus. Phasellus pellentesque lectus nec tristique vestibulum. Morbi lobortis sit amet massa non posuere. Sed fringilla est eros, non iaculis eros tempus eget. ', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE + INTERVAL '2 month');
INSERT INTO public."CourseEnrollment" VALUES (10, 4, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', '', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', CURRENT_DATE + INTERVAL '2 month');
INSERT INTO public."CourseEnrollment" VALUES (11, 4, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'REJECTED', '', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL);
INSERT INTO public."AchievementOption" VALUES (3, 'online course project present', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOption" VALUES (4, 'regular project present', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOptionCourse" VALUES (4, 3, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" VALUES (5, 4, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionMentor" VALUES (3, 3, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementOptionMentor" VALUES (4, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementRecord" VALUES (3, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 3, NULL, NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '152f12c3-f7d2-4b73-8d29-603c164b0139', 4);
INSERT INTO public."AchievementRecord" VALUES (4, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 4, 'achievementrecordid_4/documentation/test_doc.odt', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 4);
INSERT INTO public."AchievementRecordAuthor" VALUES (3, 4, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementRecordAuthor" VALUES (4, 4, '774b371a-b391-487f-ba57-1cee492eb233', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');


-- Present course that has some faulty or incomplete values
INSERT INTO public."Course" VALUES (5, 'Present Course 2', 'APPLICANTS_INVITED', '2.5', '', 'EN', CURRENT_DATE + INTERVAL '2 month', '', false, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, NULL, NULL, NULL, NULL, NULL, NULL, 20, '2022-11-01 16:00:02.674+00', '2022-11-01 22:00:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (6, 5, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseLocation" VALUES (6, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', NULL);
INSERT INTO public."CourseInstructor" VALUES (7, 2, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (28, 'Session1 for Present Course 2', 'The first session for "Present Course 2"', CURRENT_DATE + INTERVAL '1 week' + TIME '16:00:00', CURRENT_DATE + INTERVAL '1 week' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (49, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 28, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (50, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 28, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (33, 28, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (29, 'Session2 for Present Course 2', 'The second session for "Present Course 2"', CURRENT_DATE + INTERVAL '2 week' + TIME '16:00:00', CURRENT_DATE + INTERVAL '2 week' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (51, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 29, 'Musterstraße 21, 22232 Kiel', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionSpeaker" VALUES (34, 29, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (30, 'Session3 for Present Course 2', 'The third session for "Present Course 2"', CURRENT_DATE + INTERVAL '3 week' + TIME '16:00:00', CURRENT_DATE + INTERVAL '3 week' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."Session" VALUES (31, 'Session4 for Present Course 2', 'The fourth session for "Present Course 2"', CURRENT_DATE + INTERVAL '1 month' + TIME '16:00:00', CURRENT_DATE + INTERVAL '1 month' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (52, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 31, 'https://zoom.us', 'FREETEXT_ADDRESS');
INSERT INTO public."SessionAddress" VALUES (53, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 31, 'Musterstraße 21, 22232 Kiel', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (35, 31, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (32, 'Session5 for Present Course 2', 'The fifth session for "Present Course 2"', CURRENT_DATE + INTERVAL '2 month' + TIME '16:00:00', CURRENT_DATE + INTERVAL '2 month' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (54, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 32, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (36, 32, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."Session" VALUES (33, 'Session6 for Present Course 2', 'The sixth session for "Present Course 2"', CURRENT_DATE + INTERVAL '3 month' + TIME '16:00:00', CURRENT_DATE + INTERVAL '3 month' + TIME '18:00:00', 5, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (55, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 32, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (37, 32, 6, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (12, 5, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (13, 5, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');

-- Present course that only has the bare minimum to be functional
INSERT INTO public."Course" VALUES (6, 'Present Course 3', 'APPLICANTS_INVITED', '3', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', CURRENT_DATE + INTERVAL '2 month', '120€', true, true, 2, 'MONDAY', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, 'test', 'test', 'test', 'test', 'test', 'https://chat.opencampus.sh', 20, '2022-11-02 22:00:02.674+00', '2022-11-02 11:45:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (7, 6, 3, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" VALUES (8, 6, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseInstructor" VALUES (8, 3, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."Session" VALUES (34, 'Session1 for Present Course 3', 'The first session for "Present Course 1"', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '1 week' + TIME '16:00:00', CURRENT_DATE + INTERVAL '1 month' + INTERVAL '2 week' + TIME '18:00:00', 6, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', NULL);
INSERT INTO public."SessionAddress" VALUES (56, '2022-12-19 13:21:41.891287+00', '2022-12-19 13:21:41.891287+00', 34, 'https://zoom.us', 'URL');
INSERT INTO public."SessionSpeaker" VALUES (38, 34, 2, '2022-12-19 13:21:51.940891+00', '2022-12-19 13:21:51.940891+00');
INSERT INTO public."CourseEnrollment" VALUES (14, 6, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');

-- Degrees and Events

-- Present course that is a degree and only has the bare minimum to be functional
INSERT INTO public."Course" VALUES (7, 'This is a Degree', 'APPLICANTS_INVITED', '12,5', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', CURRENT_DATE + INTERVAL '1 month', '0', true, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 2, 'headingDescriptionField1', 'headingDescriptionField2', 'Content Description Field 1', 'Content Description Field 2', 'Lerning Goal 1\nLerning Goal 2', 'https://chat.opencampus.sh', 200, '2022-11-02 22:00:02.674+00', '2022-11-02 11:45:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (9, 7, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseInstructor" VALUES (9, 7, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseEnrollment" VALUES (15, 7, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (16, 7, '8914bee9-0549-44af-bcae-cafeec5ba92e', 'CONFIRMED', 'I like cats and dogs', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (17, 7, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'APPLIED', 'The dog looks perfect', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (18, 7, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (19, 7, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" VALUES (20, 7, 'f1323e97-5671-450d-a665-727f7273c190', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
-- Adding Degree Courses
INSERT INTO public."CourseDegree" VALUES (1, 1, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" VALUES (2, 2, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" VALUES (3, 4, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" VALUES (4, 5, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');



-- Present course that is an event and only has the bare minimum to be functional
INSERT INTO public."Course" VALUES (8, 'This is an Event', 'APPLICANTS_INVITED', 'NONE', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', CURRENT_DATE + INTERVAL '1 month', '0', false, true, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 3, 'headingDescriptionField1', 'headingDescriptionField2', 'Content Description Field 1', 'Content Description Field 2', 'Lerning Goal 1\nLerning Goal 2', NULL, 200, '2022-11-02 22:00:02.674+00', '2022-11-02 11:45:01.513+00', true);
INSERT INTO public."CourseGroup" VALUES (10, 8, 5, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseInstructor" VALUES (10, 8, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" VALUES (11, 8, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseEnrollment" VALUES (21, 8, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');

INSERT INTO public."CertificateTemplateText" VALUES (
    1, 
    'achievement certificate example', 
    '<html>
      <head>
        <meta charset=''utf-8'' />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"> 
      </head>
      <body style="height:297mm; width:210mm; margin: 0px;font-family: ''Lato'', sans-serif !important;padding: 0px">
        <img src="{{ template }}" style="height:297mm;width:210mm" >
        <div style="position:absolute;top:0mm;left:63mm;width:130mm;height:100%;">
          <span style="position:absolute;top:50mm;font-size:7mm;color:#777777 !important;text-align:left;width:100%">{{ full_name }}</span>  
          <span style="position:absolute;top:63mm;font-size:3.5mm;color:#777777 !important;text-align:left;width:100%">
            hat im {{ semester }} an dem Kurs
          </span>
          <span style="position:absolute;top:64mm;font-size:7mm;color:#777777 !important;text-align:left;width:100%"></br>{{ course_name }}</span>  
          <span style="position:absolute;top:90mm;font-size:3.5mm;color:#999999 !important">
            <p>an folgenden Terminen teilgenommen:</p>
            <p>         
              <ul>
                {% for event in event_entries %}
                    <li>{{ event }} </li>
                {% endfor %}
              </ul>
            </p>
            <p>
              </br>
              Bei dem Kurs handelt es sich um ein interdisziplinäres Weiterbildungsangebot im </br>
              Rahmen des Kieler Bildungsclusters opencampus.sh. </br>
              Das Modul wird über das Zentrum für Schlüsselqualifikationen an der Christian-Albrechts-Universität zu Kiel angeboten.
            </p>
          </span>
        </div>
      </body>
    </html>', 
    '2023-12-14 13:40:34.079378+00', 
    '2023-12-14 13:55:01.645233+00'
);
INSERT INTO public."CertificateTemplateText" VALUES (
    2, 
    'attendance certificate example', 
    '<html>
      <head>
        <meta charset=''utf-8'' />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"> 
      </head>
      <body style="height:297mm; width:210mm; margin: 0px;font-family: ''Lato'', sans-serif !important;padding: 0px">
        <img src="{{ template }}" style="height:297mm;width:210mm" >
        <div style="position:absolute;top:0mm;left:63mm;width:130mm;height:100%;">
          <span style="position:absolute;top:50mm;font-size:7mm;color:#777777 !important;text-align:left;width:100%">{{ full_name }}</span>  
          <span style="position:absolute;top:63mm;font-size:3.5mm;color:#777777 !important;text-align:left;width:100%">
            hat im {{ semester }} erfolgreich an dem Kurs
          </span>
          <span style="position:absolute;top:64mm;font-size:7mm;color:#777777 !important;text-align:left;width:100%"></br>{{ course_name }}</span>  
          <span style="position:absolute;top:90mm;font-size:3.5mm;color:#999999 !important">
            <p>teilgenommen.</p>
            <p>
              Bei dem Kurs handelt es sich um ein interdisziplinäres Weiterbildungsangebot im </br>
              Rahmen des Kieler Bildungsclusters opencampus.sh. </br>
              Das Modul wird über das Zentrum für Schlüsselqualifikationen an der Christian-Albrechts-Universität zu Kiel angeboten.
            </p>
            <p>
              <b>Für den Abschluss des Kurses wurde ein Arbeitsumfang entsprechend von {{ ects }} ECTS erbracht. Dazu hat die/der Teilnehmende</b>
              <ul>
                <li>aktiv an den Kursterminen teilgenommen,</li>
                {% if not practical_project.blank %}
                  <li>das Praxisprojekt "{{ practical_project }}" erfolgreich abgeschlossen</li>
                {% endif %}
                {% if not online_courses.blank %}
                  <li>die begleitenden Online-Kurse erfolgreich abgeschlossen: {{ online_courses }}</li>
                {% endif %}
              </ul>
            </p>
            <p>
              {{ markdown }}
              <b>Durch den erfolgreichen Abschluss des Kurses hat die/der Teilnehmende gelernt:</b></br>      
              {{ certificate_text }}
            </p>
          </span>
        </div>
      </body>
    </html>', 
    '2023-12-14 13:40:34.079378+00', 
    '2023-12-14 13:55:01.645233+00'
);



--INSERT INTO public."Attendance" VALUES (1, 1, '3dee812b-865e-497b-b247-ff3a6a978530', 'ATTENDED', '2022-12-19 13:55:28.341956+00', '2022-12-19 13:55:28.341956+00', NULL, 'INSTRUCTOR', NULL, NULL, NULL, NULL);
--INSERT INTO public."Attendance" VALUES (2, 2, '3dee812b-865e-497b-b247-ff3a6a978530', 'ATTENDED', '2022-12-19 13:55:28.893252+00', '2022-12-19 13:55:28.893252+00', NULL, 'INSTRUCTOR', NULL, NULL, NULL, NULL);
--INSERT INTO public."Attendance" VALUES (3, 3, '3dee812b-865e-497b-b247-ff3a6a978530', 'ATTENDED', '2022-12-19 13:55:29.341565+00', '2022-12-19 13:55:29.341565+00', NULL, 'INSTRUCTOR', NULL, NULL, NULL, NULL);

--INSERT INTO public."MailLog" VALUES (1, 'Kurseinladung Course 1 für Colin', 'Hallo Colin Clausen, du bist eingeladen, bitte melde dich zurück bis zum 26.12.2022', 'c.clausen@pct-digital.de', 'steffen@opencampus.sh', NULL, NULL, '2022-12-19 13:50:11.140409+00', '2022-12-19 13:50:11.140409+00', NULL, 'READY_TO_SEND');

--INSERT INTO public."MailTemplate" VALUES (1, 'Kurseinladung [Enrollment:CourseId--Course:Name] für [User:Firstname]', 'Hallo [User:Firstname] [User:LastName], du bist eingeladen, bitte melde dich zurück bis zum [Enrollment:ExpirationDate]', '2022-12-19 13:48:39.364227+00', '2022-12-19 13:49:58.269909+00', NULL, NULL, NULL, 'INVITE');

-- Set internal index counters to the correct value
SELECT setval('"Course_Id_seq"'::regclass, (SELECT MAX( "id") FROM "Course") + 1);
SELECT setval('"Date_Id_seq"'::regclass, (SELECT MAX( "id") FROM "Session") + 1);
SELECT setval('"SessionSpeaker_id_seq"'::regclass, (SELECT MAX( "id") FROM "SessionSpeaker") + 1);
SELECT setval('"Semester_Id_seq"'::regclass, (SELECT MAX( "id") FROM "Program") + 1);
SELECT setval('"Attendence_Id_seq"'::regclass, (SELECT MAX( "id") FROM "Attendance") + 1);
SELECT setval('"Enrollment_Id_seq"'::regclass, (SELECT MAX( "id") FROM "CourseEnrollment") + 1);
SELECT setval('"CourseInstructor_Id_seq"'::regclass, (SELECT MAX( "id") FROM "CourseInstructor") + 1);
SELECT setval('"SessionAddress_id_seq"'::regclass, (SELECT MAX( "id") FROM "SessionAddress") + 1);
SELECT setval('"Instructor_Id_seq"'::regclass, (SELECT MAX( "id") FROM "Expert") + 1);
SELECT setval('"CourseAddress_id_seq"'::regclass, (SELECT MAX( "id") FROM "CourseLocation") + 1);
SELECT setval('"AchievementOption_id_seq"'::regclass, (SELECT MAX("id") FROM "AchievementOption") + 1);
SELECT setval('"AchievementOptionCourse_id_seq"'::regclass, (SELECT MAX("id") FROM "AchievementOptionCourse") + 1);
SELECT setval('"AchievementOptionMentor_id_seq"'::regclass, (SELECT MAX("id") FROM "AchievementOptionMentor") + 1);
SELECT setval('"AchievementRecord_id_seq"'::regclass, (SELECT MAX("id") FROM "AchievementRecord") + 1);
SELECT setval('"AchievementRecordAuthor_id_seq"'::regclass, (SELECT MAX("id") FROM "AchievementRecordAuthor") + 1);
SELECT setval('"CourseGroup_id_seq"'::regclass, (SELECT MAX("id") FROM "CourseGroup") + 1);
SELECT setval('"CourseDegree_id_seq"'::regclass, (SELECT MAX("id") FROM "CourseDegree") + 1);
