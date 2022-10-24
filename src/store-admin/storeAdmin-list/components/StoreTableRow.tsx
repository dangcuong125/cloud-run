import { Checkbox, MenuItem, Switch, TableCell, TableRow } from '@mui/material';
import { useRef, useState } from 'react';
import Iconify from 'src/common/components/Iconify';
import { TableMoreMenu } from 'src/common/components/table';
import { useGetStoreActive } from 'src/store-admin/hooks/useGetStoreActive';
import { IPropsStoreTableRow } from '../../interfaces';

// ----------------------------------------------------------------------

function StoreTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: IPropsStoreTableRow) {
  const { code, phoneNumber, address, qrLink, isActive, createdDate } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

<<<<<<< HEAD:src/store-admin/storeAdmin-list/components/storeTableRow.tsx
  const { mutate } = useGetStoreActive();
=======
  const {mutate} = useGetStoreActive();

>>>>>>> develop:src/store-admin/storeAdmin-list/components/StoreTableRow.tsx
  const handleOpenMenu = (store: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(store.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOnChange = (active: boolean) => {
    mutate({ code, isActive: active });
  };

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell> */}
      <TableCell align="left">{code}</TableCell>

      <TableCell align="left">{phoneNumber}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {createdDate.slice(0, 19).replace('T', ' ')}
      </TableCell>

      <TableCell align="left">{address}</TableCell>

      <TableCell align="left">
        <a target="_blank" rel="noopener noreferrer" href={qrLink}>
          Tải QR
        </a>
      </TableCell>

      <TableCell align="left" title={isActive === true ? 'actived' : 'unAtivced'}>
        <Switch
<<<<<<< HEAD:src/store-admin/storeAdmin-list/components/storeTableRow.tsx
          checked={isActive ? true : false}
          onChange={(e) => {
            handleOnChange(e.target.checked);
          }}
          // onChange = {e=>e.target.checked}
        />
      </TableCell>

      <TableCell align="right">
=======
          checked={isActive ? true : false }
          onChange ={e=>{handleOnChange(e.target.checked)}}
        />
      </TableCell>

      {/* <TableCell align="right">
>>>>>>> develop:src/store-admin/storeAdmin-list/components/StoreTableRow.tsx
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell> */}
    </TableRow>
  );
}

export { StoreTableRow };
