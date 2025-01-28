alter table "public"."OrganizationAdmin"
  add constraint "OrganizationAdmin_userId_fkey"
  foreign key ("userId")
  references "public"."User"
  ("id") on update restrict on delete restrict;
