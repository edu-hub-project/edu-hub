import { FC, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from '../../common/Button';
import FormFieldRow from '../../forms/FormFieldRow';
import UnifiedFileUploader from '../../forms/UnifiedFileUploader';

import { useAuthedMutation } from '../../../hooks/authedMutation';
import { useAuthedQuery } from '../../../hooks/authedQuery';

import { UPDATE_USER } from '../../../queries/updateUser';
import { USER } from '../../../queries/user';
import { UPDATE_USER_PROFILE_PICTURE } from '../../../queries/updateUser';

import { UpdateUserVariables, UpdateUser } from '../../../queries/__generated__/UpdateUser';
import { University_enum } from '../../../__generated__/globalTypes';
import { Employment_enum } from '../../../__generated__/globalTypes';
import log from 'loglevel';
import { ErrorMessageDialog } from '../../common/dialogs/ErrorMessageDialog';
import { User, UserVariables } from '../../../queries/__generated__/User';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  employment: Employment_enum | null;
  university: University_enum | null;
  matriculationNumber: string;
  externalProfile: string;
  password: string;
  picture: string;
};

const ProfileOverview: FC = () => {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { data: sessionData } = useSession();

  const methods = useForm<Inputs>({
    defaultValues: {
      firstName: sessionData?.profile?.given_name,
      lastName: sessionData?.profile?.family_name,
      email: sessionData?.profile?.email,
      employment: null,
      university: null,
      matriculationNumber: '',
      externalProfile: '',
      picture: null,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useAuthedQuery<User, UserVariables>(USER, {
    variables: {
      userId: sessionData?.profile?.sub,
    },
    onCompleted: (data) => {
      const user = data.User_by_pk;

      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        employment: user.employment,
        university: user.university,
        matriculationNumber: user.matriculationNumber,
        externalProfile: user.externalProfile,
        picture: user.picture,
      });
    },
    skip: !sessionData,
  });

  const [updateUser] = useAuthedMutation<UpdateUser, UpdateUserVariables>(UPDATE_USER);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await updateUser({
        variables: {
          userId: sessionData?.profile?.sub,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          matriculationNumber: data.matriculationNumber,
          university: data.university,
          externalProfile: data.externalProfile,
          employment: data.employment,
          picture: data.picture,
        },
      });
      refetchUser();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      log.error("Error while updating user's profile", error);
      setErrorMessage(error.message || "Error while updating user's profile");
      setIsErrorDialogOpen(true);
    }
  };
  const { t } = useTranslation();

  const employmentSelectFormOptions = (Object.keys(Employment_enum) as Array<keyof typeof Employment_enum>).map(
    (key) => ({
      label: t(key),
      value: key,
    })
  );

  const universitySelectFormOptions = (Object.keys(University_enum) as Array<keyof typeof University_enum>).map(
    (key) => ({
      label: t(key),
      value: key,
    })
  );

  return (
    <div className="px-3 mt-20">
      {!userLoading && !userError ? (
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

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                  <FormFieldRow<Inputs> label={t('first-name')} name="firstName" required />
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-3">
                  <FormFieldRow<Inputs> label={t('last-name')} name="lastName" required />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                  <FormFieldRow<Inputs>
                    label={t('email')}
                    name="email"
                    placeholder="name@example.com"
                    required
                    type="email"
                  />
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-3">
                  <FormFieldRow<Inputs>
                    label={t('status')}
                    name="employment"
                    type="select"
                    options={employmentSelectFormOptions}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                  <FormFieldRow<Inputs>
                    label={t('university')}
                    name="university"
                    type="select"
                    options={universitySelectFormOptions}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-0 md:pl-3">
                  <FormFieldRow<Inputs> label={t('matriculation-number')} name="matriculationNumber" />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 pr-0 md:pr-3">
                  <FormFieldRow<Inputs> label={t('external-profile')} name="externalProfile" />
                </div>
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
              {/* <FormFieldRow<Inputs> name="picture" type="file" /> */}
              <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
                filled
                inverted
                className="mt-8 block mx-auto mb-5 disabled:bg-slate-500"
              >
                {isSubmitting ? t('saving') : t('save')}
              </Button>
            </form>
          </FormProvider>
        </>
      ) : (
        <div>Loading</div>
      )}
      {isErrorDialogOpen && (
        <ErrorMessageDialog
          errorMessage={errorMessage}
          open={isErrorDialogOpen}
          onClose={() => setIsErrorDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfileOverview;
