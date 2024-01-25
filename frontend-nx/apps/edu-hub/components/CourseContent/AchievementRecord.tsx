import { createContext, FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { IUserProfile } from '../../hooks/user';
import { useKeycloakUserProfile, useUserId, useUser } from '../../hooks/user';
import AchievementOptionDropDown from '../achievements/AchievementOptionDropDown';
import {
  AchievementOptionCourses,
  AchievementOptionCoursesVariables,
} from '../../queries/__generated__/AchievementOptionCourses';
import { Button } from '../common/Button';
import { useAuthedQuery } from '../../hooks/authedQuery';
import { BlockTitle } from '@opencampus/shared-components';
import FormToUploadAchievementRecord from '../FormToUploadAchievementRecord';
import { makeFullName, formattedDate, formattedDateWithTime } from '../../helpers/util';
import { AlertMessageDialog } from '../common/dialogs/AlertMessageDialog';
import { ACHIEVEMENT_OPTION_COURSES } from '../../queries/achievementOption';
import { INSERT_AN_ACHIEVEMENT_RECORD } from '../../queries/achievementRecord';

import { order_by, AchievementRecordType_enum, AchievementRecordRating_enum } from '../../__generated__/globalTypes';
import {
  AchievementRecordListWithAuthors,
  AchievementRecordListWithAuthorsVariables,
  AchievementRecordListWithAuthors_AchievementRecord,
} from '../../queries/__generated__/AchievementRecordListWithAuthors';
import { ACHIEVEMENT_RECORDS_WITH_AUTHORS } from '../../queries/achievementRecord';
//import { Link } from '@material-ui/core';
import { MinAchievementOption } from '../../helpers/achievement';
import { AchievementOptionCourses_AchievementOptionCourse_AchievementOption } from '../../queries/__generated__/AchievementOptionCourses';
import useTranslation from 'next-translate/useTranslation';
import { useAuthedMutation } from '../../hooks/authedMutation';
import {
  InsertAnAchievementRecord,
  InsertAnAchievementRecordVariables,
} from '../../queries/__generated__/InsertAnAchievementRecord';
import Trans from 'next-translate/Trans';
import FileDownload from '../common/forms/FileDownload';
interface IContext {
  achievementRecordUploadDeadline: any;
  courseTitle: string;
  userId: string | undefined;
  userProfile: IUserProfile | undefined;
  setAlertMessage: (value: string) => void;
}

export const ProjectResultUploadContext = createContext({} as IContext);

interface IProps {
  courseId: number;
  achievementRecordUploadDeadline: any;
  courseTitle: string;
}

const CourseAchievementOption: FC<IProps> = ({ courseId, achievementRecordUploadDeadline, courseTitle }) => {
  const { t, lang } = useTranslation();
  const user = useUser();
  const userId = useUserId();
  const profile = useKeycloakUserProfile();
  const [showModal, setShowModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [myRecords, setMyRecords] = useState(null as AchievementRecordListWithAuthors_AchievementRecord);

  const [selectedAchievementOption, setSelectedAchievementOption] =
    useState<AchievementOptionCourses_AchievementOptionCourse_AchievementOption>();
  const [isVisibleAchievementOptions, setAchievementOptionVisibility] = useState(false);
  const [archiveOptionsAnchorElement, setAnchorElement] = useState<HTMLElement>();
  const [achievementOptions, setAchievementOptions] = useState([] as MinAchievementOption[]);

  /* #region Database */
  const query = useAuthedQuery<AchievementOptionCourses, AchievementOptionCoursesVariables>(ACHIEVEMENT_OPTION_COURSES);

  const [insertAnAchievementRecordAPI] = useAuthedMutation<
    InsertAnAchievementRecord,
    InsertAnAchievementRecordVariables
  >(INSERT_AN_ACHIEVEMENT_RECORD);

  useEffect(() => {
    const options = [...(query.data?.AchievementOptionCourse || [])];
    setAchievementOptions(options.map((options) => options.AchievementOption));
  }, [query.data?.AchievementOptionCourse]);

  const myRecordsQuery = useAuthedQuery<AchievementRecordListWithAuthors, AchievementRecordListWithAuthorsVariables>(
    ACHIEVEMENT_RECORDS_WITH_AUTHORS,
    {
      variables: {
        where: {
          _and: [
            {
              achievementOptionId: {
                _eq: selectedAchievementOption?.id,
              },
            },
            {
              AchievementRecordAuthors: { userId: { _eq: userId } },
            },
          ],
        },
        orderBy: { created_at: order_by.desc },
        limit: 1,
      },
    }
  );

  /* #endregion */

  useEffect(() => {
    const r = myRecordsQuery.data?.AchievementRecord[0] || null;
    setMyRecords(r);
  }, [myRecordsQuery]);
  /* #region Callbacks*/
  const onClosed = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const upload = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const onAchievementOptionDropdown = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      setAnchorElement(event.currentTarget);
      setAchievementOptionVisibility(true);
    },
    [setAnchorElement, setAchievementOptionVisibility]
  );

  const onItemSelectedFromDropdown = useCallback(
    async (item: AchievementOptionCourses_AchievementOptionCourse_AchievementOption) => {
      setSelectedAchievementOption(item);
    },
    [setSelectedAchievementOption]
  );

  const closeAlertDialog = useCallback(() => {
    setAlertMessage('');
  }, [setAlertMessage]);

  const onSuccess = useCallback(() => {
    setShowModal(false);
    myRecordsQuery.refetch();
  }, [myRecordsQuery]);
  /* #endregion */

  const providerValue: IContext = {
    achievementRecordUploadDeadline: achievementRecordUploadDeadline,
    userProfile: profile,
    userId,
    courseTitle,
    setAlertMessage,
  };
  return (
    <ProjectResultUploadContext.Provider value={providerValue}>
      {alertMessage.trim().length > 0 && (
        <AlertMessageDialog
          alert={alertMessage}
          confirmationText={'OK'}
          onClose={closeAlertDialog}
          open={alertMessage.trim().length > 0}
        />
      )}

      <div className="flex flex-col space-y-3 items-start">
        <BlockTitle>{t('course-page:achievement-option')}</BlockTitle>
        {!query.loading && achievementOptions.length > 0 && (
          <span className="text-lg mt-6">
            {t('course-page:achievement-record-upload-dead-line-text', {
              date: formattedDate(achievementRecordUploadDeadline),
            })}
          </span>
        )}
        <div className="flex mt-10 mb-4">
          {!query.loading && achievementOptions.length > 0 ? (
            <div onClick={onAchievementOptionDropdown}>
              <Button>{`${t('course-page:choose-achievement-option')} ↓`}</Button>
            </div>
          ) : (
            <div>{t('course-page:no-achievement-option')}</div>
          )}

          {isVisibleAchievementOptions && (
            <AchievementOptionDropDown
              anchorElement={archiveOptionsAnchorElement}
              isVisible={isVisibleAchievementOptions}
              setVisible={setAchievementOptionVisibility}
              courseAchievementOptions={achievementOptions}
              callback={onItemSelectedFromDropdown}
            />
          )}
        </div>

        {selectedAchievementOption?.id ? (
          <div>
            {`${t('course-page:chosen-achievement-option')}: `}
            {selectedAchievementOption.title}
          </div>
        ) : (
          <div>{t('course-page:no-achievement-option-chosen')}</div>
        )}
        {/* {selectedAchievementOption.id && (
          <Link
            href={`../achievements/${selectedAchievementOption.id}?courseId=${courseId}`}
          >
            {selectedAchievementOption.title}
          </Link>
        )} */}
        {selectedAchievementOption?.id &&
          (selectedAchievementOption.recordType === AchievementRecordType_enum.DOCUMENTATION ||
            selectedAchievementOption.recordType === AchievementRecordType_enum.ONLINE_COURSE) && (
            <div className="flex flex-col lg:flex-row">
              {selectedAchievementOption?.AchievementOptionTemplate?.url && (
                <FileDownload
                  filePath={selectedAchievementOption.AchievementOptionTemplate.url}
                  type="button"
                  className="mb-3 lg:mb-0 lg:mr-3"
                  label={t('course-page:download-template')}
                />
              )}
              <Button filled onClick={upload}>
                {`↑ ${t('course-page:upload-proof')}`}
              </Button>
            </div>
          )}
        {selectedAchievementOption?.id &&
          myRecords &&
          (selectedAchievementOption.recordType === AchievementRecordType_enum.DOCUMENTATION ||
            selectedAchievementOption.recordType === AchievementRecordType_enum.ONLINE_COURSE) && (
            <p>
              {t('course-page:last-upload-from-an-author', {
                dateTime: formattedDateWithTime(new Date(myRecords.created_at), lang),
                fullName: makeFullName(profile.firstName, profile.lastName),
              })}
            </p>
          )}

        {selectedAchievementOption?.id &&
          !myRecords &&
          (selectedAchievementOption.recordType === AchievementRecordType_enum.DOCUMENTATION ||
            selectedAchievementOption.recordType === AchievementRecordType_enum.ONLINE_COURSE) && (
            <p>{t('course-page:no-proof-uploaded-by-me-as-author')}</p>
          )}
      </div>
      {showModal && (
        <FormToUploadAchievementRecord
          onClose={onClosed}
          achievementOption={selectedAchievementOption}
          onSuccess={onSuccess}
          courseTitle={courseTitle}
          setAlertMessage={setAlertMessage}
          userId={userId}
          user={user}
          courseId={courseId}
          isOpen={showModal}
        />
      )}
    </ProjectResultUploadContext.Provider>
  );
};

export default CourseAchievementOption;
