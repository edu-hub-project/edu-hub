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
import { SAVE_COURSE_IMAGE } from '../../../graphql/queries/actions';
import { INSERT_COURSE_GROUP_TAG, DELETE_COURSE_GROUP_TAG } from '../../../graphql/mutations/courseGroup';
import { INSERT_COURSE_DEGREE_TAG, DELETE_COURSE_DEGREE_TAG } from '../../../graphql/queries/course/courseDegree';

import { DELETE_A_COURSE, UPDATE_COURSE_PROPERTY } from '../../../graphql/mutations/mutateCourse';
import { DELETE_COURSE_INSRTRUCTOR } from '../../../graphql/mutations/mutateCourseInstructor';
import { AdminCourseList_Course } from '../../../graphql/__generated__/AdminCourseList';
import { DeleteCourseByPk, DeleteCourseByPkVariables } from '../../../graphql/__generated__/DeleteCourseByPk';
import {
  DeleteCourseInstructor,
  DeleteCourseInstructorVariables,
} from '../../../graphql/__generated__/DeleteCourseInstructor';
import { Programs_Program } from '../../../graphql/__generated__/Programs';
import { SaveCourseImage, SaveCourseImageVariables } from '../../../graphql/__generated__/SaveCourseImage';
import { UpdateCourseByPk, UpdateCourseByPkVariables } from '../../../graphql/__generated__/UpdateCourseByPk';
import { SelectOption } from '../../../types/UIComponents';
import { CourseEnrollmentStatus_enum, CourseStatus_enum } from '../../../__generated__/globalTypes';
import EhCheckBox from '../../common/EhCheckbox';
import EhSelect from '../../common/EhSelect';
import EhTag from '../../common/EhTag';

import { getPublicImageUrl, parseFileUploadEvent } from '../../../helpers/filehandling';
import EhDebounceInput from '../../common/EhDebounceInput';

import useTranslation from 'next-translate/useTranslation';
import draftPie from '../../../public/images/course/status/draft.svg';
import readyForPublicationPie from '../../../public/images/course/status/ready-for-publication.svg';
import readyForApplicationPie from '../../../public/images/course/status/ready-for-application.svg';
import applicantsInvitedPie from '../../../public/images/course/status/applicants-invited.svg';
import participantsRatedPie from '../../../public/images/course/status/participants-rated.svg';

import { InstructorColumn } from './CoursesInstructorColumn';
import TagSelector from '../../forms/TagSelector';
import TextFieldEditor from '../../forms/TextFieldEditor';
import {
  UPDATE_COURSE_CHAT_LINK,
  UPDATE_COURSE_ECTS,
  UPDATE_COURSE_EXTERNAL_REGISTRATION_LINK,
} from '../../../graphql/queries/course/course';
import { isECTSFormat, isLinkFormat } from '../../../helpers/util';
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
  onSetTitle,
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

  const handleSetCourseTitle = useCallback(
    (value: string) => {
      onSetTitle(course, value);
    },
    [course, onSetTitle]
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
        const coverImage = result.data?.saveCourseImage?.google_link;
        if (coverImage != null) {
          await updateCourseQuery({
            variables: {
              id: course.id,
              changes: {
                coverImage: result.data?.saveCourseImage?.file_path,
              },
            },
          });
          refetchCourses();
        }
      }
    },
    [
      course,
      // qResult,
      saveCourseImage,
      // course.id,
      updateCourseQuery,
      refetchCourses,
    ]
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
    name: t(group.CourseGroupOption.title),
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
            <EhDebounceInput
              placeholder={`${t('course-page:default-course-title')}`}
              onChangeHandler={handleSetCourseTitle}
              inputText={course.title || ''}
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
                <TextFieldEditor
                  label={'chat_link.label'}
                  placeholder={'chat_link.label'}
                  itemId={course.id}
                  currentText={course.chatLink || ''}
                  updateTextMutation={UPDATE_COURSE_CHAT_LINK}
                  refetchQueries={['AdminCourseList']}
                  typeCheck={isLinkFormat}
                  helpText="chat_link.help_text"
                  errorText="chat_link.error_text"
                  translationNamespace="manageCourses"
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
                    <TextFieldEditor
                      label={'ects.label'}
                      placeholder={'ects.label'}
                      itemId={course.id}
                      currentText={course.ects || ''}
                      updateTextMutation={UPDATE_COURSE_ECTS}
                      refetchQueries={['AdminCourseList']}
                      typeCheck={isECTSFormat}
                      helpText="ects.help_text"
                      errorText="ects.error_text"
                      translationNamespace="manageCourses"
                    />
                    <TagSelector
                      className="col-span-10 flex mt-3"
                      label={t('course-page:courseGroups')}
                      placeholder={t('course-page:courseGroups')}
                      itemId={course.id}
                      currentTags={currentCourseGroups}
                      tagOptions={courseGroupOptions}
                      insertTagMutation={INSERT_COURSE_GROUP_TAG}
                      deleteTagMutation={DELETE_COURSE_GROUP_TAG}
                      refetchQueries={['AdminCourseList']}
                      translationNamespace="start-page"
                    />
                    <TagSelector
                      className="col-span-10 flex mt-3"
                      label={t('course-page:courseDegreeTitle')}
                      placeholder={t('course-page:courseDegree')}
                      itemId={course.id}
                      currentTags={currentCourseDegrees}
                      tagOptions={degreeCourses}
                      insertTagMutation={INSERT_COURSE_DEGREE_TAG}
                      deleteTagMutation={DELETE_COURSE_DEGREE_TAG}
                      refetchQueries={['AdminCourseList']}
                    />
                    <TextFieldEditor
                      label={'external_registration_link.label'}
                      placeholder={'external_registration_link.label'}
                      itemId={course.id}
                      currentText={course.externalRegistrationLink || ''}
                      updateTextMutation={UPDATE_COURSE_EXTERNAL_REGISTRATION_LINK}
                      refetchQueries={['AdminCourseList']}
                      typeCheck={isLinkFormat}
                      helpText="external_registration_link.help_text"
                      errorText="external_registration_link.error_text"
                      translationNamespace="manageCourses"
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
