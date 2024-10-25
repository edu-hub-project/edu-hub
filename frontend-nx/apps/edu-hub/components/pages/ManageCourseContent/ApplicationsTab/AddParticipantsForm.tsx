import React, { FC, useMemo, useState, FormEvent } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Button } from '../../../common/Button';
import TagSelector from '../../../inputs/TagSelector';
import RadioButtonSelector from '../../../inputs/RadioButtonSelector';
import { useRoleQuery } from '../../../../hooks/authedQuery';
import { useRoleMutation } from '../../../../hooks/authedMutation';
import { USER_LIST } from '../../../../queries/user';
import { UpdateEnrollment, UpdateEnrollmentVariables } from '../../../../queries/__generated__/UpdateEnrollment';
import { UPDATE_ENROLLMENT } from '../../../../queries/insertEnrollment';
import { CourseEnrollmentStatus_enum } from '../../../../__generated__/globalTypes';

interface AddParticipantsFormProps {
  courseId: number;
  onSubmit: () => void;
}

export const AddParticipantsForm: FC<AddParticipantsFormProps> = ({ courseId, onSubmit }) => {
  const { t } = useTranslation('manageCourse');

  // State hooks
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(CourseEnrollmentStatus_enum.APPLIED);
  const [userSelectionError, setUserSelectionError] = useState<string | null>(null);

  // GraphQL hooks
  const { data, loading, error } = useRoleQuery(USER_LIST);
  const [insertEnrollment] = useRoleMutation<UpdateEnrollment, UpdateEnrollmentVariables>(UPDATE_ENROLLMENT, {
    refetchQueries: ['ManagedCourse'],
  });

  // Memoized user list based on GraphQL query
  const availableUsers = useMemo(() => {
    if (data && !loading && !error) {
      return data.User.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName} (${user.email})`,
      }));
    }
    return [];
  }, [data, loading, error]);

  // Enum to radio button options
  const radioOptions = [
    { value: CourseEnrollmentStatus_enum.APPLIED, label: t('add_as_applied') },
    { value: CourseEnrollmentStatus_enum.INVITED, label: t('add_as_invited') },
    { value: CourseEnrollmentStatus_enum.CONFIRMED, label: t('add_as_confirmed') },
    { value: CourseEnrollmentStatus_enum.ABORTED, label: t('add_as_aborted') },
  ];

  // Event handlers
  const handleUserSelection = (newUserIds) => setSelectedUserIds(newUserIds);
  const handleStatusSelection = (newStatus) => setSelectedStatus(newStatus);

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedUserIds.length === 0) {
      setUserSelectionError(t('add_user_error'));
      return;
    }
    setUserSelectionError(null); // Clear any previous errors

    for (const user of selectedUserIds) {
      await insertEnrollment({
        variables: {
          courseId,
          userId: user.id,
          motivationLetter: 'Manually added user.',
          status: selectedStatus as CourseEnrollmentStatus_enum,
        },
      }).catch((err) => console.error(`Failed to insert for user ${user.id}: ${err}`));
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-[400px] h-[400px]">
      <TagSelector
        variant="material"
        label={t('selected_users')}
        placeholder={t('name_or_email')}
        itemId={0}
        values={selectedUserIds}
        options={availableUsers}
        onValueUpdated={handleUserSelection}
        refetchQueries={[]}
      />
      <RadioButtonSelector
        className="mt-8"
        immediateCommit={false}
        label={t('add_as_confirmed')}
        itemId={0}
        currentValue={selectedStatus}
        radioOptions={radioOptions}
        onSelectedValueChange={handleStatusSelection}
        refetchQueries={[]}
      />
      {userSelectionError && <div className="text-red-500 mt-4">{userSelectionError}</div>}

      <div className="flex justify-center my-8">
        <Button filled type="submit">
          {t('common:submit')}
        </Button>
      </div>
    </form>
  );
};

export default AddParticipantsForm;
