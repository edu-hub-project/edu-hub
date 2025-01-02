alter table "public"."Program"
  add constraint "Program_programType_fkey"
  foreign key ("programType")
  references "public"."ProgramType"
  ("value") on update restrict on delete restrict;
