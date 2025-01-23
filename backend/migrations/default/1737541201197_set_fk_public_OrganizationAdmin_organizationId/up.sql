alter table "public"."OrganizationAdmin"
  add constraint "OrganizationAdmin_organizationId_fkey"
  foreign key ("organizationId")
  references "public"."Organization"
  ("id") on update restrict on delete restrict;
