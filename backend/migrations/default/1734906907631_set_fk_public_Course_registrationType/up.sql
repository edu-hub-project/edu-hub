alter table "public"."Course"
  add constraint "Course_registrationType_fkey"
  foreign key ("registrationType")
  references "public"."CourseRegistrationType"
  ("value") on update restrict on delete restrict;
