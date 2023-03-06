import { FC, useRef, useCallback } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';
import { IconButton } from '@material-ui/core';
import { MdUpload } from 'react-icons/md';

import { parseFileUploadEvent } from '../../helpers/filehandling';

import { Button } from '../common/Button';

import { useAuthedMutation } from '../../hooks/authedMutation';
import { useAuthedQuery } from '../../hooks/authedQuery';

import { UPDATE_USER } from '../../queries/updateUser';
import { USER } from '../../queries/user';
import { SAVE_USER_PROFILE_IMAGE } from '../../queries/actions';
import { UPDATE_USER_PROFILE_PICTURE } from '../../queries/updateUser';

import type {
  MutableRefObject,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import {
  SaveUserProfileImage,
  SaveUserProfileImageVariables,
} from '../../queries/__generated__/SaveUserProfileImage';
import {
  updateUserVariables,
  updateUser,
} from '../../queries/__generated__/updateUser';
import {
  updateUserProfilePictureVariables,
  updateUserProfilePicture,
} from '../../queries/__generated__/updateUserProfilePicture';
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
};

type FormFieldRowProps = {
  label: string;
  name:
    | 'firstName'
    | 'lastName'
    | 'email'
    | 'employment'
    | 'university'
    | 'matriculationNumber'
    | 'externalProfile';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  type?: 'text' | 'email' | 'select' | 'textarea';
} & InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement>;

const FormFieldRow: FC<FormFieldRowProps> = ({
  label,
  name,
  options,
  placeholder,
  required = false,
  type = 'text',
  ...rest
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const { t } = useTranslation();

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="text-xs uppercase tracking-widest font-medium text-gray-400"
      >
        {label}
      </label>
      {(type === 'text' || type === 'email') && (
        <input
          id={name}
          type={type}
          placeholder={placeholder || label}
          {...register(name, { required })}
          className="bg-edu-light-gray p-4 mb-5 w-full block"
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...rest}
        />
      )}
      {type === 'select' && options && (
        <select
          id={name}
          placeholder={placeholder || label}
          {...register(name, { required })}
          className="bg-edu-light-gray p-4 mb-5 w-full block"
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...rest}
        >
          <option value="" disabled selected hidden>
            {t('form-select-placeholder')}
          </option>
          {options.map((option, i) => (
            <option value={option.value} key={`formoption-${i}`}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {errors[name] && (
        <div className="text-edu-red absolute top-full left-0" role="alert">
          This field is required
        </div>
      )}
    </div>
  );
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

  const [updateUser] = useAuthedMutation<updateUser, updateUserVariables>(
    UPDATE_USER
  );
  const [updateUserProfilePicture] = useAuthedMutation<
    updateUserProfilePicture,
    updateUserProfilePictureVariables
  >(UPDATE_USER_PROFILE_PICTURE);

  const accessToken = sessionData?.accessToken;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(
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
        },
      });
      // const json = await res.json();
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
      updateUser,
      refetchUser,
      handleSubmit,
      onSubmit,
      setValue,
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
              // <img width="100px" height="100px" src={userData.picture} />
              <img src={userData.picture} />
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
              <FormFieldRow label={t('first-name')} name="firstName" required />
              <FormFieldRow label={t('last-name')} name="lastName" required />
              <FormFieldRow
                label={t('email')}
                name="email"
                placeholder="name@example.com"
                required
                type="email"
              />
              <FormFieldRow
                label={t('status')}
                name="employment"
                type="select"
                options={employmentSelectFormOptions}
              />
              <FormFieldRow
                label={t('university')}
                name="university"
                type="select"
                options={universitySelectFormOptions}
              />
              <FormFieldRow
                label={t('matriculation-number')}
                name="matriculationNumber"
              />
              <FormFieldRow
                label={t('external-profile')}
                name="externalProfile"
              />
              <Button
                as="button"
                type="submit"
                disabled={isSubmitting}
                filled
                inverted
                className="block mx-auto mb-5 disabled:bg-slate-500"
              >
                {isSubmitting ? t('saving') : t('save')}
              </Button>
            </form>
          </FormProvider>
          <Button
            as="a"
            href={`${process.env.NEXT_PUBLIC_AUTH_URL}/realms/edu-hub/account`}
            target="_blank"
            filled
            inverted
          >
            {t('change-password')}
          </Button>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ProfileOverview;
