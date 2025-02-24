import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';
import { FC, MutableRefObject, useCallback, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {
  MdCheckBox,
  // MdCheckBoxOutlineBlank,
  MdDelete,
  MdLink,
  MdOutlineCheckBoxOutlineBlank,
  // MdAddCircle,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdUpload,
} from 'react-icons/md';
import { QueryResult } from '@apollo/client';

import { useAdminMutation } from '../../../hooks/authedMutation';
import { SAVE_COURSE_IMAGE } from '../../../queries/actions';
import { INSERT_COURSE_GROUP_TAG, DELETE_COURSE_GROUP_TAG } from '../../../queries/courseGroup';
import { INSERT_COURSE_DEGREE_TAG, DELETE_COURSE_DEGREE_TAG } from '../../../queries/courseDegree';

import { DELETE_A_COURSE, UPDATE_COURSE_PROPERTY } from '../../../queries/mutateCourse';
import { DELETE_COURSE_INSRTRUCTOR } from '../../../queries/mutateCourseInstructor';
import { AdminCourseList_Course } from '../../../queries/__generated__/AdminCourseList';
import { DeleteCourseByPk, DeleteCourseByPkVariables } from '../../../queries/__generated__/DeleteCourseByPk';
import {
  DeleteCourseInstructor,
  DeleteCourseInstructorVariables,
} from '../../../queries/__generated__/DeleteCourseInstructor';
import { Programs_Program } from '../../../queries/__generated__/Programs';
import { SaveCourseImage, SaveCourseImageVariables } from '../../../queries/__generated__/SaveCourseImage';
import { UpdateCourseByPk, UpdateCourseByPkVariables } from '../../../queries/__generated__/UpdateCourseByPk';
import { SelectOption } from '../../../types/UIComponents';
import { CourseEnrollmentStatus_enum, CourseStatus_enum } from '../../../__generated__/globalTypes';
import EhCheckBox from '../../common/EhCheckbox';
import EhSelect from '../../common/EhSelect';
import EhTag from '../../common/EhTag';

import { getPublicImageUrl, parseFileUploadEvent } from '../../../helpers/filehandling';

import useTranslation from 'next-translate/useTranslation';
import draftPie from '../../../public/images/course/status/draft.svg';
import readyForPublicationPie from '../../../public/images/course/status/ready-for-publication.svg';
import readyForApplicationPie from '../../../public/images/course/status/ready-for-application.svg';
import applicantsInvitedPie from '../../../public/images/course/status/applicants-invited.svg';
import participantsRatedPie from '../../../public/images/course/status/participants-rated.svg';

import { InstructorColumn } from './CoursesInstructorColumn';
import TagSelector from '../../inputs/TagSelector';
import InputField from '../../inputs/InputField';
import {
  UPDATE_COURSE_CHAT_LINK,
  UPDATE_COURSE_ECTS,
  UPDATE_COURSE_EXTERNAL_REGISTRATION_LINK,
  UPDATE_COURSE_TITLE,
  UPDATE_COURSE_MAX_MISSED_SESSION,
} from '../../../queries/course';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';

interface EntrollmentStatusCount {
  [key: string]: number;
}
const courseStatus = (status: string) => {
  switch (status) {
    case CourseStatus_enum.DRAFT:
      return (
        <span title="draft">
          <img src={draftPie} alt="draft" />
        </span>
      );
    case CourseStatus_enum.READY_FOR_PUBLICATION:
      return (
        <span title="ready for publication">
          <img src={readyForPublicationPie} alt="ready for publication" />
        </span>
      );
    case CourseStatus_enum.READY_FOR_APPLICATION:
      return (
        <span title="ready for application">
          <img src={readyForApplicationPie} alt="ready for application" />
        </span>
      );
    case CourseStatus_enum.APPLICANTS_INVITED:
      return (
        <span title="applicants invited">
          <img src={applicantsInvitedPie} alt="applicants invited" />
        </span>
      );
    case CourseStatus_enum.PARTICIPANTS_RATED:
      return (
        <span title="participants rated">
          <img src={participantsRatedPie} alt="participants rated" />
        </span>
      );
    default:
      return (
        <span title="default">
          <img src={draftPie} alt="default" />
        </span>
      );
  }
};

interface IPropsCourseOneRow {
  programs: Programs_Program[];
  course: AdminCourseList_Course;
  courseGroupOptions: { id: number; name: string }[];
  degreeCourses: { id: number; name: string }[];
  qResult: QueryResult<any>;
  refetchCourses: () => void;
  onSetTitle: (c: AdminCourseList_Course, title: string) => any;
  onSetAttendanceCertificatePossible: (c: AdminCourseList_Course, isPossible: boolean) => any;
  onSetAchievementCertificatePossible: (c: AdminCourseList_Course, isPossible: boolean) => any;
}
const SingleCourseRow: FC<IPropsCourseOneRow> = ({
  programs,
  course,
  courseGroupOptions,
  degreeCourses,
  refetchCourses,
  onSetAttendanceCertificatePossible,
  onSetAchievementCertificatePossible,
  qResult,
  // onDeleteCourseGroup,
}) => {
  const { t, lang } = useTranslation('course-page');
  const { error, handleError, resetError } = useErrorHandler();

  const handleToggleAttendanceCertificatePossible = useCallback(() => {
    onSetAttendanceCertificatePossible(course, !course.attendanceCertificatePossible);
  }, [course, onSetAttendanceCertificatePossible]);

  const handleToggleAchievementCertificatePossible = useCallback(() => {
    onSetAchievementCertificatePossible(course, !course.achievementCertificatePossible);
  }, [course, onSetAchievementCertificatePossible]);

  const [showDetails, setShowDetails] = useState(false);

  const semesters: SelectOption[] = programs.map((program) => ({
    key: program.id,
    label: program.shortTitle ?? program.title,
  }));

  const [updateCourse] = useAdminMutation<UpdateCourseByPk, UpdateCourseByPkVariables>(UPDATE_COURSE_PROPERTY);

  const [deleteACoursByPk] = useAdminMutation<DeleteCourseByPk, DeleteCourseByPkVariables>(DELETE_A_COURSE);

  /* #region callbacks */
  const handleDelete = useCallback(
    async (courseID: number) => {
      const response = await deleteACoursByPk({
        variables: {
          id: courseID,
        },
      });
      if (response.errors) {
        console.log(response.errors);
        return;
      }
      refetchCourses();
    },
    [deleteACoursByPk, refetchCourses]
  );

  const onClickDelete = useCallback(() => {
    handleDelete(course.id);
  }, [handleDelete, course.id]);

  const handleArrowClick = useCallback(() => {
    setShowDetails((previous) => !previous);
  }, [setShowDetails]);

  const router = useRouter();
  const onClickForward = (courseId) => {
    router.push(`course/${courseId}`);
  };

  const onChangePublished = useCallback(async () => {
    const response = await updateCourse({
      variables: {
        id: course.id,
        changes: {
          published: !course.published,
        },
      },
    });
    if (response.errors) {
      console.log(response.errors);
      return;
    }
    refetchCourses();
  }, [refetchCourses, updateCourse, course]);

  const onChangeProgram = useCallback(
    async (id: number) => {
      const response = await updateCourse({
        variables: {
          id: course.id,
          changes: {
            programId: id,
          },
        },
      });
      if (response.errors) {
        console.log(response.errors);
        return;
      }
      refetchCourses();
    },
    [refetchCourses, course.id, updateCourse]
  );

  const applicationStatus = () => {
    const statusRecordsWithSum: EntrollmentStatusCount = {};
    course.CourseEnrollments.forEach((courseEn) => {
      statusRecordsWithSum[courseEn.CourseEnrollmentStatus.value] = statusRecordsWithSum[
        courseEn.CourseEnrollmentStatus.value
      ]
        ? statusRecordsWithSum[courseEn.CourseEnrollmentStatus.value] + 1
        : 1;
    });
    return `${statusRecordsWithSum[CourseEnrollmentStatus_enum.INVITED] ?? 0}/${
      statusRecordsWithSum[CourseEnrollmentStatus_enum.CONFIRMED] ?? 0
    }/${course.AppliedAndUnratedCount.aggregate?.count}`;
  };

  const applications = () => {
    const statusRecordsWithSum: EntrollmentStatusCount = {};
    course.CourseEnrollments.forEach((courseEn) => {
      statusRecordsWithSum[courseEn.CourseEnrollmentStatus.value] = statusRecordsWithSum[
        courseEn.CourseEnrollmentStatus.value
      ]
        ? statusRecordsWithSum[courseEn.CourseEnrollmentStatus.value] + 1
        : 1;
    });
    return Object.keys(statusRecordsWithSum).reduce((sum, key) => sum + statusRecordsWithSum[key], 0);
  };
  const pClass = 'text-gray-700 truncate font-medium max-w-xs';
  const tdClass = 'pl-5';
  const tdClassCentered = 'pl-5 text-center';

  // Course Details
  const [updateCourseQuery] = useAdminMutation<UpdateCourseByPk, UpdateCourseByPkVariables>(UPDATE_COURSE_PROPERTY);

  const [deleteInstructorAPI] = useAdminMutation<DeleteCourseInstructor, DeleteCourseInstructorVariables>(
    DELETE_COURSE_INSRTRUCTOR
  );
  const deleteInstructorFromACourse = useCallback(
    async (id: number) => {
      const response = await deleteInstructorAPI({
        variables: {
          courseId: course.id,
          expertId: id,
        },
      });

      if (response.errors) {
        console.log(response.errors);
        return;
      }
      refetchCourses();
    },
    [deleteInstructorAPI, refetchCourses, course]
  );
  /** #endregion */

  const imageUploadRef: MutableRefObject<any> = useRef(null);
  const handleImageUploadClick = useCallback(() => {
    imageUploadRef.current?.click();
  }, [imageUploadRef]);

  const [saveCourseImage] = useAdminMutation<SaveCourseImage, SaveCourseImageVariables>(SAVE_COURSE_IMAGE, {
    onError: (error) => handleError(t(error.message)),
  });

  const handleUploadCourseImageEvent = useCallback(
    async (event: any) => {
      const ufile = await parseFileUploadEvent(event);

      if (ufile != null) {
        const result = await saveCourseImage({
          variables: {
            base64File: ufile.data,
            fileName: ufile.name,
            courseId: course.id,
          },
        });

        const uploadResult = result.data?.saveCourseImage;
        if (uploadResult?.success) {
          await updateCourseQuery({
            variables: {
              id: course.id,
              changes: {
                coverImage: uploadResult.filePath,
              },
            },
          });
          refetchCourses();
        } else {
          handleError(t(uploadResult?.messageKey || 'operation-failed'));
        }
      }
    },
    [course.id, saveCourseImage, updateCourseQuery, refetchCourses, handleError, t]
  );

  const [applicationEndDate, setApplicationEndDate] = useState(
    course.applicationEnd ? new Date(course.applicationEnd) : null
  );

  const handleApplicationEndDateChange = useCallback(
    async (date) => {
      setApplicationEndDate(date);
      const response = await updateCourse({
        variables: {
          id: course.id,
          changes: {
            applicationEnd: date.toISOString(),
          },
        },
      });
      if (response.errors) {
        console.log(response.errors);
        return;
      }
      refetchCourses();
    },
    [course.id, refetchCourses, updateCourse]
  );

  const currentCourseGroups = course.CourseGroups.map((group) => ({
    id: group.CourseGroupOption.id,
    name: t(`start-page:${group.CourseGroupOption.title}`),
  }));

  const currentCourseDegrees = course.CourseDegrees.map((degree) => ({
    id: degree.degreeCourseId,
    name: t(degree.DegreeCourse.title),
  }));

  const coverImage = getPublicImageUrl(course?.coverImage, 460);

  return (
    <>
      <tr className="font-medium bg-edu-course-list h-12">
        <td className="${tdClass} grid grid-cols-2 mt-3">
          <div>
            <IconButton onClick={() => onClickForward(course.id)} size="small">
              <MdLink />
            </IconButton>
          </div>

          <div onClick={onChangePublished}>
            <EhCheckBox checked={course.published ?? false} />
          </div>
        </td>
        <td className={tdClass}>
          <p className={pClass}>
            <InputField
              variant="material"
              type="input"
              placeholder={t('course-page:default-course-title')}
              itemId={course.id}
              value={course.title || ''}
              updateValueMutation={UPDATE_COURSE_TITLE}
              refetchQueries={['AdminCourseList']}
            />
          </p>
        </td>
        <td className={`${tdClass}`}>
          <InstructorColumn
            t={t}
            course={course}
            refetchCourses={refetchCourses}
            programs={programs}
            qResult={qResult}
          />
        </td>
        <td className={tdClassCentered}>
          <p className={pClass}>{applications()}</p>
        </td>
        <td className={tdClassCentered}>
          <p className={pClass}>{applicationStatus()}</p>
        </td>
        <td className={tdClassCentered}>
          <EhSelect
            value={course.Program ? course.Program.id : 0}
            onChangeHandler={onChangeProgram}
            options={semesters}
          />
        </td>
        <td className={tdClassCentered}>
          <div className="flex">
            <p className={pClass}>{courseStatus(course.status)}</p>
            <div className="flex px-3 items-center">
              <button className="focus:ring-2 rounded-md focus:outline-none" role="button" aria-label="option">
                {showDetails ? (
                  <MdKeyboardArrowUp size={26} onClick={handleArrowClick} />
                ) : (
                  <MdKeyboardArrowDown size={26} onClick={handleArrowClick} />
                )}
              </button>
            </div>
          </div>
        </td>
        <td className="bg-white">
          {/* Delete button */}
          <IconButton onClick={onClickDelete} size="small">
            <MdDelete />
          </IconButton>
        </td>
      </tr>
      <tr className={showDetails ? 'h-0' : 'h-1'} />
      {/** Hiden Course Details */}
      {showDetails && (
        <>
          <tr className="bg-edu-course-list">
            <td className="" colSpan={1} />
            <td className="px-5 content-start my-8" colSpan={1}>
              <div className="bg-white p-2 mr-5 h-32 justify-end mb-2">
                <IconButton onClick={handleImageUploadClick}>
                  <MdUpload size="0.75em" />
                </IconButton>
                {coverImage != null && <img width="300px" src={coverImage} alt="course cover image" />}
              </div>
              <input ref={imageUploadRef} onChange={handleUploadCourseImageEvent} className="hidden" type="file" />
            </td>
            <td className="px-5 inline-block align-top pb-2" colSpan={1}>
              <div className="flex flex-col space-y-1">
                {
                  // Show all instructors but first one
                  course.CourseInstructors.map(
                    (courseIn, index) =>
                      index > 0 && (
                        <EhTag
                          key={`${course.id}-${courseIn.Expert.id}-${index}`}
                          requestDeleteTag={deleteInstructorFromACourse}
                          tag={{
                            display: makeFullName(courseIn.Expert.User.firstName, courseIn.Expert.User.lastName ?? ''),
                            id: courseIn.Expert.id,
                          }}
                        />
                      )
                  )
                }
              </div>
            </td>
            <td className="px-5" colSpan={4}>
              <div className="flex flex-col space-y-2 mb-2">
                <div className="p-0 mb-3">
                  <span>{t('course-page:application-end')}</span>
                  <br />
                  <DatePicker
                    dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
                    className="w-full bg-edu-light-gray"
                    selected={applicationEndDate}
                    onChange={handleApplicationEndDateChange}
                    locale={lang}
                  />
                </div>
                <InputField
                  variant="material"
                  type="link"
                  label={t('manageCourses:chat_link.label')}
                  placeholder={t('manageCourses:chat_link.label')}
                  itemId={course.id}
                  value={course.chatLink || ''}
                  updateValueMutation={UPDATE_COURSE_CHAT_LINK}
                  refetchQueries={['AdminCourseList']}
                  helpText={t('manageCourses:chat_link.help_text')}
                />
                <td>
                  {`${t('possible-certificates')}:`}
                  <div className="grid grid-cols-10">
                    <div className="cursor-pointer" onClick={handleToggleAttendanceCertificatePossible}>
                      {course.attendanceCertificatePossible && <MdCheckBox size="1.5em" />}
                      {!course.attendanceCertificatePossible && <MdOutlineCheckBoxOutlineBlank size="1.5em" />}
                    </div>
                    <div className="col-span-9">{t('course-page:proof-of-participation')}</div>
                  </div>
                  <div className="grid grid-cols-10">
                    <div className="cursor-pointer" onClick={handleToggleAchievementCertificatePossible}>
                      {course.achievementCertificatePossible && <MdCheckBox size="1.5em" />}
                      {!course.achievementCertificatePossible && <MdOutlineCheckBoxOutlineBlank size="1.5em" />}
                    </div>
                    <div className="col-span-3">{t('course-page:performance-certificate')}</div>
                    <InputField
                      variant="material"
                      type="ects"
                      label={t('manageCourses:ects.label')}
                      placeholder={t('manageCourses:ects.label')}
                      itemId={course.id}
                      value={course.ects || ''}
                      updateValueMutation={UPDATE_COURSE_ECTS}
                      refetchQueries={['AdminCourseList']}
                      helpText={t('manageCourses:ects.help_text')}
                    />
                    <TagSelector
                      variant="material"
                      className="col-span-10 flex mt-3"
                      label={t('course-page:courseGroups')}
                      placeholder={t('course-page:courseGroups')}
                      itemId={course.id}
                      values={currentCourseGroups}
                      options={courseGroupOptions}
                      insertValueMutation={INSERT_COURSE_GROUP_TAG}
                      deleteValueMutation={DELETE_COURSE_GROUP_TAG}
                      refetchQueries={['AdminCourseList']}
                      optionsTranslationPrefix="start-page:"
                    />
                    <TagSelector
                      variant="material"
                      className="col-span-10 flex mt-3"
                      label={t('course-page:courseDegreeTitle')}
                      placeholder={t('course-page:courseDegree')}
                      itemId={course.id}
                      values={currentCourseDegrees}
                      options={degreeCourses}
                      insertValueMutation={INSERT_COURSE_DEGREE_TAG}
                      deleteValueMutation={DELETE_COURSE_DEGREE_TAG}
                      refetchQueries={['AdminCourseList']}
                    />
                    <InputField
                      variant="material"
                      type="number"
                      label={t('manageCourses:max_missed_sessions.label')}
                      placeholder={t('manageCourses:max_missed_sessions.label')}
                      itemId={course.id}
                      value={String(course.maxMissedSessions ?? 2)}
                      updateValueMutation={UPDATE_COURSE_MAX_MISSED_SESSION}
                      refetchQueries={['AdminCourseList']}
                      helpText={t('manageCourses:maxMissedSessions.help_text')}
                      min={0}
                    />
                    <InputField
                      variant="material"
                      type="link"
                      label={t('manageCourses:external_registration_link.label')}
                      placeholder={t('manageCourses:external_registration_link.label')}
                      itemId={course.id}
                      value={course.externalRegistrationLink || ''}
                      updateValueMutation={UPDATE_COURSE_EXTERNAL_REGISTRATION_LINK}
                      refetchQueries={['AdminCourseList']}
                      helpText={t('manageCourses:external_registration_link.help_text')}
                    />
                  </div>
                </td>
              </div>
            </td>
          </tr>
          <tr className="h-1" />
        </>
      )}
      {/* Error Message Dialog */}
      {error && <ErrorMessageDialog errorMessage={error} open={!!error} onClose={resetError} />}
    </>
  );
};

export default SingleCourseRow;

const makeFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};
