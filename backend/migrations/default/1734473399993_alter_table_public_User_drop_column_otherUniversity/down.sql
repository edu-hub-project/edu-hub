alter table "public"."User" alter column "otherUniversity" drop not null;
alter table "public"."User" add column "otherUniversity" text;
