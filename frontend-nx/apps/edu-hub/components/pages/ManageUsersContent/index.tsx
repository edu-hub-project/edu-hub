import { FC, ReactNode, useMemo, useCallback } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ColumnDef } from '@tanstack/react-table';
import { HiArrowRight } from 'react-icons/hi';

import TableGrid from '../../common/TableGrid';
import Loading from '../../common/Loading';
import { useTableGrid } from '../../common/TableGrid/hooks';

import { useAdminQuery } from '../../../hooks/authedQuery';
import { USERS_BY_LAST_NAME, DELETE_USER } from '../../../queries/user';
import { UsersByLastName_User } from '../../../queries/__generated__/UsersByLastName';
import { PageBlock } from '../../common/PageBlock';
import CommonPageHeader from '../../common/CommonPageHeader';
import NavigationButton from '../../common/NavigationButton';

const ExpandableUserRow: FC<{ row: UsersByLastName_User }> = ({ row }) => {
  const { t } = useTranslation('manageUsers');
  return (
    <div>
      <div className="font-medium bg-edu-course-list grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
        <div className="pl-3 col-span-3">
          <p className="text-gray-700 truncate font-medium">{`${t('occupation')}: ${
            row.occupation ? t(`profile:occupation.${row.occupation}`) : '-'
          }`}</p>
        </div>
        <div className="pl-3 col-span-3">
          <p className="text-gray-700 truncate font-medium">{`${t('organization')}: ${
            row.Organization?.name ? row.Organization.name : '-'
          }`}</p>
        </div>
      </div>
      <div className="font-medium bg-edu-course-list flex py-4">
        <div className="pl-3">
          {row.CourseEnrollments.map((enrollment, index) => (
            <p key={index} className="text-gray-600 truncate text-sm">
              {enrollment.Course.title} ({enrollment.Course.Program.shortTitle}) - {enrollment.status}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const ManageUsersContent: FC = () => {
  const { t } = useTranslation('manageUsers');
  const { data, loading, error, pageIndex, setPageIndex, searchFilter, setSearchFilter } = useTableGrid({
    queryHook: useAdminQuery,
    query: USERS_BY_LAST_NAME,
    pageSize: 15,
    refetchFilter: (searchFilter) => ({
      _or: [
        { lastName: { _ilike: `%${searchFilter}%` } },
        { firstName: { _ilike: `%${searchFilter}%` } },
        { email: { _ilike: `%${searchFilter}%` } },
      ],
    }),
  });

  const columns = useMemo<ColumnDef<UsersByLastName_User>[]>(
    () => [
      {
        header: t('first_name'),
        accessorKey: 'firstName',
        enableSorting: true,
        meta: {
          width: 3,
        },
        cell: ({ getValue }) => <div>{getValue<ReactNode>()}</div>,
      },
      {
        header: t('last_name'),
        accessorKey: 'lastName',
        enableSorting: true,
        meta: {
          width: 3,
        },
        cell: ({ getValue }) => <div>{getValue<ReactNode>()}</div>,
      },
      {
        header: t('email'),
        accessorKey: 'email',
        enableSorting: true,
        meta: {
          width: 3,
        },
        cell: ({ getValue }) => <div>{getValue<ReactNode>()}</div>,
      },
    ],
    [t]
  );

  const generateDeletionConfirmation = useCallback(
    (row: UsersByLastName_User) => {
      return t('deletion_confirmation_question', { firstName: row.firstName, lastName: row.lastName });
    },
    [t]
  );

  return (
    <PageBlock>
      <div className="max-w-screen-xl mx-auto mt-20">
        {loading && <Loading />}
        {!loading && !error && (
          <div>
            <div className="flex justify-between items-center">
              <CommonPageHeader headline={t('headline')} />
              <NavigationButton href="/manage/admin-users" filled inverted>
                {t('manageUsers:manage_admins')}
              </NavigationButton>
            </div>
            <TableGrid
              columns={columns}
              data={data?.User || []}
              totalCount={data?.User_aggregate?.aggregate?.count || 0}
              pageIndex={pageIndex}
              onPageChange={setPageIndex}
              searchFilter={searchFilter}
              onSearchFilterChange={setSearchFilter}
              deleteMutation={DELETE_USER}
              deleteIdType="uuidString"
              error={error}
              loading={loading}
              refetchQueries={['UsersByLastName']}
              generateDeletionConfirmationQuestion={generateDeletionConfirmation}
              expandableRowComponent={({ row }) => <ExpandableUserRow row={row} />}
            />
          </div>
        )}
      </div>
    </PageBlock>
  );
};

export default ManageUsersContent;
