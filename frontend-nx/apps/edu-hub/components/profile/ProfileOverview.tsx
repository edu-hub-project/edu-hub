import { FC, useRef, useCallback } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { IconButton } from '@material-ui/core';
import { MdUpload } from 'react-icons/md';

import { parseFileUploadEvent } from '../../helpers/filehandling';

import { Button } from '../common/Button';
import FormFieldRow from '../common/forms/FormFieldRow';

import { useAuthedMutation } from '../../hooks/authedMutation';
import { useAuthedQuery } from '../../hooks/authedQuery';

import { UPDATE_USER } from '../../queries/updateUser';
import { USER } from '../../queries/user';
import { SAVE_USER_PROFILE_IMAGE } from '../../queries/actions';
import { UPDATE_USER_PROFILE_PICTURE } from '../../queries/updateUser';

import type {
  MutableRefObject,
} from 'react';
import {
  SaveUserProfileImage,
  SaveUserProfileImageVariables,
} from '../../queries/__generated__/SaveUserProfileImage';
import {
  UpdateUserVariables,
  UpdateUser,
} from '../../queries/__generated__/UpdateUser';
import {
  UpdateUserProfilePictureVariables,
  UpdateUserProfilePicture,
} from '../../queries/__generated__/UpdateUserProfilePicture';
import { University_enum } from '../../__generated__/globalTypes';
import { Employment_enum } from '../../__generated__/globalTypes';

// generated types must be updated first with new fields in schema
// import type { User } from "../../queries/__generated__/User";

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

// interface IProps {}
const ProfileOverview: FC = () => {
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
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted, isSubmitSuccessful },
    reset,
    setValue,
  } = methods;

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch: refetchUser,
  } = useAuthedQuery(USER, {
    variables: {
      userId: sessionData?.profile?.sub,
    },
    onCompleted: (data) => {
      const user = data.User_by_pk;

      reset({
        firstName: sessionData?.profile?.given_name,
        lastName: sessionData?.profile?.family_name,
        email: sessionData?.profile?.email,
        employment: user.employment,
        university: user.university,
        matriculationNumber: user.matriculationNumber,
        externalProfile: user.externalProfile,
      });
    },
    skip: !sessionData,
  });

  const [updateUser] = useAuthedMutation<UpdateUser, UpdateUserVariables>(
    UPDATE_USER
  );
  const [updateUserProfilePicture] = useAuthedMutation<
    UpdateUserProfilePicture,
    UpdateUserProfilePictureVariables
  >(UPDATE_USER_PROFILE_PICTURE);

  const accessToken = sessionData?.accessToken;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/account/`,
        {
          method: 'POST',
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.email,
            email: data.email,
            emailVerified: sessionData?.profile?.email_verified,
            id: sessionData?.profile?.sub,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
      // const json = await res.json();
      refetchUser();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    }
  };
  const { t } = useTranslation();

  const employmentSelectFormOptions = (
    Object.keys(Employment_enum) as Array<keyof typeof Employment_enum>
  ).map((key) => ({
    label: t(key),
    value: key,
  }));

  const universitySelectFormOptions = (
    Object.keys(University_enum) as Array<keyof typeof University_enum>
  ).map((key) => ({
    label: t(key),
    value: key,
  }));

  const imageUploadRef: MutableRefObject<any> = useRef(null);
  const handleImageUploadClick = useCallback(() => {
    imageUploadRef.current?.click();
  }, [imageUploadRef]);

  const [saveUserProfileImage] = useAuthedMutation<
    SaveUserProfileImage,
    SaveUserProfileImageVariables
  >(SAVE_USER_PROFILE_IMAGE);

  // const handleUploadUserProfileImageEvent = useCallback(
  //   async (event: any) => {
  //     const ufile = await parseFileUploadEvent(event);

  //     if (ufile != null) {
  //       const result = await saveUserProfileImage({
  //         variables: {
  //           base64File: ufile.data,
  //           fileName: ufile.name,
  //           userId: sessionData?.profile?.sub,
  //         },
  //       });
  //       const userProfileImage = result.data?.saveUserProfileImage?.google_link;
  //       if (userProfileImage != null) {
  //         setValue('picture', userProfileImage);
  //         handleSubmit(onSubmit);
  //       }
  //     }
  //   },
  //   [
  //     sessionData?.profile?.sub,
  //     saveUserProfileImage,
  //     updateUser,
  //     refetchUser,
  //     handleSubmit,
  //     onSubmit,
  //     setValue,
  //   ]
  // );
  const handleUploadUserProfileImageEvent = useCallback(
    async (event: any) => {
      const ufile = await parseFileUploadEvent(event);

      if (ufile != null) {
        const result = await saveUserProfileImage({
          variables: {
            base64File: ufile.data,
            fileName: ufile.name,
            userId: sessionData?.profile?.sub,
          },
        });
        const userProfileImage = result.data?.saveUserProfileImage?.google_link;
        if (userProfileImage != null) {
          await updateUserProfilePicture({
            variables: {
              userId: sessionData?.profile?.sub,
              picture: result.data?.saveUserProfileImage?.google_link,
            },
          });
          refetchUser();
        }
      }
    },
    [
      sessionData?.profile?.sub,
      saveUserProfileImage,
      refetchUser,
      updateUserProfilePicture,
    ]
  );

  return (
    <div className="px-3 mt-6">
      {!userLoading && !userError ? (
        <>
          <label className="text-xs uppercase tracking-widest font-medium text-gray-400">
            {t('profile-picture')}
          </label>
          <div className="bg-white h-40 justify-center mb-6 w-40">
            <IconButton onClick={handleImageUploadClick}>
              <MdUpload size="0.75em" />
            </IconButton>
            {userData.picture != null && (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img width="100px" height="100px" src={userData.picture} />
              // <img src={userData.picture} />
            )}
          </div>
          <input
            ref={imageUploadRef}
            onChange={handleUploadUserProfileImageEvent}
            className="hidden"
            type="file"
          />

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-3">
                  <FormFieldRow<Inputs>
                    label={t('first-name')}
                    name="firstName"
                    required
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <FormFieldRow<Inputs>
                    label={t('last-name')}
                    name="lastName"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-3">
                  <FormFieldRow<Inputs>
                    label={t('email')}
                    name="email"
                    placeholder="name@example.com"
                    required
                    type="email"
                    className="w-1/2 pr-3"
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <FormFieldRow<Inputs>
                    label={t('status')}
                    name="employment"
                    type="select"
                    options={employmentSelectFormOptions}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-3">
                  <FormFieldRow<Inputs>
                    label={t('university')}
                    name="university"
                    type="select"
                    options={universitySelectFormOptions}
                  />
                </div>
                <div className="w-1/2 pl-3">
                  <FormFieldRow<Inputs>
                    label={t('matriculation-number')}
                    name="matriculationNumber"
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-1/2 pr-3">
                  <FormFieldRow<Inputs>
                    label={t('external-profile')}
                    name="externalProfile"
                  />
                </div>
                <div className="w-1/2 pr-3 flex justify-center items-center">
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
    </div>
  );
};

export default ProfileOverview;
