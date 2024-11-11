SET check_function_bodies = false;
INSERT INTO public."AchievementOption" (id, title, description, "recordType", "evaluationScriptUrl", created_at, updated_at, "csvTemplateUrl", "showScoreAuthors", published, "achievementDocumentationTemplateId") VALUES (1, 'online course project', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOption" (id, title, description, "recordType", "evaluationScriptUrl", created_at, updated_at, "csvTemplateUrl", "showScoreAuthors", published, "achievementDocumentationTemplateId") VALUES (2, 'regular project', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOption" (id, title, description, "recordType", "evaluationScriptUrl", created_at, updated_at, "csvTemplateUrl", "showScoreAuthors", published, "achievementDocumentationTemplateId") VALUES (3, 'online course project present', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."AchievementOption" (id, title, description, "recordType", "evaluationScriptUrl", created_at, updated_at, "csvTemplateUrl", "showScoreAuthors", published, "achievementDocumentationTemplateId") VALUES (4, 'regular project present', 'Vivamus rutrum congue volutpat. Fusce quis convallis elit, id dictum lacus. Nam volutpat suscipit dapibus. Aliquam nunc diam, fringilla in laoreet eget, luctus quis libero.', 'ONLINE_COURSE', NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL, NULL, true, NULL);
INSERT INTO public."CertificateTemplateText" (id, title, html, created_at, updated_at, "certificateType", "recordType") VALUES (1, 'achievement certificate example', '<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
  <title>Document Title</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"> 
  <style type="text/css">
    @page {
      size: a4;
      background-image: url("{{ template }}");
      background-position: center center;
      background-size: cover;
      @frame content_frame {
        left: 165pt;
        width: 420pt;
        top: 150pt;
        height:500pt;
      }
    }
    body, html {
      font-family: ''Lato'', sans-serif !important;
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
    }
    .content {
      position: absolute;
      top: 0mm;
      left: 63mm;
      width: 130mm;
      height: 100%;
    }
    .content span, .content p, .content ul, .content li {
      color: #777;
      text-align: left;
      width: 100%;
    }
    .big {
      font-size: 7mm;
      font-weight: Black 900;
    }
    .small {
      font-size: 4.2mm;
    }
    .bold {
      font-weight: bold;
    }
  </style>
</head>
<body>
   <div class="content">
    <span class="big bold" style="top:50mm;">{{ full_name }}</span><br><br><br>
    <span class="small" style="top:63mm;">
      hat im {{ semester }} an dem Kurs
    </span><br><br><br>
    <span class="big bold" style="top:50mm;">{{ course_name }}</span><br><br>
    <div class="small" style="top:90mm;">
      <p> teilgenommen.</p>
      <p>
        Bei dem Kurs handelt es sich um ein interdisziplinäres Weiterbildungsangebot im
        Rahmen des Kieler Bildungsclusters opencampus.sh.
        Das Modul wird über das Zentrum für Schlüsselqualifikationen an der Christian-Albrechts-Universität zu Kiel angeboten.
      </p>
      <p>
        Für den Abschluss des Kurses wurde ein Arbeitsumfang entsprechend von {{ ECTS }} Arbeitsstunden erbracht. Dazu hat die/der Teilnehmende
      </p>
       <ul>
        <li>aktiv an den Kursterminen teilgenommen,</li>
        <li>das Praxisprojekt "{{ praxisprojekt }}" erfolgreich abgeschlossen.</li>
      </ul>
    </div>
    <div class="small" style="top:150mm;">
  <p>Durch den erfolgreichen Abschluss des Kurses hat die/der Teilnehmende gelernt:</p>
  <ul>
    {% for goal in learningGoalsList %}
      <li>{{ goal }}</li>
    {% endfor %}
  </ul>
</div>
  </div>
</body>
</html>', '2023-12-14 13:40:34.079378+00', '2023-12-14 13:55:01.645233+00', NULL, NULL);
INSERT INTO public."CertificateTemplateText" (id, title, html, created_at, updated_at, "certificateType", "recordType") VALUES (2, 'attendance certificate example', '<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
  <title>Document Title</title>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap" rel="stylesheet"> 
  <style type="text/css">
    @page {
      size: a4;
      background-image: url("{{ template }}");
      background-position: center center;
      background-size: cover;
      @frame content_frame {
        left: 165pt;
        width: 420pt;
        top: 150pt;
        height:500pt;
      }
    }
    body, html {
      font-family: ''Lato'', sans-serif !important;
      margin: 0;
      padding: 0;
      width: 210mm;
      height: 297mm;
    }
    .content {
      position: absolute;
      top: 0mm;
      left: 63mm;
      width: 130mm;
      height: 100%;
    }
    .content span, .content p, .content ul, .content li {
      color: #777;
      text-align: left;
      width: 100%;
    }
    .big {
      font-size: 7mm;
    }
    .small {
      font-size: 4.2mm;
    }
    .bold {
      font-weight: bold;
    }
  </style>
</head>
<body>
   <div class="content">
    <span class="big bold" style="top:50mm;">{{ full_name }}</span><br>
    <span class="small" style="top:63mm;">
      hat im {{semester}} an dem Kurs
    </span><br>
    <span class="big bold" style="top: 64mm;">{{course_name}}</span>
    <div class="small" style="top: 90mm;">
      <p>an folgenden Terminen teilgenommen:</p>
       </ul>
       {% for entry in event_entries %}
      <li>{{ entry }}</li>
    {% endfor %}
    </ul>
      <p>
      <p>
        Bei dem Kurs handelt es sich um ein interdisziplinäres Weiterbildungsangebot im
        Rahmen des Kieler Bildungsclusters opencampus.sh.
        Das Modul wird über das Zentrum für Schlüsselqualifikationen an der Christian-Albrechts-Universität zu Kiel angeboten.
      </p>
</div>
  </div>
</body>
</html>', '2023-12-14 13:40:34.079378+00', '2023-12-14 13:55:01.645233+00', NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (1, 'Rent-a-Scientist 2023', '2022-09-26', '2022-09-30', NULL, NULL, NULL, false, NULL, NULL, NULL, false, false, NULL, NULL, 'RaS 2023', 2, true, NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (2, 'Degrees', '2023-04-17', '2024-06-30', NULL, '2023-04-16', NULL, false, NULL, NULL, NULL, false, false, NULL, NULL, 'DEGREES', 2, true, NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (3, 'Events', '2023-04-01', '2024-03-13', '2023-03-13', '2023-12-31', '2023-08-01', false, NULL, NULL, NULL, false, false, NULL, NULL, 'EVENTS', 2, true, NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (4, 'Past Semester', '2024-05-02', '2024-09-02', NULL, NULL, NULL, true, NULL, NULL, NULL, true, true, '/programid_4/participation_certificate_template/opencampus_certificate_template_WS2022.png', '/programid_4/participation_certificate_template/opencampus_attendencecert_template_WS2022.png', 'PAST', 2, false, NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (5, 'Current Semester', '2024-10-02', '2025-04-02', '2024-09-02', '2024-10-02', '2025-04-02', false, 'https://survey.opencampus.sh/', '', 'https://survey.opencampus.sh/', false, false, '/programid_5/participation_certificate_template/opencampus_certificate_template_WS2022.png', '/programid_5/participation_certificate_template/opencampus_attendencecert_template_WS2022.png', 'PRESENT', 2, true, NULL, NULL);
INSERT INTO public."Program" (id, title, "lectureStart", "lectureEnd", "applicationStart", "defaultApplicationEnd", "achievementRecordUploadDeadline", visibility, "startQuestionnaire", "speakerQuestionnaire", "closingQuestionnaire", "visibilityAttendanceCertificate", "visibilityAchievementCertificate", "attendanceCertificateTemplateURL", "achievementCertificateTemplateURL", "shortTitle", "defaultMaxMissedSessions", published, "attendanceCertificateTemplateTextId", "achievementCertificateTemplateTextId") VALUES (6, 'Future Semester', '2025-05-02', '2025-09-02', NULL, NULL, NULL, false, NULL, '', NULL, false, false, NULL, NULL, 'FUTURE', 2, false, NULL, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (1, 'Past Course 1', 'APPLICANTS_INVITED', '5', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi', 'DE', '2024-05-02', 'NO_COST', true, true, 2, 'TUESDAY', 'http://localhost:4001/emulated-bucket/public/courseid_1/cover_image/cover_image.jpg', '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, 'Morbi sed', 'Sed quis', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia sapien quis tellus posuere egestas dignissim a quam. Quisque viverra purus vel cursus pulvinar. Nam maximus, ex vel egestas volutpat, libero metus interdum urna, ac tincidunt nisi sem a ligula. Etiam lacus dui, consequat feugiat dui vel, rhoncus sagittis elit. Proin convallis placerat magna eu maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus aliquam euismod diam, nec varius odio semper egestas. Duis ornare luctus mauris, ac scelerisque massa euismod sed. Aliquam lacinia tortor in faucibus dapibus. Ut suscipit tempus nunc vitae aliquet. Sed gravida hendrerit fringilla. Nulla ullamcorper purus eget libero maximus cursus. Ut non iaculis nibh, quis feugiat mi. Quisque gravida lectus enim, ultrices aliquam erat venenatis in. Donec id nisi ullamcorper, rutrum libero et, ullamcorper felis. ', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi at, euismod pulvinar nisi. Vivamus sit amet felis consequat felis iaculis sodales. Proin volutpat nisl sit amet magna congue, ut auctor orci laoreet. Nullam consectetur ut libero ac congue. Phasellus posuere est quis interdum fermentum. Morbi laoreet purus id diam vestibulum faucibus. Curabitur sollicitudin tortor nec accumsan lacinia. Donec ut dui vitae elit dictum pretium. Sed vel tincidunt leo, in pretium risus. Nunc velit nibh, imperdiet ac libero a, semper accumsan mauris. In vulputate eu neque eget mattis. Nulla auctor sodales cursus. Nunc eu nibh vel turpis interdum blandit eu sed nisi.', 'Sed quis sapien eget urna mattis imperdiet sed ut turpis. Aenean id sem nunc. Praesent efficitur ex in nunc tincidunt, vel lobortis metus feugiat. Quisque ultricies justo non sollicitudin porttitor. Praesent sit amet condimentum velit, a congue velit. Nullam rutrum at nisl sed interdum. Ut ut felis id nulla porttitor imperdiet. Nullam convallis lorem in ex luctus, nec lacinia massa lacinia. Suspendisse pretium sed dolor sit amet iaculis. ', 'https://chat.opencampus.sh', 20, '18:00:02.674', '20:00:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (2, 'Past Course 2', 'APPLICANTS_INVITED', '2.5', '', 'EN', '2024-05-02', '', false, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, NULL, NULL, NULL, NULL, NULL, NULL, 20, '16:00:02.674', '22:00:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (3, 'Past Course 3', 'APPLICANTS_INVITED', '3', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', '2024-05-02', '120€', true, true, 2, 'MONDAY', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 4, 'test', 'test', 'test', 'test', 'test', 'https://chat.opencampus.sh', 20, '22:00:02.674', '11:45:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (4, 'Present Course 1', 'APPLICANTS_INVITED', '5', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi', 'DE', '2025-01-02', 'NO_COST', true, true, 2, 'TUESDAY', 'http://localhost:4001/emulated-bucket/public/courseid_4/cover_image/cover_image.jpg', '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, 'Morbi sed', 'Sed quis', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia sapien quis tellus posuere egestas dignissim a quam. Quisque viverra purus vel cursus pulvinar. Nam maximus, ex vel egestas volutpat, libero metus interdum urna, ac tincidunt nisi sem a ligula. Etiam lacus dui, consequat feugiat dui vel, rhoncus sagittis elit. Proin convallis placerat magna eu maximus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus aliquam euismod diam, nec varius odio semper egestas. Duis ornare luctus mauris, ac scelerisque massa euismod sed. Aliquam lacinia tortor in faucibus dapibus. Ut suscipit tempus nunc vitae aliquet. Sed gravida hendrerit fringilla. Nulla ullamcorper purus eget libero maximus cursus. Ut non iaculis nibh, quis feugiat mi. Quisque gravida lectus enim, ultrices aliquam erat venenatis in. Donec id nisi ullamcorper, rutrum libero et, ullamcorper felis. ', 'Integer ornare mauris feugiat malesuada auctor. Integer id justo sit amet metus tristique tincidunt. Donec eu commodo nulla. Donec eros elit, pretium vel nisi at, euismod pulvinar nisi. Vivamus sit amet felis consequat felis iaculis sodales. Proin volutpat nisl sit amet magna congue, ut auctor orci laoreet. Nullam consectetur ut libero ac congue. Phasellus posuere est quis interdum fermentum. Morbi laoreet purus id diam vestibulum faucibus. Curabitur sollicitudin tortor nec accumsan lacinia. Donec ut dui vitae elit dictum pretium. Sed vel tincidunt leo, in pretium risus. Nunc velit nibh, imperdiet ac libero a, semper accumsan mauris. In vulputate eu neque eget mattis. Nulla auctor sodales cursus. Nunc eu nibh vel turpis interdum blandit eu sed nisi.', 'Sed quis sapien eget urna mattis imperdiet sed ut turpis. Aenean id sem nunc. Praesent efficitur ex in nunc tincidunt, vel lobortis metus feugiat. Quisque ultricies justo non sollicitudin porttitor. Praesent sit amet condimentum velit, a congue velit. Nullam rutrum at nisl sed interdum. Ut ut felis id nulla porttitor imperdiet. Nullam convallis lorem in ex luctus, nec lacinia massa lacinia. Suspendisse pretium sed dolor sit amet iaculis. ', 'https://chat.opencampus.sh', 20, '18:00:02.674', '20:00:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (5, 'Present Course 2', 'APPLICANTS_INVITED', '2.5', '', 'EN', '2025-01-02', '', false, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, NULL, NULL, NULL, NULL, NULL, NULL, 20, '16:00:02.674', '22:00:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (6, 'Present Course 3', 'APPLICANTS_INVITED', '3', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', '2025-01-02', '120€', true, true, 2, 'MONDAY', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 5, 'test', 'test', 'test', 'test', 'test', 'https://chat.opencampus.sh', 20, '22:00:02.674', '11:45:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (7, 'This is a Degree', 'APPLICANTS_INVITED', '12,5', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', '2024-12-02', '0', true, false, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 2, 'headingDescriptionField1', 'headingDescriptionField2', 'Content Description Field 1', 'Content Description Field 2', 'Lerning Goal 1\nLerning Goal 2', 'https://chat.opencampus.sh', 200, '22:00:02.674', '11:45:01.513', true, NULL);
INSERT INTO public."Course" (id, title, status, ects, tagline, language, "applicationEnd", cost, "achievementCertificatePossible", "attendanceCertificatePossible", "maxMissedSessions", "weekDay", "coverImage", created_at, updated_at, "programId", "headingDescriptionField1", "headingDescriptionField2", "contentDescriptionField1", "contentDescriptionField2", "learningGoals", "chatLink", "maxParticipants", "endTime", "startTime", published, "externalRegistrationLink") VALUES (8, 'This is an Event', 'APPLICANTS_INVITED', 'NONE', 'Sed leo libero, bibendum non viverra et, suscipit at quam. Fusce augue est, molestie ut dapibus quis, accumsan at lectus. In id malesuada quam', 'DE', '2024-12-02', '0', false, true, 2, 'NONE', NULL, '2022-12-17 22:19:57.676901+00', '2022-12-19 13:55:11.89556+00', 3, 'headingDescriptionField1', 'headingDescriptionField2', 'Content Description Field 1', 'Content Description Field 2', 'Lerning Goal 1\nLerning Goal 2', NULL, 200, '22:00:02.674', '11:45:01.513', true, NULL);
INSERT INTO public."AchievementOptionCourse" (id, "achievementOptionId", "courseId", created_at, updated_at) VALUES (1, 1, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" (id, "achievementOptionId", "courseId", created_at, updated_at) VALUES (2, 2, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" (id, "achievementOptionId", "courseId", created_at, updated_at) VALUES (3, 2, 2, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" (id, "achievementOptionId", "courseId", created_at, updated_at) VALUES (4, 3, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementOptionCourse" (id, "achievementOptionId", "courseId", created_at, updated_at) VALUES (5, 4, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."Organization" (id, name, type, description, created_at, updated_at, aliases) VALUES (3, 'UNI_FLENSBURG', 'UNIVERSITY', NULL, '2024-11-05 19:20:55.236915+00', '2024-11-05 19:20:55.236915+00', NULL);
INSERT INTO public."Organization" (id, name, type, description, created_at, updated_at, aliases) VALUES (5, 'CAU', 'OTHER', NULL, '2024-11-05 19:22:45.185716+00', '2024-11-05 19:22:45.185716+00', NULL);
INSERT INTO public."Organization" (id, name, type, description, created_at, updated_at, aliases) VALUES (4, 'Harvard', 'OTHER', NULL, '2024-11-05 19:20:55.236915+00', '2024-11-05 19:29:06.696899+00', NULL);
INSERT INTO public."Organization" (id, name, type, description, created_at, updated_at, aliases) VALUES (1, 'CAU_KIEL', 'UNIVERSITY', NULL, '2024-11-05 19:20:55.236915+00', '2024-11-05 19:29:53.035708+00', '["Christian-Albrechts-Universität zu Kiel", "University of Kiel"]');
INSERT INTO public."Organization" (id, name, type, description, created_at, updated_at, aliases) VALUES (2, 'FH_KIEL', 'UNIVERSITY', NULL, '2024-11-05 19:20:55.236915+00', '2024-11-05 19:30:21.735445+00', '["Fachhochschule Kiel", "FH Kiel"]');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'Student2', 'Student2', 'student2@example.com', 'http://localhost:4001/emulated-bucket/public/userid_b5df4676-3d75-4413-bfac-9cc4e2f61cd9/profile_image/student2_portrait.jpg', 'OTHER', 'http://www.google.com', false, 'vb43rty', '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, '654321', NULL, 'ACTIVE', 2, NULL, 'OTHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('774b371a-b391-487f-ba57-1cee492eb233', 'Student3', 'Student3', 'student3@example.com', 'http://localhost:4001/emulated-bucket/public/userid_774b371a-b391-487f-ba57-1cee492eb233/profile_image/student3_portrait.gif', 'RETIREE', 'www.google.com', true, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 3, NULL, 'RETIRED');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('f1323e97-5671-450d-a665-727f7273c190', 'Student5', 'Student5', 'student5@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 5, NULL, 'OTHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('1cd84073-d049-4a93-b39d-e14320dd68f4', 'Expert2', 'Expert2', 'expert2@example.com', 'http://localhost:4001/emulated-bucket/public/userid_1cd84073-d049-4a93-b39d-e14320dd68f4/profile_image/expert2_porträt.jpeg', 'UNEMPLOYED', 'http://www.google.com', false, 'numatirafisaa523', '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, '918273645', NULL, 'ACTIVE', 7, NULL, 'UNEMPLOYED');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('ed1ea3aa-efe0-4176-baef-0f1a89348ce2', 'Expert4', 'Expert4', 'expert4@example.com', 'http://localhost:4001/emulated-bucket/public/userid_ed1ea3aa-efe0-4176-baef-0f1a89348ce2/profile_image/expert4_portrait.bmp', 'EMPLOYED', 'google.com', false, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 9, NULL, 'EMPLOYED_FULL_TIME');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('ef6979e4-2d6c-43e4-9f80-b93c1571ecf0', 'Expert5', 'Expert5', 'expert5@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 10, NULL, 'OTHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('c924cfed-0ea1-428a-ae2d-6b895234d578', 'Student mit langem namen', 'um zu schauen ob das design hällt', 'student_mit_langem_namen_zu_design_test@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 12, NULL, 'OTHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('338b11d0-87e1-43dd-89d3-ecefbaf729c2', 'Expert mit langem namen', 'um zu schauen ob das design hällt', 'expert_mit_langem_namen_zu_design_test@example.com', NULL, NULL, NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-02 00:46:55.343506+00', NULL, NULL, NULL, 'ACTIVE', 13, NULL, 'OTHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('152f12c3-f7d2-4b73-8d29-603c164b0139', 'Student1', 'Student1', 'student1@example.com', 'http://localhost:4001/emulated-bucket/public/userid_152f12c3-f7d2-4b73-8d29-603c164b0139/profile_image/Student1_portrait.png', 'STUDENT', 'https://www.google.com', true, 'xedz2361', '2022-12-17 17:53:20.882635+00', '2024-11-05 19:20:55.236915+00', 'UNI_FLENSBURG', '123456', NULL, 'ACTIVE', 1, 3, 'UNIVERSITY_STUDENT');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('086bbe72-0ec0-44f8-af14-2057b4d8e94e', 'Expert1', 'Expert1', 'expert1@example.com', 'http://localhost:4001/emulated-bucket/public/userid_086bbe72-0ec0-44f8-af14-2057b4d8e94e/profile_image/expert1_portrait.png', 'STUDENT', 'https://www.google.com', true, 'leki300s', '2022-12-17 17:53:20.882635+00', '2024-11-05 19:20:55.236915+00', 'CAU_KIEL', NULL, NULL, 'ACTIVE', 6, 1, 'UNIVERSITY_STUDENT');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('f39054eb-8993-4469-8e36-86ce5368e380', 'Expert3', 'Expert3', 'expert3@example.com', 'http://localhost:4001/emulated-bucket/public/userid_f39054eb-8993-4469-8e36-86ce5368e380/profile_image/expert3_portrait.gif', 'SELFEMPLOYED', 'www.google.com', true, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-05 19:20:55.236915+00', 'FH_KIEL', NULL, NULL, 'ACTIVE', 8, 2, 'SELF_EMPLOYED');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('efd6479e-0c87-4247-92e5-42cbb5ef6848', 'Student4', 'Student4', 'student4@example.com', 'http://localhost:4001/emulated-bucket/public/userid_efd6479e-0c87-4247-92e5-42cbb5ef6848/profile_image/student4_portrait.bmp', 'ACADEMIA', 'google.com', false, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-05 19:20:55.236915+00', 'OTHER', 'xed624', 'Harward', 'ACTIVE', 4, 4, 'RESEARCHER');
INSERT INTO public."User" (id, "firstName", "lastName", email, picture, employment, "externalProfile", "newsletterRegistration", "anonymousId", created_at, updated_at, university, "matriculationNumber", "otherUniversity", status, "integerId", "organizationId", occupation) VALUES ('8914bee9-0549-44af-bcae-cafeec5ba92e', 'Admin', 'Admin', 'admin@example.com', 'http://localhost:4001/emulated-bucket/public/userid_8914bee9-0549-44af-bcae-cafeec5ba92e/profile_image/admin_portrait.png', 'EMPLOYED', NULL, NULL, NULL, '2022-12-17 17:53:20.882635+00', '2024-11-05 19:32:01.398195+00', NULL, NULL, NULL, 'ACTIVE', 11, 2, 'UNIVERSITY_STUDENT');
INSERT INTO public."AchievementOptionMentor" (id, "achievementOptionId", created_at, updated_at, "userId") VALUES (1, 1, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementOptionMentor" (id, "achievementOptionId", created_at, updated_at, "userId") VALUES (2, 2, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementOptionMentor" (id, "achievementOptionId", created_at, updated_at, "userId") VALUES (3, 3, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementOptionMentor" (id, "achievementOptionId", created_at, updated_at, "userId") VALUES (4, 4, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2');
INSERT INTO public."AchievementRecord" (id, "coverImageUrl", description, rating, score, "achievementOptionId", "documentationUrl", "csvResults", "evaluationScriptUrl", created_at, updated_at, "uploadUserId", "courseId") VALUES (1, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'PASSED', NULL, 1, NULL, NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '152f12c3-f7d2-4b73-8d29-603c164b0139', 1);
INSERT INTO public."AchievementRecord" (id, "coverImageUrl", description, rating, score, "achievementOptionId", "documentationUrl", "csvResults", "evaluationScriptUrl", created_at, updated_at, "uploadUserId", "courseId") VALUES (2, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 2, 'achievementrecordid_1/documentation/test_doc.odt', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 1);
INSERT INTO public."AchievementRecord" (id, "coverImageUrl", description, rating, score, "achievementOptionId", "documentationUrl", "csvResults", "evaluationScriptUrl", created_at, updated_at, "uploadUserId", "courseId") VALUES (3, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 3, NULL, NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '152f12c3-f7d2-4b73-8d29-603c164b0139', 4);
INSERT INTO public."AchievementRecord" (id, "coverImageUrl", description, rating, score, "achievementOptionId", "documentationUrl", "csvResults", "evaluationScriptUrl", created_at, updated_at, "uploadUserId", "courseId") VALUES (4, NULL, 'Fusce quis convallis elit, id dictum lacus.', 'UNRATED', NULL, 4, 'achievementrecordid_4/documentation/test_doc.odt', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 4);
INSERT INTO public."AchievementRecordAuthor" (id, "achievementRecordId", "userId", created_at, updated_at) VALUES (1, 1, '152f12c3-f7d2-4b73-8d29-603c164b0139', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementRecordAuthor" (id, "achievementRecordId", "userId", created_at, updated_at) VALUES (2, 2, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementRecordAuthor" (id, "achievementRecordId", "userId", created_at, updated_at) VALUES (3, 4, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."AchievementRecordAuthor" (id, "achievementRecordId", "userId", created_at, updated_at) VALUES (4, 4, '774b371a-b391-487f-ba57-1cee492eb233', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."Admin" (id, "userId", created_at, updated_at) VALUES (1, '8914bee9-0549-44af-bcae-cafeec5ba92e', '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (20, 'Session3 for Present Course 1', 'The third session for "Present Course 1"', '2024-12-02 18:00:00+00', '2024-12-02 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (21, 'Session4 for Present Course 1', 'The fourth session for "Present Course 1"', '2024-11-23 18:00:00+00', '2024-11-23 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (22, 'Session5 for Present Course 1', 'The fifth session for "Present Course 1"', '2024-11-16 18:00:00+00', '2024-11-16 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (23, 'Session6 for Present Course 1', 'The sixth session for "Present Course 1"', '2024-11-09 18:00:00+00', '2024-11-09 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (25, 'Session8 for Present Course 1', 'The eigth session for "Present Course 1"', '2024-11-09 18:00:00+00', '2024-11-09 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (26, 'Session9 for Present Course 1', 'The nineth session for "Present Course 1"', '2024-11-16 18:00:00+00', '2024-11-16 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (27, 'Session10 for Present Course 1', 'The tenth session for "Present Course 1"', '2024-11-23 18:00:00+00', '2024-11-23 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2022-12-19 13:21:56.669676+00', 'true', false);
INSERT INTO public."Session" (id, title, description, "startDateTime", "endDateTime", "courseId", created_at, updated_at, "attendanceData", questionaire_sent) VALUES (24, 'Session7 for Present Course 1', 'The seventh session for "Present Course 1"', '2024-11-02 18:00:00+00', '2024-11-02 20:00:00+00', 4, '2022-12-19 13:21:41.873742+00', '2024-11-05 18:00:07.965036+00', 'true', true);
INSERT INTO public."CourseDegree" (id, "courseId", "degreeCourseId", created_at, updated_at) VALUES (1, 1, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" (id, "courseId", "degreeCourseId", created_at, updated_at) VALUES (2, 2, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" (id, "courseId", "degreeCourseId", created_at, updated_at) VALUES (3, 4, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseDegree" (id, "courseId", "degreeCourseId", created_at, updated_at) VALUES (4, 5, 7, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (1, 1, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', '/152f12c3-f7d2-4b73-8d29-603c164b0139/1/achievement_certificate_1.pdf', '/152f12c3-f7d2-4b73-8d29-603c164b0139/1/participation_certificate_1.pdf', '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2024-05-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (2, 1, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'CONFIRMED', 'Curabitur quis aliquam magna. Suspendisse potenti. Vivamus pharetra, diam quis accumsan placerat, purus felis pellentesque augue, ac condimentum orci metus at tellus. Nulla augue nibh, pellentesque in ligula eget, ornare facilisis tortor. Etiam viverra sem nec nunc dignissim tincidunt. Fusce consectetur orci in orci lacinia, molestie aliquam mi eleifend. In ut metus vitae nisl blandit ultricies in et risus. Phasellus pellentesque lectus nec tristique vestibulum. Morbi lobortis sit amet massa non posuere. Sed fringilla est eros, non iaculis eros tempus eget. ', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2024-05-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (3, 1, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', '', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2024-05-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (4, 1, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'REJECTED', '', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL);
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (5, 2, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (6, 2, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (7, 3, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (8, 4, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2025-01-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (9, 4, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'CONFIRMED', 'Curabitur quis aliquam magna. Suspendisse potenti. Vivamus pharetra, diam quis accumsan placerat, purus felis pellentesque augue, ac condimentum orci metus at tellus. Nulla augue nibh, pellentesque in ligula eget, ornare facilisis tortor. Etiam viverra sem nec nunc dignissim tincidunt. Fusce consectetur orci in orci lacinia, molestie aliquam mi eleifend. In ut metus vitae nisl blandit ultricies in et risus. Phasellus pellentesque lectus nec tristique vestibulum. Morbi lobortis sit amet massa non posuere. Sed fringilla est eros, non iaculis eros tempus eget. ', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2025-01-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (10, 4, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', '', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2025-01-02');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (11, 4, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'REJECTED', '', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', NULL);
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (12, 5, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (13, 5, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (14, 6, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (15, 7, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (16, 7, '8914bee9-0549-44af-bcae-cafeec5ba92e', 'CONFIRMED', 'I like cats and dogs', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (17, 7, 'b5df4676-3d75-4413-bfac-9cc4e2f61cd9', 'APPLIED', 'The dog looks perfect', 'DECLINE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (18, 7, '774b371a-b391-487f-ba57-1cee492eb233', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (19, 7, 'efd6479e-0c87-4247-92e5-42cbb5ef6848', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (20, 7, 'f1323e97-5671-450d-a665-727f7273c190', 'CONFIRMED', 'The dog looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseEnrollment" (id, "courseId", "userId", status, "motivationLetter", "motivationRating", "achievementCertificateURL", "attendanceCertificateURL", created_at, updated_at, "invitationExpirationDate") VALUES (21, 8, '152f12c3-f7d2-4b73-8d29-603c164b0139', 'CONFIRMED', 'The cat looks perfect', 'INVITE', NULL, NULL, '2022-12-19 13:40:34.079378+00', '2022-12-19 13:55:01.645233+00', '2022-11-01');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (1, 1, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (2, 2, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (3, 3, 3, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (4, 4, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (5, 4, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (6, 5, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (7, 6, 3, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (8, 6, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (9, 7, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."CourseGroup" (id, "courseId", "groupOptionId", created_at, updated_at) VALUES (10, 8, 5, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (1, '086bbe72-0ec0-44f8-af14-2057b4d8e94e', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (2, '1cd84073-d049-4a93-b39d-e14320dd68f4', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (3, 'f39054eb-8993-4469-8e36-86ce5368e380', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (4, 'ed1ea3aa-efe0-4176-baef-0f1a89348ce2', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (5, 'ef6979e4-2d6c-43e4-9f80-b93c1571ecf0', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (6, '338b11d0-87e1-43dd-89d3-ecefbaf729c2', NULL, '2022-12-17 22:05:57.650776+00', '2022-12-17 22:05:57.650776+00');
INSERT INTO public."Expert" (id, "userId", description, created_at, updated_at) VALUES (8, '8914bee9-0549-44af-bcae-cafeec5ba92e', NULL, '2024-11-05 19:06:09.705935+00', '2024-11-05 19:06:09.705935+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (1, 1, 1, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (2, 1, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (3, 2, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (4, 3, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (5, 4, 1, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (6, 4, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (7, 2, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (8, 3, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (9, 7, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (10, 8, 2, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseInstructor" (id, "courseId", "expertId", created_at, updated_at) VALUES (11, 8, 4, '2022-12-17 22:20:20.615952+00', '2022-12-17 22:20:20.615952+00');
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (1, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'KIEL', 'Musterstraße 21, 22232 Kiel');
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (2, 1, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', 'https://zoom.us');
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (3, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'KIEL', NULL);
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (4, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'KIEL', 'Musterstraße 21, 22232 Kiel');
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (5, 4, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', 'https://zoom.us');
INSERT INTO public."CourseLocation" (id, "courseId", created_at, updated_at, "locationOption", "defaultSessionAddress") VALUES (6, 2, '2022-12-19 12:56:07.352338+00', '2022-12-19 12:56:12.475054+00', 'ONLINE', NULL);
INSERT INTO public."MailLog" (id, subject, content, "to", "from", cc, bcc, created_at, updated_at, "templateId", status) VALUES (1, 'Feedback zu Present Course 1 bei opencampus.sh', '<!DOCTYPE html>
                  <html>
                    <head>
                      <meta content=''text/html; charset=UTF-8'' http-equiv=''Content-Type'' />
                    </head>
                    <body>
                      <p>Hallo Student1 Student1,</p>
                      <p>anbei schicken wir Dir einen (sehr kurzen) Fragebogen zur Evaluation Deines Kurses Present Course 1 bei opencampus.sh.</p>
                      <p>Bitte nimm Dir kurz die Zeit, um ihn auszufüllen. Dein Feedback ist ein wichtiges Hilfsmittel für uns, um unser Programm weiterzuentwickeln.</p>
                      <p><a href="https://survey.opencampus.sh/?&c=Present Course 1&t=Session7 for Present Course 1&p=Current Semester"> Zum Fragebogen </a></p>
                      <p>Viele Grüße</p>
                      <p>Dein opencampus.sh Team</p>
                    </body>
                  </html>', 'student1@example.com', 'noreply@edu.opencampus.sh', NULL, NULL, '2024-11-05 18:00:07.938518+00', '2024-11-05 18:00:07.938518+00', NULL, NULL);
INSERT INTO public."MailLog" (id, subject, content, "to", "from", cc, bcc, created_at, updated_at, "templateId", status) VALUES (2, 'Feedback zu Present Course 1 bei opencampus.sh', '<!DOCTYPE html>
                  <html>
                    <head>
                      <meta content=''text/html; charset=UTF-8'' http-equiv=''Content-Type'' />
                    </head>
                    <body>
                      <p>Hallo Student2 Student2,</p>
                      <p>anbei schicken wir Dir einen (sehr kurzen) Fragebogen zur Evaluation Deines Kurses Present Course 1 bei opencampus.sh.</p>
                      <p>Bitte nimm Dir kurz die Zeit, um ihn auszufüllen. Dein Feedback ist ein wichtiges Hilfsmittel für uns, um unser Programm weiterzuentwickeln.</p>
                      <p><a href="https://survey.opencampus.sh/?&c=Present Course 1&t=Session7 for Present Course 1&p=Current Semester"> Zum Fragebogen </a></p>
                      <p>Viele Grüße</p>
                      <p>Dein opencampus.sh Team</p>
                    </body>
                  </html>', 'student2@example.com', 'noreply@edu.opencampus.sh', NULL, NULL, '2024-11-05 18:00:07.950837+00', '2024-11-05 18:00:07.950837+00', NULL, NULL);
INSERT INTO public."MailLog" (id, subject, content, "to", "from", cc, bcc, created_at, updated_at, "templateId", status) VALUES (3, 'Feedback zu Present Course 1 bei opencampus.sh', '<!DOCTYPE html>
                  <html>
                    <head>
                      <meta content=''text/html; charset=UTF-8'' http-equiv=''Content-Type'' />
                    </head>
                    <body>
                      <p>Hallo Student3 Student3,</p>
                      <p>anbei schicken wir Dir einen (sehr kurzen) Fragebogen zur Evaluation Deines Kurses Present Course 1 bei opencampus.sh.</p>
                      <p>Bitte nimm Dir kurz die Zeit, um ihn auszufüllen. Dein Feedback ist ein wichtiges Hilfsmittel für uns, um unser Programm weiterzuentwickeln.</p>
                      <p><a href="https://survey.opencampus.sh/?&c=Present Course 1&t=Session7 for Present Course 1&p=Current Semester"> Zum Fragebogen </a></p>
                      <p>Viele Grüße</p>
                      <p>Dein opencampus.sh Team</p>
                    </body>
                  </html>', 'student3@example.com', 'noreply@edu.opencampus.sh', NULL, NULL, '2024-11-05 18:00:07.958706+00', '2024-11-05 18:00:07.958706+00', NULL, NULL);
SELECT pg_catalog.setval('public."AchievementDocumentationTemplate_id_seq"', 1, false);
SELECT pg_catalog.setval('public."AchievementOptionCourse_id_seq"', 6, true);
SELECT pg_catalog.setval('public."AchievementOptionMentor_id_seq"', 5, true);
SELECT pg_catalog.setval('public."AchievementOption_id_seq"', 5, true);
SELECT pg_catalog.setval('public."AchievementRecordAuthor_id_seq"', 5, true);
SELECT pg_catalog.setval('public."AchievementRecord_id_seq"', 5, true);
SELECT pg_catalog.setval('public."Admin_Id_seq"', 1, false);
SELECT pg_catalog.setval('public."Attendence_Id_seq"', 1, false);
SELECT pg_catalog.setval('public."CourseAddress_id_seq"', 7, true);
SELECT pg_catalog.setval('public."CourseDegree_id_seq"', 5, true);
SELECT pg_catalog.setval('public."CourseGroup_id_seq"', 11, true);
SELECT pg_catalog.setval('public."CourseInstructor_Id_seq"', 12, true);
SELECT pg_catalog.setval('public."Course_Id_seq"', 9, true);
SELECT pg_catalog.setval('public."Date_Id_seq"', 28, true);
SELECT pg_catalog.setval('public."Enrollment_Id_seq"', 22, true);
SELECT pg_catalog.setval('public."Instructor_Id_seq"', 8, true);
SELECT pg_catalog.setval('public."MailTemplate_Id_seq"', 1, false);
SELECT pg_catalog.setval('public."Mail_Id_seq"', 3, true);
SELECT pg_catalog.setval('public."Organization_id_seq"', 5, true);
SELECT pg_catalog.setval('public."Semester_Id_seq"', 7, true);
SELECT pg_catalog.setval('public."SessionAddress_id_seq"', 1, false);
SELECT pg_catalog.setval('public."SessionSpeaker_id_seq"', 1, false);
SELECT pg_catalog.setval('public."User_Id_seq"', 1, false);
