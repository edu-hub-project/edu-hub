import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { useAuthedQuery } from '../../hooks/authedQuery';

import { CourseWithEnrollment_Course_by_pk } from '../../queries/__generated__/CourseWithEnrollment';
import { LOAD_ACHIEVEMENT_CERTIFICATE } from '../../queries/loadAchievementCertificate';
import { LOAD_PARTICIPATION_CERTIFICATE } from '../../queries/loadParticipationCertificate';
import { Button } from '../common/Button';

import {
  loadAchievementCertificate,
  loadAchievementCertificateVariables,
} from '../../queries/__generated__/loadAchievementCertificate';
import {
  loadParticipationCertificate,
  loadParticipationCertificateVariables,
} from '../../queries/__generated__/loadParticipationCertificate';

interface IProps {
  course: CourseWithEnrollment_Course_by_pk;
}

export const CertificateDownload: FC<IProps> = ({ course }) => {
  const { t } = useTranslation();

  const courseEnrollment = course.CourseEnrollments[0];

  const {
    data: loadAchievementCertificateData,
    loading: loadAchievementCerfificateLoading,
  } = useAuthedQuery<
    loadAchievementCertificate,
    loadAchievementCertificateVariables
  >(LOAD_ACHIEVEMENT_CERTIFICATE, {
    variables: {
      path: courseEnrollment?.achievementCertificateURL,
    },
    skip: !courseEnrollment?.achievementCertificateURL,
  });

  const {
    data: loadParticipationCertificateData,
    loading: loadParticipationCerfificateLoading,
  } = useAuthedQuery<
    loadParticipationCertificate,
    loadParticipationCertificateVariables
  >(LOAD_PARTICIPATION_CERTIFICATE, {
    variables: {
      path: courseEnrollment?.attendanceCertificateURL,
    },
    skip: !courseEnrollment?.attendanceCertificateURL,
  });

  return (
    <div className="mt-4">
      <h3 className="text-3xl font-medium">
        {t('course-page:congrats-completion')}
      </h3>
      <div className="flex flex-col gap-4 mt-6">
        {loadAchievementCertificateData &&
          !loadAchievementCerfificateLoading && (
            <Button
              as="a"
              filled
              href={
                loadAchievementCertificateData.loadAchievementCertificate.link
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('course-page:achievementCertificateDownload')}
            </Button>
          )}
        {loadParticipationCertificateData &&
          !loadParticipationCerfificateLoading && (
            <Button
              as="a"
              filled
              href={
                loadParticipationCertificateData.loadParticipationCertificate
                  .link
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('course-page:attendanceCertificateDownload')}
            </Button>
          )}
      </div>
    </div>
  );
};
