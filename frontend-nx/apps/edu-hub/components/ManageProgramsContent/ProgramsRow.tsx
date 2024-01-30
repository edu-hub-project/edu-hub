/* eslint-disable @typescript-eslint/ban-ts-comment */
import { QueryResult } from '@apollo/client';
import { CircularProgress, IconButton } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { FC, MutableRefObject, useCallback, useRef } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete, MdOutlineCheckBoxOutlineBlank, MdUpload } from 'react-icons/md';
import { Button } from '../../components/common/Button';
import { parseFileUploadEvent } from '../../helpers/filehandling';
import { useAdminMutation } from '../../hooks/authedMutation';
import { useLazyRoleQuery } from '../../hooks/authedQuery';
import { SAVE_ACHIEVEMENT_CERTIFICATE_TEMPLATE, SAVE_ATTENDANCE_CERTIFICATE_TEMPLATE } from '../../queries/actions';
import { LOAD_PARTICIPATION_DATA } from '../../queries/actions';
import {
  UPDATE_ACHIEVEMENT_CERTIFICATE_TEMPLATE,
  UPDATE_ATTENDANCE_CERTIFICATE_TEMPLATE,
} from '../../queries/updateProgram';
import { ProgramList_Program } from '../../queries/__generated__/ProgramList';
import {
  SaveAchievementCertificateTemplate,
  SaveAchievementCertificateTemplateVariables,
} from '../../queries/__generated__//SaveAchievementCertificateTemplate';
import {
  SaveAttendanceCertificateTemplate,
  SaveAttendanceCertificateTemplateVariables,
} from '../../queries/__generated__/SaveAttendanceCertificateTemplate';

import {
  UpdateProgramAchievementTemplate,
  UpdateProgramAchievementTemplateVariables,
} from '../../queries/__generated__/UpdateProgramAchievementTemplate';
import {
  loadParticipationData,
  loadParticipationDataVariables,
} from '../../queries/__generated__/loadParticipationData';
import {
  UpdateProgramParticipationTemplate,
  UpdateProgramParticipationTemplateVariables,
} from '../../queries/__generated__/UpdateProgramParticipationTemplate';
import EhDebounceInput from '../common/EhDebounceInput';
import FileUpload from '../common/forms/FileUpload';
import path from 'path';

interface ProgramsRowProps {
  program: ProgramList_Program;
  openProgramId: number;
  canDelete: boolean;
  qResult: QueryResult<any>;
  onSetPublished: (p: ProgramList_Program, isPublished: boolean) => any;
  onSetTitle: (p: ProgramList_Program, title: string) => any;
  onSetShortTitle: (p: ProgramList_Program, shortTitle: string) => any;
  onSetApplicationStart: (p: ProgramList_Program, start: Date | null) => any;
  onSetApplicationEnd: (p: ProgramList_Program, end: Date | null) => any;
  onSetLectureStart: (p: ProgramList_Program, start: Date | null) => any;
  onSetLectureEnd: (p: ProgramList_Program, end: Date | null) => any;
  onSetUploadData: (p: ProgramList_Program, d: Date | null) => any;
  onSetStartQuestionnaire: (p: ProgramList_Program, link: string) => any;
  onSetSpeakerQuestionnaire: (p: ProgramList_Program, link: string) => any;
  onSetClosingQuestionnaire: (p: ProgramList_Program, link: string) => any;
  onSetVisibilityAttendanceCertificate: (p: ProgramList_Program, isVisible: boolean) => any;
  onSetVisibilityAchievementCertificate: (p: ProgramList_Program, isVisible: boolean) => any;
  onDelete: (p: ProgramList_Program) => any;
  onOpenProgram: (p: ProgramList_Program) => any;
}

