import { API_SHOP_INVITATION } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IParamsQuery, IResShopInvitation, IResShopInvitationData } from './interfaces';

export const getAllShopInvitation = (): Promise<IResShopInvitationData> => {
  return axiosInstance.get(API_SHOP_INVITATION);
};

export const getAllShopInvitationByparams = (
  params: IParamsQuery
): Promise<IResShopInvitationData> => {
  return axiosInstance.get(API_SHOP_INVITATION, { params });
};
