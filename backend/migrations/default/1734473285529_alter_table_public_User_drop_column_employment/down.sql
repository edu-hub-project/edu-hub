alter table "public"."User"
  add constraint "User_employment_fkey"
  foreign key (employment)
  references "public"."Employment"
  (value) on update set null on delete set null;
alter table "public"."User" alter column "employment" drop not null;
alter table "public"."User" add column "employment" text;
