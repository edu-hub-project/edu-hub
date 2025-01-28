alter table "public"."OrganizationAdmin" add constraint "OrganizationAdmin_userId_organizationId_key" unique ("userId", "organizationId");
