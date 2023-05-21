import { Dispatch, FC, SetStateAction } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Course_Course_by_pk } from '../../queries/__generated__/Course';
import { CourseWithEnrollment_Course_by_pk } from '../../queries/__generated__/CourseWithEnrollment';

import { ContentRow } from '../common/ContentRow';
import { PageBlock } from '../common/PageBlock';

import { CourseContentInfos } from './CourseContentInfos';
import { CourseDescriptionInfos } from './CourseDescriptionInfos';
import { CourseMetaInfos } from './CourseMetaInfos';
import { CourseStatus } from './CourseStatus';
import { CourseTitleSubTitleBlock } from './CourseTitleSubTitleBlock';
import { CourseParticipationBlock } from './CourseParticipationBlock';

import { useIsCourseWithEnrollment } from '../../hooks/course';

interface IProps {
  course: Course_Course_by_pk | CourseWithEnrollment_Course_by_pk;
  setInvitationModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export const CoursePageDescriptionView: FC<IProps> = ({
  course,
  setInvitationModalOpen,
}) => {
  const { t } = useTranslation();
  const { title, coverImage } = course;

  const isCourseWithEnrollment = useIsCourseWithEnrollment(course);

  const bgUrl = coverImage ?? 'https://picsum.photos/1280/620';

  return (
    <div className="flex flex-col space-y-24">
      <div
        className="h-96 p-3 text-3xl text-white flex justify-start items-end bg-cover bg-center bg-no-repeat bg-[image:var(--bg-small-url)]"
        style={
          {
            '--bg-small-url': `linear-gradient(51.32deg, rgba(0, 0, 0, 0.7) 17.57%, rgba(0, 0, 0, 0) 85.36%), url(${bgUrl})`,
          } as React.CSSProperties
        }
      >
        <div className="max-w-screen-xl mx-auto w-full">{title}</div>
      </div>
      <div className="max-w-screen-xl mx-auto w-full">
        <PageBlock>
          <ContentRow className="items-center">
            <CourseTitleSubTitleBlock course={course} />
            <CourseStatus
              course={course}
              setInvitationModalOpen={setInvitationModalOpen}
            />
          </ContentRow>
        </PageBlock>
        {isCourseWithEnrollment && <CourseParticipationBlock course={course} />}
        <ContentRow className="flex pb-24">
          <PageBlock classname="flex-1 text-white">
            <CourseContentInfos course={course} />
          </PageBlock>
          <div className="pr-0 lg:pr-6 xl:pr-0">
            <CourseMetaInfos course={course} />
          </div>
        </ContentRow>
        <div className="text-edu-course-current underline pt-4 text-3xl text-center font-semibold">
          <a
            href="https://opencampus.gitbook.io/faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('course-page:how-to')}
          </a>
        </div>
        <CourseDescriptionInfos course={course} />
      </div>
    </div>
  );
};
