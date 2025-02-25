import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { CourseList_Course } from '../../../queries/__generated__/CourseList';
import { CoursesEnrolledByUser_Course } from '../../../queries/__generated__/CoursesEnrolledByUser';
import languageIcon from '../../../public/images/course/language.svg';
import locationIcon from '../../../public/images/course/pin.svg';
import { getTileImage } from '../../../helpers/imageHandling';
import {
  useWeekdayStartAndEndString,
} from '../../../helpers/dateTimeHelpers';
import React from 'react';

type CourseType = CourseList_Course | CoursesEnrolledByUser_Course;

interface TileProps {
  course: CourseType;
  isManage: boolean;
}

export const Tile: FC<TileProps> = ({ course, isManage }) => {
  const { t } = useTranslation('common');
  const getWeekdayStartAndEndString = useWeekdayStartAndEndString();

  // Needed for legacy reasons: For cases where the image in the optimal image size does not exist but only the original image size
  const [coverImage, setCoverImage] = useState(null);
  useEffect(() => {
    const loadCoverImage = async () => {
      const img = await getTileImage(course?.coverImage);
      setCoverImage(img);
    };
    loadCoverImage();
  }, [course]);

  return (
    <Link href={isManage ? `/manage/course/${course.id}` : `/course/${course.id}`}>
      <div className="flex flex-col rounded-2xl overflow-hidden font-medium text-edu-black cursor-pointer">
        <div className="relative h-[230px] flex justify-start items-end">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${coverImage}")`,
            }}
          ></div>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(51.32deg, rgba(0, 0, 0, 0.7) 17.57%, rgba(0, 0, 0, 0) 85.36%)',
            }}
          ></div>
          <div className="absolute inset-0 flex justify-start items-end p-3">
            <span className="text-3xl text-white">{course.title}</span>
          </div>
        </div>
        <div className="flex flex-col h-[201px] justify-between bg-white p-5">
          <div className="flex justify-between mb-3 text-sm tracking-wider">
            {course.weekDay !== 'NONE' && course.startTime && course.endTime
              ? getWeekdayStartAndEndString(course, t)
              : null}{' '}
            <div className="flex items-center">
              <Image src={languageIcon} alt="language icon" width={16} height={16} className="mr-1" />
              {t(course.language)}
            </div>
          </div>
          <span className="text-lg mb-auto line-clamp-3">{course.tagline}</span>
          <div className="flex justify-between text-xs items-center tracking-wider">
            <div className="flex uppercase">
              <Image src={locationIcon} alt="location icon" width={12} height={12} className="mr-1" />
              {course.CourseLocations.map((location, index) => (
                <React.Fragment key={index}>
                  {location.locationOption}
                  {index < course.CourseLocations.length - 1 && ' + '}
                </React.Fragment>
              ))}
            </div>
            {!course.Program.published && course.Program.title}
          </div>
        </div>
      </div>
    </Link>
  );
};
