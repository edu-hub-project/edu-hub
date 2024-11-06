alter table "public"."User"
  add constraint "User_occupation_fkey"
  foreign key ("occupation")
  references "public"."UserOccupation"
  ("value") on update restrict on delete restrict;
