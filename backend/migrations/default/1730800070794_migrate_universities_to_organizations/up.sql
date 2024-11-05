-- Step 1: Insert universities from the "university" column into Organization table
INSERT INTO "public"."Organization" ("name", "type")
SELECT DISTINCT university, 'UNIVERSITY'
FROM "public"."User"
WHERE university IS NOT NULL
AND university != 'OTHER'  -- Exclude 'OTHER' entries
AND NOT EXISTS (
    SELECT 1 FROM "public"."Organization" o 
    WHERE o."name" = "public"."User".university
);

-- Step 2: Insert other universities from "otherUniversity" column
INSERT INTO "public"."Organization" ("name", "type")
SELECT DISTINCT "otherUniversity", 'OTHER'
FROM "public"."User"
WHERE "otherUniversity" IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM "public"."Organization" o 
    WHERE o."name" = "public"."User"."otherUniversity"
);

-- Step 3: Update organizationId in User table for regular universities
UPDATE "public"."User" u
SET "organizationId" = o.id
FROM "public"."Organization" o
WHERE u.university IS NOT NULL
AND u.university != 'OTHER'  -- Exclude 'OTHER' entries
AND o."name" = u.university
AND u."organizationId" IS NULL;

-- Step 4: Update organizationId in User table for other universities
UPDATE "public"."User" u
SET "organizationId" = o.id
FROM "public"."Organization" o
WHERE u."otherUniversity" IS NOT NULL
AND o."name" = u."otherUniversity"
AND u."organizationId" IS NULL;
