import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
  Table,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import Iconify from 'src/common/components/Iconify';
import Scrollbar from 'src/common/components/Scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from 'src/common/components/table';
import { BREADCUMBS } from 'src/common/constants/common.constants';
import { useSelectMultiple } from 'src/common/hooks/useSelectMultiple';
import useTable from 'src/common/hooks/useTable';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { TABLE_HEAD } from '../constants';
import { useGetAllShopInvitation } from '../hooks/useGetAllShopInvitation';
import { IParamsQuery, IResShopInvitation } from '../interfaces';
import {
  firstScanEndSelector,
  firstScanStartSelector,
  searchTextSelector,
  statusSelector,
} from '../invitationSlice';
import InvitationTableRow from './InvitationTableRow';
import { useSelector } from 'src/common/redux/store';
import { InvitationTableToolbar } from './InvitationTableToolbar';
import { useGetAllShopInvitationByParams } from '../hooks/useGetAllShopInvitationByParams';
import { getQueryObj } from 'src/common/utils/getQueryObj';

export default function ShopInvitation() {
  // const { data: allData } = useGetAllShop_Invitation();
  // console.log(allData?.data);

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    setSelected,
    selected: selectedRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  console.log('.....', page);

  const searchText = useSelector(searchTextSelector);
  const statusSuccess = useSelector(statusSelector);
  const firstScanStart = useSelector(firstScanStartSelector);
  const firstScanEnd = useSelector(firstScanEndSelector);
  // console.log(firstScanStart);

  const params: IParamsQuery = {
    page: page + 1,
    size: rowsPerPage,
    firstScanEndDate: firstScanEnd,
    firstScanStartDate: firstScanStart,
    searchText: searchText,
    status: statusSuccess,
  };
  const searchParams = getQueryObj(params);
  // console.log('jdksajflksds', searchParams);

  const { data, refetch } = useGetAllShopInvitationByParams(searchParams);
  const tableData: IResShopInvitation[] = data ? data?.data?.response?.response : [];

  console.log('MMMM', data?.data?.response?.response);

  const navigate = useNavigate();

  const { isCheckedAll, selectedIds, handleSelectItem, handleCheckAll } =
    useSelectMultiple(
      tableData?.map((item) => item.spoonCode),
      page + 1
    );

  const handleSearch = () => {
    refetch();
    setPage(0);
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading="Danh Sách Khách Hàng "
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          {
            name: BREADCUMBS.SHOP_INVITATION,
            href: PATH_DASHBOARD.general.shop_invitation,
          },
          { name: BREADCUMBS.SHOP_INVITATION_lIST },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => navigate(PATH_DASHBOARD.general.shop_invitation)}
          >
            Export
          </Button>
        }
      />
      <Card>
        <Divider />
        <InvitationTableToolbar handleSearch={handleSearch} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {!!selectedIds.length && (
              <TableSelectedActions
                dense={dense}
                isSelectAll={isCheckedAll}
                numSelected={selectedIds.length}
                rowCount={tableData.length}
                onSelectAllRows={handleCheckAll}
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary">
                      <Iconify icon={'eva:trash-2-outline'} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                isSelectAll={isCheckedAll}
                headLabel={TABLE_HEAD}
                rowCount={
                  tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .length
                }
                numSelected={selectedIds.length}
                onSort={onSort}
                onSelectAllRows={handleCheckAll}
              />

              <TableBody>
                {tableData?.map((row: IResShopInvitation) => (
                  <InvitationTableRow
                    key={row.qrCode}
                    row={row}
                    selected={selectedIds.includes(row.spoonCode)}
                    onSelectRow={(e) => {
                      handleSelectItem(row.spoonCode, e);
                    }}
                    // onDeleteRow={() => handleDeleteRows([row.storeCode])}
                    // onEditRow={() => handleEditRow(row.storeCode.toString())}
                  />
                ))}

                <TableNoData isNotFound={!tableData?.length} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={data ? data?.data?.response?.response.length : 1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Card>
    </>
  );
}
