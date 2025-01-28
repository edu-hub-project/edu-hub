import React, { useState } from 'react';
import { useAdminMutation } from '../../hooks/authedMutation';
import { DocumentNode } from 'graphql';
import useTranslation from 'next-translate/useTranslation';
import { gql } from '@apollo/client';
import { Checkbox, FormControlLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

type CheckBoxSelectorProps = {
  immediateCommit?: boolean;
  label: string;
  itemId: number;
  checked: boolean;
  setCheckboxMutation?: DocumentNode;
  onCheckedChange?: (checked: boolean) => void;
  refetchQueries: string[];
  className?: string;
  translationNamespace?: string;
};

// Create a styled Checkbox component
const GrayCheckbox = styled(Checkbox)(() => ({
  color: '#4A5568', // Tailwind's gray-400
  '&.Mui-checked': {
    color: '#4A5568',
  },
}));

const CheckBoxSelector: React.FC<CheckBoxSelectorProps> = ({
  immediateCommit = true,
  label,
  itemId,
  checked: initialChecked,
  setCheckboxMutation,
  onCheckedChange,
  refetchQueries,
  className,
  translationNamespace,
}) => {
  const [checked, setChecked] = useState(initialChecked);
  const { t } = useTranslation();

  const DUMMY_MUTATION = gql`
    mutation DummyMutation {
      __typename
    }
  `;

  const [setCheckbox] = useAdminMutation(setCheckboxMutation || DUMMY_MUTATION, {
    refetchQueries,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    if (immediateCommit) {
      setCheckbox({ variables: { itemId, checked: newChecked } });
    }
    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <div className={className}>
      <FormControl component="fieldset">
        <FormControlLabel
          control={<GrayCheckbox checked={checked} onChange={handleChange} />}
          label={translationNamespace ? t(`${translationNamespace}:${label}`) : label}
        />
      </FormControl>
    </div>
  );
};

export default CheckBoxSelector;