export const ProgramsRow: FC<ProgramsRowProps> = ({
  program,
  openProgramId,
  canDelete,
  qResult,
  onSetApplicationEnd,
  onDelete,
  onOpenProgram,
  onSetApplicationStart,
  onSetLectureEnd,
  onSetLectureStart,
  onSetShortTitle,
  onSetTitle,
  onSetUploadData,
  onSetPublished,
  onSetStartQuestionnaire,
  onSetSpeakerQuestionnaire,
  onSetClosingQuestionnaire,
  onSetVisibilityAttendanceCertificate,
  onSetVisibilityAchievementCertificate,
}) => {
  const handleToggleVisibilityAttendanceCertificate = useCallback(() => {
    onSetVisibilityAttendanceCertificate(program, !program.visibilityAttendanceCertificate);
  }, [program, onSetVisibilityAttendanceCertificate]);

  const handleToggleVisibilityAchievementCertificate = useCallback(() => {
    onSetVisibilityAchievementCertificate(program, !program.visibilityAchievementCertificate);
  }, [program, onSetVisibilityAchievementCertificate]);

  const handleTogglePublished = useCallback(() => {
    onSetPublished(program, !program.published);
  }, [program, onSetPublished]);

  const handleSetStartQuestionnaire = useCallback(
    (value: string) => {
      onSetStartQuestionnaire(program, value);
    },
    [program, onSetStartQuestionnaire]
  );

  const handleSetSpeakerQuestionnaire = useCallback(
    (value: string) => {
      onSetSpeakerQuestionnaire(program, value);
    },
    [program, onSetSpeakerQuestionnaire]
  );

  const handleSetClosingQuestionnaire = useCallback(
    (value: string) => {
      onSetClosingQuestionnaire(program, value);
    },
    [program, onSetClosingQuestionnaire]
  );

  const handleSetTitle = useCallback(
    (value: string) => {
      onSetTitle(program, value);
    },
    [program, onSetTitle]
  );

  const handleSetShortTitle = useCallback(
    (value: string) => {
      onSetShortTitle(program, value);
    },
    [program, onSetShortTitle]
  );

  const handleSetApplicationStart = useCallback(
    (start: Date | null) => {
      onSetApplicationStart(program, start);
    },
    [program, onSetApplicationStart]
  );

  const handleSetApplicationEnd = useCallback(
    (end: Date | null) => {
      onSetApplicationEnd(program, end);
    },
    [program, onSetApplicationEnd]
  );

  const handleSetLectureStart = useCallback(
    (start: Date | null) => {
      onSetLectureStart(program, start);
    },
    [program, onSetLectureStart]
  );

  const handleSetLectureEnd = useCallback(
    (end: Date | null) => {
      onSetLectureEnd(program, end);
    },
    [program, onSetLectureEnd]
  );

  const handleSetUploadData = useCallback(
    (d: Date | null) => {
      onSetUploadData(program, d);
    },
    [program, onSetUploadData]
  );

  const handleOpenProgram = useCallback(() => {
    onOpenProgram(program);
  }, [program, onOpenProgram]);

  const handleDeleteProgram = useCallback(() => {
    onDelete(program);
  }, [program, onDelete]);

  const templateAttendanceUploadRef: MutableRefObject<any> = useRef(null);
  const handleUploadAttendanceTemplateClick = useCallback(() => {
    templateAttendanceUploadRef.current?.click();
  }, [templateAttendanceUploadRef]);

  const [saveAttendanceCertificateTemplate] = useAdminMutation<
    SaveAttendanceCertificateTemplate,
    SaveAttendanceCertificateTemplateVariables
  >(SAVE_ATTENDANCE_CERTIFICATE_TEMPLATE);

  const [updateParticipationTemplate] = useAdminMutation<
    UpdateProgramParticipationTemplate,
    UpdateProgramParticipationTemplateVariables
  >(UPDATE_ATTENDANCE_CERTIFICATE_TEMPLATE);

  const handleAttendanceTemplateUploadEvent = useCallback(
    async (event: any) => {
      const uploadFile = await parseFileUploadEvent(event);

      if (uploadFile != null) {
        const res = await saveAttendanceCertificateTemplate({
          variables: {
            base64File: uploadFile.data,
            fileName: uploadFile.name,
            programId: program.id,
          },
        });
        if (res.data?.saveAttendanceCertificateTemplate?.file_path) {
          await updateParticipationTemplate({
            variables: {
              programId: program.id,
              templatePath: res.data?.saveAttendanceCertificateTemplate?.file_path,
            },
          });

          qResult.refetch();
        }
      }
    },
    [saveAttendanceCertificateTemplate, qResult, updateParticipationTemplate, program]
  );

  const templateAchievementUploadRef: MutableRefObject<any> = useRef(null);
  const handleUploadAchievementTemplateClick = useCallback(() => {
    templateAchievementUploadRef.current?.click();
  }, [templateAchievementUploadRef]);

  const [saveAchievementCertificateTemplate] = useAdminMutation<
    SaveAchievementCertificateTemplate,
    SaveAchievementCertificateTemplateVariables
  >(SAVE_ACHIEVEMENT_CERTIFICATE_TEMPLATE);

  const [updateAchievementCertificationTemplate] = useAdminMutation<
    UpdateProgramAchievementTemplate,
    UpdateProgramAchievementTemplateVariables
  >(UPDATE_ACHIEVEMENT_CERTIFICATE_TEMPLATE);

  const [
    loadParticipationData,
    { data: loadParticipationDataResult, loading: loadParticipationDataLoading, error: loadParticipationDataError },
  ] = useLazyRoleQuery<loadParticipationData, loadParticipationDataVariables>(LOAD_PARTICIPATION_DATA, {
    variables: { programId: program.id },
  });

  const handleLoadParticipationDataClick = () => {
    try {
      loadParticipationData();
    } catch (error) {
      console.log('loadParticipationDataError', error);
    }
  };

  const handleTemplateAchievementUploadEvent = useCallback(
    async (event: any) => {
      const uFile = await parseFileUploadEvent(event);
      if (uFile != null) {
        try {
          const response = await saveAchievementCertificateTemplate({
            variables: {
              base64File: uFile.data,
              fileName: uFile.name,
              programId: program.id,
            },
          });

          if (response.data?.saveAchievementCertificateTemplate?.file_path) {
            await updateAchievementCertificationTemplate({
              variables: {
                programId: program.id,
                templatePath: response.data?.saveAchievementCertificateTemplate?.file_path,
              },
            });

            qResult.refetch();
          }
        } catch (error) {
          console.error('Error saving achievement certificate template:', error);
        }
      }
    },
    [saveAchievementCertificateTemplate, qResult, updateAchievementCertificationTemplate, program]
  );

  const { t, lang } = useTranslation('managePrograms');

  const achievementCertificateTemplateName = program.achievementCertificateTemplateURL
    ? path.basename(program.achievementCertificateTemplateURL)
    : t('course-page:no-template-uploaded-yet');
  const attendanceCertificateTemplateName = program.attendanceCertificateTemplateURL
    ? path.basename(program.attendanceCertificateTemplateURL)
    : t('course-page:no-template-uploaded-yet');

  return (
    <div>
      <div className="grid grid-cols-10 mb-1 bg-gray-100">
        <div className="flex justify-center cursor-pointer" onClick={handleTogglePublished}>
          {!program.published && <MdCheckBoxOutlineBlank size="1.5em" />}
          {program.published && <MdCheckBox size="1.5em" />}
        </div>

        <div className="col-span-2">
          <EhDebounceInput
            placeholder={t('title.placeholder')}
            onChangeHandler={handleSetTitle}
            inputText={program.title}
          />
        </div>

        <div>
          <EhDebounceInput
            placeholder={t('short_title.placeholder')}
            onChangeHandler={handleSetShortTitle}
            inputText={program.shortTitle ?? ''}
          />
        </div>

        <div>
          {/* @ts-ignore: https://github.com/Hacker0x01/react-datepicker/issues/3784 */}
          <DatePicker
            className="w-full bg-gray-100"
            dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
            selected={program.applicationStart || new Date()}
            onChange={handleSetApplicationStart}
            locale={lang}
          />
        </div>

        <div>
          {/* @ts-ignore: https://github.com/Hacker0x01/react-datepicker/issues/3784 */}
          <DatePicker
            dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
            className="w-full bg-gray-100"
            selected={program.defaultApplicationEnd || new Date()}
            onChange={handleSetApplicationEnd}
            locale={lang}
          />
        </div>

        <div>
          {/* @ts-ignore: https://github.com/Hacker0x01/react-datepicker/issues/3784 */}
          <DatePicker
            dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
            className="w-full bg-gray-100"
            selected={program.lectureStart || new Date()}
            onChange={handleSetLectureStart}
            locale={lang}
          />
        </div>

        <div>
          {/* @ts-ignore: https://github.com/Hacker0x01/react-datepicker/issues/3784 */}
          <DatePicker
            dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
            className="w-full bg-gray-100"
            selected={program.lectureEnd || new Date()}
            onChange={handleSetLectureEnd}
            locale={lang}
          />
        </div>

        <div>
          {/* @ts-ignore: https://github.com/Hacker0x01/react-datepicker/issues/3784 */}
          <DatePicker
            dateFormat={lang === 'de' ? 'dd.MM.yyyy' : 'MM/dd/yyyy'}
            className="w-full bg-gray-100"
            selected={program.achievementRecordUploadDeadline || new Date()}
            onChange={handleSetUploadData}
            locale={lang}
          />
        </div>

        <div className="grid grid-cols-2">
          <div>
            <IconButton onClick={handleOpenProgram}>
              {openProgramId !== program.id ? <IoIosArrowDown size="0.75em" /> : <IoIosArrowUp size="0.75em" />}
            </IconButton>
          </div>

          {canDelete && (
            <div>
              <IconButton onClick={handleDeleteProgram}>
                <MdDelete size="0.75em" />
              </IconButton>
            </div>
          )}
        </div>
      </div>

      {program.id === openProgramId && (
        <div className="mb-1">
          <div className="grid grid-cols-3 bg-gray-100 p-10">
            <div className="p-3">
              <span>{t('start_evaluation.label')}</span>
              <br />
              <EhDebounceInput
                placeholder={t('start_evaluation.placeholder')}
                onChangeHandler={handleSetStartQuestionnaire}
                inputText={program.startQuestionnaire || ''}
              />
            </div>
            <div className="p-3">
              <span>{t('speaker_evaluation.label')}</span>
              <br />
              <EhDebounceInput
                placeholder={t('speaker_evaluation.placeholder')}
                onChangeHandler={handleSetSpeakerQuestionnaire}
                inputText={program.speakerQuestionnaire || ''}
              />
            </div>
            <div className="p-3">
              <span>{t('final_evaluation.label')}</span>
              <br />
              <EhDebounceInput
                placeholder={t('final_evaluation.placeholder')}
                onChangeHandler={handleSetClosingQuestionnaire}
                inputText={program.closingQuestionnaire || ''}
              />
            </div>

            <div className="p-3">
              {`${t('course-page:template')} ${t('course-page:proof-of-participation')}`}

              <IconButton onClick={handleUploadAttendanceTemplateClick}>
                <MdUpload size="0.75em" />
              </IconButton>
              <br />
              <div className="w-80 truncate">{attendanceCertificateTemplateName}</div>
              <input
                ref={templateAttendanceUploadRef}
                onChange={handleAttendanceTemplateUploadEvent}
                className="hidden"
                type="file"
              />
            </div>
            <div className="p-3">
              {`${t('course-page:template')} ${t('course-page:performance-certificate')}`}
              <IconButton onClick={handleUploadAchievementTemplateClick}>
                <MdUpload size="0.75em" />
              </IconButton>
              <br />
              <div className="w-80 truncate">{achievementCertificateTemplateName}</div>
              <input
                ref={templateAchievementUploadRef}
                onChange={handleTemplateAchievementUploadEvent}
                className="hidden"
                type="file"
              />
            </div>
            <div className="p-3">
              {`${t('course-page:show-certificates')}:`}
              <div className="grid grid-cols-10">
                <div className="cursor-pointer" onClick={handleToggleVisibilityAttendanceCertificate}>
                  {program.visibilityAttendanceCertificate && <MdCheckBox size="1.5em" />}
                  {!program.visibilityAttendanceCertificate && <MdOutlineCheckBoxOutlineBlank size="1.5em" />}
                </div>
                <div className="col-span-9">{t('course-page:proof-of-participation')}</div>
              </div>
              <div className="grid grid-cols-10">
                <div className="cursor-pointer" onClick={handleToggleVisibilityAchievementCertificate}>
                  {program.visibilityAchievementCertificate && <MdCheckBox size="1.5em" />}
                  {!program.visibilityAchievementCertificate && <MdOutlineCheckBoxOutlineBlank size="1.5em" />}
                </div>
                <div className="col-span-9">{t('course-page:performance-certificate')}</div>
              </div>
            </div>
            <div className="p-3">
              <Button as="button" onClick={handleLoadParticipationDataClick} disabled={loadParticipationDataLoading}>
                {loadParticipationDataLoading ? <CircularProgress /> : t('course-page:participationDataGenerate')}
              </Button>
            </div>
            <div className="p-3">
              {loadParticipationDataResult && !loadParticipationDataLoading && !loadParticipationDataError && (
                <Button
                  as="a"
                  href={loadParticipationDataResult.loadParticipationData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {t('course-page:participationDataDownload')}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
