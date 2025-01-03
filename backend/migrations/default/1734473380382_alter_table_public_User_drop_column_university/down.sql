alter table "public"."User"
  add constraint "User_university_fkey"
  foreign key (university)
  references "public"."University"
  (value) on update set null on delete set null;
alter table "public"."User" alter column "university" drop not null;
alter table "public"."User" add column "university" text;
