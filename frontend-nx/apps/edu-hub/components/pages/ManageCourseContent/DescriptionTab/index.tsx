import { QueryResult } from '@apollo/client';
import { Button } from '@material-ui/core';
import { FC } from 'react';
import {
  eventTargetNumberMapper,
  eventTargetValueMapper,
  useRoleMutation,
  useUpdateCallback,
} from '../../../../hooks/authedMutation';
import {
  DELETE_COURSE_LOCATION,
  INSERT_COURSE_LOCATION,
  UPDATE_COURSE_CONTENT_DESCRIPTION_FIELD_1,
  UPDATE_COURSE_CONTENT_DESCRIPTION_FIELD_2,
  UPDATE_COURSE_END_TIME,
  UPDATE_COURSE_HEADING_DESCRIPTION_1,
  UPDATE_COURSE_HEADING_DESCRIPTION_2,
  UPDATE_COURSE_LANGUAGE,
  UPDATE_COURSE_LEARNING_GOALS,
  UPDATE_COURSE_LOCATION,
  UPDATE_COURSE_MAX_PARTICIPANTS,
  UPDATE_COURSE_START_TIME,
  UPDATE_COURSE_WEEKDAY,
  UPDATE_COURSE_SHORT_DESCRIPTION,
  DELETE_SESSION_ADDRESSES_BY_COURSE_AND_LOCATION,
  INSERT_SESSION_ADDRESS,
} from '../../../../queries/course';
import {
  DeleteCourseLocation,
  DeleteCourseLocationVariables,
} from '../../../../queries/__generated__/DeleteCourseLocation';
import {
  InsertCourseLocation,
  InsertCourseLocationVariables,
} from '../../../../queries/__generated__/InsertCourseLocation';
import { ManagedCourse_Course_by_pk } from '../../../../queries/__generated__/ManagedCourse';
import {
  UpdateCourseEndTime,
  UpdateCourseEndTimeVariables,
} from '../../../../queries/__generated__/UpdateCourseEndTime';
import {
  UpdateCourseLanguage,
  UpdateCourseLanguageVariables,
} from '../../../../queries/__generated__/UpdateCourseLanguage';
import {
  UpdateCourseLocation,
  UpdateCourseLocationVariables,
} from '../../../../queries/__generated__/UpdateCourseLocation';
import {
  UpdateCourseStartTime,
  UpdateCourseStartTimeVariables,
} from '../../../../queries/__generated__/UpdateCourseStartTime';
import {
  UpdateCourseWeekday,
  UpdateCourseWeekdayVariables,
} from '../../../../queries/__generated__/UpdateCourseWeekday';
import Locations from './Locations';
import { MdAddCircle } from 'react-icons/md';
import {
  UpdateCourseMaxParticipants,
  UpdateCourseMaxParticipantsVariables,
} from '../../../../queries/__generated__/UpdateCourseMaxParticipants';
import useTranslation from 'next-translate/useTranslation';
import EduHubTextFieldEditor from '../../../forms/EduHubTextFieldEditor';
import EduHubDropdownSelector from '../../../forms/EduHubDropdownSelector';
import EduHubTimePicker from '../../../forms/EduHubTimePicker';
import EduHubNumberFieldEditor from '../../../forms/EduHubNumberFieldEditor';
import { LocationOption_enum } from '../../../../__generated__/globalTypes';
import useErrorHandler from '../../../../hooks/useErrorHandler';
import { ErrorMessageDialog } from '../../../common/dialogs/ErrorMessageDialog';
import {
  DeleteSessionAddressesByCourseAndLocation,
  DeleteSessionAddressesByCourseAndLocationVariables,
} from '../../../../queries/__generated__/DeleteSessionAddressesByCourseAndLocation';
import {
  InsertSessionAddress,
  InsertSessionAddressVariables,
} from '../../../../queries/__generated__/InsertSessionAddress';
import {
  convertToGermanTimeString,
  convertToUTCTimeString,
  extractTimeFromDateTime,
} from '../../../../helpers/dateHelpers';

interface IProps {
  course: ManagedCourse_Course_by_pk;
  qResult: QueryResult<any, any>;
}

