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
} from '../../../queries/updateUser';
import { USER, USER_OCCUPATION } from '../../../queries/user';

import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';
import { User, UserVariables } from '../../../queries/__generated__/User';
import InputField from '../../inputs/InputField';
import DropDownSelector from '../../inputs/DropDownSelector';
import { UserOccupation } from '../../../queries/__generated__/UserOccupation';

const ProfileContent: FC = () => {
  const { t } = useTranslation('profile');
  const { data: sessionData, status: sessionStatus } = useSession();
  const [showError, setShowError] = useState(true);

  // Always call hooks unconditionally at the top level
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

  // Prepare data after all hooks are called
  const occupationOptions = (queryOccupationOptions.data?.UserOccupation || []).map((x) => x.value);

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
              label={t('employment_status')}
              value={userData?.User_by_pk?.occupation}
              options={occupationOptions}
              identifierVariables={{ userId: userData?.User_by_pk?.id }}
              updateValueMutation={UPDATE_USER_OCCUPATION}
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
          <div className="w-full md:w-1/2 pr-0 md:pr-3"></div>
        </div>
        <div className="flex flex-wrap">
          {/* <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <FormFieldRow<Inputs> label={t('matriculation-number')} name="matriculationNumber" />
            </div> */}
        </div>
        <div className="flex flex-wrap">
          {/* <div className="w-full md:w-1/2 pr-0 md:pr-3">
              <FormFieldRow<Inputs> label={t('external-profile')} name="externalProfile" />
            </div> */}
          <div className="w-full md:w-1/2 pl-0 md:pl-3 flex justify-center items-center text-center">
            <Button
              as="a"
              href={`${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/account`}
              target="_blank"
              filled
              inverted
            >
              {t('change-password')}
            </Button>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfileContent;
