-- Check the values in the enum tables first (just SELECT, don't create)
SELECT * FROM "public"."Employment";
SELECT * FROM "public"."UserOccupation";

-- Then create the conversion function
CREATE OR REPLACE FUNCTION "public".convert_employment_to_occupation(employment_val text) 
RETURNS text AS $$
BEGIN
    RETURN CASE employment_val
        -- Map the values based on the actual enum table values
        WHEN 'STUDENT' THEN 'UNIVERSITY_STUDENT'
        WHEN 'PUPIL' THEN 'HIGH_SCHOOL_STUDENT'
        WHEN 'EMPLOYED' THEN 'EMPLOYED_FULL_TIME'
        WHEN 'SELFEMPLOYED' THEN 'SELF_EMPLOYED'
        WHEN 'ACADEMIA' THEN 'RESEARCHER'
        WHEN 'RETIREE' THEN 'RETIRED'
        WHEN 'TEACHER' THEN 'EDUCATOR'
        WHEN 'UNEMPLOYED' THEN 'UNEMPLOYED'
        ELSE 'OTHER'
    END;
END;
$$ LANGUAGE plpgsql;

-- Update the occupation column
UPDATE "public"."User"
SET occupation = convert_employment_to_occupation(employment::text)
WHERE occupation IS NULL;

-- Verify the migration
SELECT employment::text, occupation::text, COUNT(*) 
FROM "public"."User" 
GROUP BY employment::text, occupation::text 
ORDER BY employment::text, occupation::text;

-- Clean up
DROP FUNCTION IF EXISTS "public".convert_employment_to_occupation;