export const DescriptionTab: FC<IProps> = ({ course, qResult }) => {
  const { error, handleError, resetError } = useErrorHandler();
  const { t } = useTranslation('course-page');

  const [insertCourseLocation] = useRoleMutation<InsertCourseLocation, InsertCourseLocationVariables>(
    INSERT_COURSE_LOCATION,
    {
      onError: (error) => handleError(t(error.message)),
    }
  );

  const [insertSessionAddress] = useRoleMutation<InsertSessionAddress, InsertSessionAddressVariables>(
    INSERT_SESSION_ADDRESS,
    {
      onError: (error) => handleError(t(error.message)),
    }
  );

  const handleInsertCourseLocation = async () => {
    try {
      const usedOptions = new Set(course.CourseLocations.map((loc) => loc.locationOption));
      const availableOption = Object.values(LocationOption_enum).find((option) => !usedOptions.has(option));
      if (!availableOption) {
        handleError('All location options already exist for this course.');
        return;
      }

      const res = await insertCourseLocation({ variables: { courseId: course.id, option: availableOption } });
      const insertedLocationId = res?.data?.insert_CourseLocation?.returning[0].id;

      await Promise.all(
        course.Sessions.map((session) =>
          insertSessionAddress({
            variables: {
              sessionId: session.id,
              location: availableOption,
              address: '',
              courseLocationId: insertedLocationId,
            },
          })
        )
      );
      qResult.refetch();
    } catch (error) {
      handleError(error.message);
      throw error;
    }
  };

  const [deleteCourseLocation] = useRoleMutation<DeleteCourseLocation, DeleteCourseLocationVariables>(
    DELETE_COURSE_LOCATION,
    {
      onError: (error) => handleError(t(error.message)),
    }
  );
  const [DeleteSessionAddressesByCourseAndLocation] = useRoleMutation<
    DeleteSessionAddressesByCourseAndLocation,
    DeleteSessionAddressesByCourseAndLocationVariables
  >(DELETE_SESSION_ADDRESSES_BY_COURSE_AND_LOCATION, {
    onError: (error) => handleError(t(error.message)),
  });

  const handleDeleteCourseLocation = async (location) => {
    if (course.CourseLocations.length <= 1) {
      handleError('A course needs at least one location.');
      return;
    }
    await deleteCourseLocation({ variables: { locationId: location.id } });
    await DeleteSessionAddressesByCourseAndLocation({
      variables: { courseId: course.id, location: location.locationOption },
    });
    qResult.refetch();
  };

  const [updateCourseLocation] = useRoleMutation<UpdateCourseLocation, UpdateCourseLocationVariables>(
    UPDATE_COURSE_LOCATION,
    {
      onError: (error) => handleError(t(error.message)),
    }
  );

  const handleUpdateCourseLocation = async (location, option) => {
    await updateCourseLocation({ variables: { locationId: location.id, option: option } });
    qResult.refetch();
  };

  const updateCourseStartTime = useUpdateCallback<UpdateCourseStartTime, UpdateCourseStartTimeVariables>(
    UPDATE_COURSE_START_TIME,
    'courseId',
    'startTime',
    course?.id,
    (dateTimeString) => convertToUTCTimeString(extractTimeFromDateTime(dateTimeString), new Date(course.startTime)),
    qResult
  );

  const updateCourseEndTime = useUpdateCallback<UpdateCourseEndTime, UpdateCourseEndTimeVariables>(
    UPDATE_COURSE_END_TIME,
    'courseId',
    'endTime',
    course?.id,
    (dateTimeString) => convertToUTCTimeString(extractTimeFromDateTime(dateTimeString), new Date(course.endTime)),
    qResult
  );

  const updateCourseLanguage = useUpdateCallback<UpdateCourseLanguage, UpdateCourseLanguageVariables>(
    UPDATE_COURSE_LANGUAGE,
    'courseId',
    'language',
    course?.id,
    eventTargetValueMapper,
    qResult
  );

  const updateWeekday = useUpdateCallback<UpdateCourseWeekday, UpdateCourseWeekdayVariables>(
    UPDATE_COURSE_WEEKDAY,
    'courseId',
    'weekday',
    course?.id,
    eventTargetValueMapper,
    qResult
  );

  const updateMaxParticipants = useUpdateCallback<UpdateCourseMaxParticipants, UpdateCourseMaxParticipantsVariables>(
    UPDATE_COURSE_MAX_PARTICIPANTS,
    'courseId',
    'maxParticipants',
    course?.id,
    eventTargetNumberMapper,
    qResult
  );

  const weekDayOptions = ['NONE', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  const languageOptions = ['DE', 'EN'];

  const courseLocations = [...course.CourseLocations];
  courseLocations.sort((a, b) => a.id - b.id);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <EduHubTextFieldEditor
          value={course.tagline}
          label={t('short_description.label')}
          updateMutation={UPDATE_COURSE_SHORT_DESCRIPTION}
          refetchQuery={qResult}
          itemId={course.id}
          placeholder={t('short_description.label')}
          helpText={t('short_description.help_text')}
          className="h-64"
        />
        <EduHubTextFieldEditor
          value={course.learningGoals ?? ''}
          updateMutation={UPDATE_COURSE_LEARNING_GOALS}
          refetchQuery={qResult}
          itemId={course.id}
          label={t('learning_goals.label')}
          placeholder={t('learning_goals.placeholder')}
          helpText={t('learning_goals.help_text')}
          maxLength={500}
          className="h-64"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <EduHubTextFieldEditor
            element="input"
            value={course.headingDescriptionField1 ?? ''}
            itemId={course.id}
            updateMutation={UPDATE_COURSE_HEADING_DESCRIPTION_1}
            refetchQuery={qResult}
            label={t('info_block_1_title.label')}
            placeholder={t('info_block_1_title.placeholder')}
            helpText={t('info_block_1_title.help_text')}
            className="mb-0"
          />
          <EduHubTextFieldEditor
            value={course.contentDescriptionField1 ?? ''}
            itemId={course.id}
            updateMutation={UPDATE_COURSE_CONTENT_DESCRIPTION_FIELD_1}
            refetchQuery={qResult}
            placeholder={t('info_block_1_content.placeholder')}
            maxLength={10000}
            className="h-64"
            isMarkdown={true}
          />
        </div>
        <div>
          <EduHubTextFieldEditor
            element="input"
            value={course.headingDescriptionField2 ?? ''}
            itemId={course.id}
            updateMutation={UPDATE_COURSE_HEADING_DESCRIPTION_2}
            refetchQuery={qResult}
            label={t('info_block_2_title.label')}
            helpText={t('info_block_2_title.help_text')}
            placeholder={t('info_block_2_title.placeholder')}
            className="mb-0"
          />
          <EduHubTextFieldEditor
            value={course.contentDescriptionField2 ?? ''}
            itemId={course.id}
            updateMutation={UPDATE_COURSE_CONTENT_DESCRIPTION_FIELD_2}
            refetchQuery={qResult}
            placeholder={t('info_block_2_content.placeholder')}
            maxLength={10000}
            className="h-64"
            isMarkdown={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="grid grid-cols-3">
          <EduHubDropdownSelector
            label={t('weekday')}
            options={weekDayOptions}
            value={course.weekDay ?? 'MONDAY'}
            onChange={updateWeekday}
            translationPrefix="course-page:weekdays."
          />
          <EduHubTimePicker
            label={t('start_time')}
            value={convertToGermanTimeString(new Date(course.startTime))}
            onChange={(timeString) =>
              updateCourseStartTime(convertToUTCTimeString(timeString, new Date(course.startTime)))
            }
            className="mb-4"
          />
          <EduHubTimePicker
            label={t('end_time')}
            value={convertToGermanTimeString(new Date(course.endTime))}
            onChange={(timeString) => updateCourseEndTime(convertToUTCTimeString(timeString, new Date(course.endTime)))}
            className="mb-4"
          />
          <div />
        </div>
        <div className="grid grid-cols-2">
          <EduHubDropdownSelector
            label={t('common:language')}
            options={languageOptions}
            value={course.language}
            onChange={updateCourseLanguage}
            translationPrefix="course-page:languages."
          />
          <div>
            <EduHubNumberFieldEditor
              label={t('max_participants')}
              onChange={updateMaxParticipants}
              value={course.maxParticipants || 0}
              min={0}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-12 text-gray-400 px-2">
          <div className="col-span-2">{t('location.label')}</div>
          <div className="col-span-7">{t('address.label')}</div>
        </div>
        {courseLocations.map((loc) => (
          <Locations
            key={loc.id}
            location={loc}
            onDelete={handleDeleteCourseLocation}
            onSetOption={handleUpdateCourseLocation}
            refetchQuery={qResult}
          />
        ))}
      </div>
      <div className="flex justify-start text-white">
        <Button onClick={handleInsertCourseLocation} startIcon={<MdAddCircle />} color="inherit">
          {t('course-page:add-new-location')}
        </Button>
      </div>
      {error && <ErrorMessageDialog errorMessage={error} open={!!error} onClose={resetError} />}
    </div>
  );
};
