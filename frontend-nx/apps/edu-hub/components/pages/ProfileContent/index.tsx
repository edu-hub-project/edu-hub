import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from '../../common/Button';
import UnifiedFileUploader from '../../inputs/UnifiedFileUploader';

import { useRoleQuery } from '../../../hooks/authedQuery';

import {
  UPDATE_USER_FIRST_NAME,
  UPDATE_USER_LAST_NAME,
  UPDATE_USER_PROFILE_PICTURE,
  UPDATE_USER_OCCUPATION,
  UPDATE_USER_ORGANIZATION_ID,
  UPDATE_USER_EXTERNAL_PROFILE,
  UPDATE_USER_MATRICULATION_NUMBER,
} from '../../../queries/updateUser';
import { USER, USER_OCCUPATION } from '../../../queries/user';

import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';
import { User, UserVariables } from '../../../queries/__generated__/User';
import InputField from '../../inputs/InputField';
import DropDownSelector from '../../inputs/DropDownSelector';
import { UserOccupation } from '../../../queries/__generated__/UserOccupation';
import { CREATE_ORGANIZATION, ORGANIZATION_LIST } from '../../../queries/organization';
import { OrganizationList } from '../../../queries/__generated__/OrganizationList';

const ProfileContent: FC = () => {
  const { t } = useTranslation('profile');
  const { data: sessionData, status: sessionStatus } = useSession();
  const [showError, setShowError] = useState(true);

  const {
    data: userData,
    error: userError,
    refetch: refetchUser,
  } = useRoleQuery<User, UserVariables>(USER, {
    variables: {
      userId: sessionData?.profile?.sub,
    },
    skip: !sessionData?.profile?.sub || sessionStatus === 'loading',
  });

  const queryOccupationOptions = useRoleQuery<UserOccupation>(USER_OCCUPATION, {
    skip: sessionStatus === 'loading',
  });

  const { data: organizationData } = useRoleQuery<OrganizationList>(ORGANIZATION_LIST, {
    variables: {
      limit: 100, // Adjust as needed
    },
    skip: sessionStatus === 'loading',
  });

  // Occupation enums and their translated labels
  const occupationOptions = (queryOccupationOptions.data?.UserOccupation || []).map((x) => ({
    label: t(`profile:occupation.${x.value}`), // Apply translation here
    value: x.value,
  }));

  // Organization ids and their corresponding names
  const organizationOptions =
    organizationData?.Organization?.map((org) => ({
      label: org.name,
      value: org.id.toString(),
      aliases: org.aliases,
    })) || [];

  // Render loading state
  if (sessionStatus === 'loading') {
    return <div>Loading...</div>;
  }

  // Render authentication error
  if (!sessionData?.profile?.sub) {
    return <div>Not authenticated</div>;
  }

  // Render query error
  if (userError) {
    return <ErrorMessageDialog errorMessage={userError.message} open={showError} onClose={() => setShowError(false)} />;
  }

  // Log occupation options error but don't block rendering
  if (queryOccupationOptions.error) {
    console.log('query known occupation options error', queryOccupationOptions.error);
  }

  const getOrganizationLabel = (occupation) => {
    switch (occupation) {
      case 'HIGH_SCHOOL_STUDENT':
        return t('organization.label_school');
      case 'UNIVERSITY_STUDENT':
        return t('organization.label_university');
      case 'EMPLOYED_FULL_TIME':
      case 'EMPLOYED_PART_TIME':
      case 'SELF_EMPLOYED':
        return t('organization.label_company');
      case 'RESEARCHER':
        return t('organization.label_research');
      case 'EDUCATOR':
        return t('organization.label_education');
      default:
        return t('organization.label_base');
    }
  };

  return (
    <div className="px-3 mt-20">
      <>
        <UnifiedFileUploader
          variant="eduhub"
          element="profilePicture"
          identifierVariables={{ userId: sessionData?.profile?.sub }}
          currentFile={userData?.User_by_pk?.picture}
          updateFileMutation={UPDATE_USER_PROFILE_PICTURE}
          onFileUpdated={() => refetchUser()}
          acceptedFileTypes="image/*"
          maxFileSize={5 * 1024 * 1024} // 5MB
          user={userData?.User_by_pk}
        />
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pr-0 md:pr-3">
            <InputField
              variant="eduhub"
              type="input"
              label={t('first_name')}
              itemId={userData?.User_by_pk?.id}
              value={userData?.User_by_pk?.firstName}
              updateValueMutation={UPDATE_USER_FIRST_NAME}
              showCharacterCount={false}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-3">
            <InputField
              variant="eduhub"
              type="input"
              label={t('last_name')}
              itemId={userData?.User_by_pk?.id}
              value={userData?.User_by_pk?.lastName}
              updateValueMutation={UPDATE_USER_LAST_NAME}
              showCharacterCount={false}
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pr-0 md:pr-3">
            <DropDownSelector
              variant="eduhub"
              label={t('occupation.label')}
              value={userData?.User_by_pk?.occupation}
              options={occupationOptions}
              updateValueMutation={UPDATE_USER_OCCUPATION}
              identifierVariables={{ userId: userData?.User_by_pk?.id }}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-3">
            <DropDownSelector
              variant="eduhub"
              creatable={true}
              label={getOrganizationLabel(userData?.User_by_pk?.occupation)}
              value={userData?.User_by_pk?.Organization?.id.toString()}
              placeholder={t('organization.placeholder')}
              options={organizationOptions}
              updateValueMutation={UPDATE_USER_ORGANIZATION_ID}
              identifierVariables={{ userId: userData?.User_by_pk?.id }}
              createOptionMutation={CREATE_ORGANIZATION}
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/2 pr-0 md:pr-3">
            <InputField
              variant="eduhub"
              type="link"
              label={t('external_profile')}
              itemId={userData?.User_by_pk?.id}
              value={userData?.User_by_pk?.externalProfile}
              updateValueMutation={UPDATE_USER_EXTERNAL_PROFILE}
              showCharacterCount={false}
            />
          </div>
          {/* only show for university students */}
          {userData?.User_by_pk?.occupation === 'UNIVERSITY_STUDENT' && (
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <InputField
                variant="eduhub"
                type="number"
                label={t('matriculation_number')}
                itemId={userData?.User_by_pk?.id}
                value={userData?.User_by_pk?.matriculationNumber}
                updateValueMutation={UPDATE_USER_MATRICULATION_NUMBER}
                showCharacterCount={false}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 pl-0 md:pl-3 flex justify-center items-center text-center"></div>
          <div className="w-full md:w-1/2 pl-0 md:pl-3 flex justify-center items-center text-center">
            <Button
              as="a"
              href={`${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/account`}
              target="_blank"
              filled
              inverted
            >
              {t('change_password_or_email')}
            </Button>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfileContent;
