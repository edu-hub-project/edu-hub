import { FC } from "react";
import useTranslation from 'next-translate/useTranslation';

import { Course_Course_by_pk } from "../../queries/__generated__/Course";

interface IProps {
  course: Course_Course_by_pk;
}

export const CourseContentInfos: FC<IProps> = ({ course }) => {
  const { t, lang } = useTranslation("course-page");

  return (
    <div className="flex flex-1 flex-col">
      <span className="text-3xl font-semibold mb-9">{t("youWillLearn")}</span>
      <div
        dangerouslySetInnerHTML={{ __html: course.headingDescriptionField1 }}
      />
      <span className="text-3xl font-semibold mt-24 mb-9">
        {t("courseContent")}
      </span>
      <ul>
        {course.Sessions.map(({ startDateTime, title }, index) => (
          <li key={index} className="flex mb-4">
            <div className="flex flex-col flex-shrink-0 mr-6">
              <span className="text-xs sm:text-sm font-semibold">
                {startDateTime?.toLocaleDateString(lang, {
                  month: "2-digit",
                  day: "2-digit",
                }) ?? ""}
              </span>
              <span className="text-xs sm:text-sm">
                {startDateTime?.toLocaleTimeString(lang, {
                  hour: "numeric",
                  minute: "numeric",
                }) ?? ""}
              </span>
            </div>
            <span className="block text-sm sm:text-lg">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
