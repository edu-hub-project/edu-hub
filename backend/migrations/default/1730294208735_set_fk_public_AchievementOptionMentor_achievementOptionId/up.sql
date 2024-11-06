alter table "public"."AchievementOptionMentor" drop constraint "AchievementOptionMentor_achievementOptionId_fkey",
  add constraint "AchievementOptionMentor_achievementOptionId_fkey"
  foreign key ("achievementOptionId")
  references "public"."AchievementOption"
  ("id") on update restrict on delete cascade;
