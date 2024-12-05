import { useRoleMutation } from '../../../../hooks/authedMutation';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '../../../common/Button';
import { CREATE_CERTIFICATES } from '../../../../queries/actions';
import {
  ManagedCourse_Course_by_pk,
  ManagedCourse_Course_by_pk_CourseEnrollments,
} from '../../../../queries/__generated__/ManagedCourse';
import { ApolloQueryResult } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { useEffect } from 'react';

interface Props {
  userEnrollments: ManagedCourse_Course_by_pk_CourseEnrollments[];
  course: ManagedCourse_Course_by_pk;
  certificateType: 'attendance' | 'achievement' | 'degree';
  refetchCourse: (variables?: Partial<any>) => Promise<ApolloQueryResult<any>>;
  refetch: Dispatch<SetStateAction<boolean>>;
}

export const GenerateCertificatesButton: React.FC<Props> = ({
  userEnrollments,
  course,
  certificateType,
  refetchCourse,
  refetch,
}) => {
  useEffect(() => {
    console.log('=== Component Mount State ===');
    console.log('Props received:', {
      userEnrollmentsLength: userEnrollments.length,
      userEnrollments,
      courseId: course.id,
      certificateType
    });
  }, [userEnrollments, course, certificateType]);

  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Log input parameters
  const logInputs = () => {
    console.log('=== Certificate Generation Input ===');
    console.log('Certificate Type:', certificateType);
    console.log('Course:', {
      id: course.id,
      title: course.title,
      // Add other relevant course fields
    });
    console.log('User Enrollments:', userEnrollments.map(enrollment => ({
      userId: enrollment.userId,
      enrollmentId: enrollment.id,
      // Add other relevant enrollment fields
    })));
  };

  const userIds = userEnrollments.map((enrollment) => enrollment.userId);
  
  const [createCertificates, { loading, error }] = useRoleMutation(CREATE_CERTIFICATES, {
    variables: {
      courseId: course.id,
      userIds,
      certificateType,
    },
  });

  const handleClick = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    // Log inputs before processing
    logInputs();
    
    try {
      console.log('=== Starting Certificate Generation ===');
      console.log('Mutation Variables:', {
        courseId: course.id,
        userIds,
        certificateType,
      });

      const response = await createCertificates();
      
      console.log('=== Certificate Generation Response ===');
      console.log('Full Response:', response);
      
      const certResult = response.data.createCertificates.result;
      console.log('Certificates Generated:', certResult);

      const successTranslationKey =
        certResult <= 1
          ? `course-page:${certResult === 0 ? 'no-' : '1-'}certificate-generated`
          : 'course-page:certificates-generated';
      
      const translatedMessage = t(successTranslationKey, { number: certResult });
      console.log('Success Message:', translatedMessage);
      
      setSuccessMessage(translatedMessage);
      refetch(true);
      refetchCourse();
      
    } catch (err) {
      console.error('=== Certificate Generation Error ===');
      console.error(`Error creating ${certificateType} certificate:`, {
        message: err.message,
        stack: err.stack,
        // Log additional error details if available
        graphQLErrors: err.graphQLErrors,
        networkError: err.networkError,
      });
      
      setErrorMessage(err.message);
      refetchCourse();
    }
  };

  const buttonLabel = loading || error ? 'Loading...' : t(`course-page:${certificateType}-certificate-generation`);

  return (
    <div className="flex justify-end mt-10">
      {errorMessage && <div className="text-red-500 mr-2">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mr-2">{successMessage}</div>}
      <Button filled inverted onClick={handleClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};