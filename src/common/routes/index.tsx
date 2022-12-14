import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// config
// components
import LoadingScreen from '../components/LoadingScreen';
import ListEventPromotionDashboard from 'src/event-promotion-IV/ListEvent';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  const { pathname } = useLocation();

  const { isAuthenticated } = useAuth();

  const isDashboard = pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'shop-invitation',
          element: <ShopInvitation />,
        },
        // STORE
        {
          path: '',
          children: [
            { element: <Navigate to="/dashboard/store" replace />, index: true },
            { path: 'stories', element: <ListStore /> },
          ],
        },
        {
          path: '',
          children: [
            { element: <Navigate to="/stories" replace />, index: true },
            { path: 'admins', element: <AdminList/> },
            { path: 'admins/create', element: <AddNewAdmin /> },
            { path: 'admins/:id', element: <EditAdmin /> },          ],
        },
        {
          path: '',
          children: [
            {
              element: <Navigate to="/dashboard/event-promotion-IV" replace />,
              index: true,
            },
            { path: 'event-promotion-IV', element: <ListEventPromotion /> },
            
          ],
        },
        {
          path: '',
          children:[
            { element: <Navigate to="/dashboard/event" replace />, index: true},
            { path: 'event-history', element: <History />},
          ],
        }
      ],

    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// login
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const ForgotPassword = Loadable(
  lazy(() => import('../../auth/forgot-password/ResetPassword'))
);

// STORE ADMIN
const ListStore = Loadable(
  lazy(() => import('../../store-admin/storeAdmin-page/ListStoreAdmin'))
);


// EVENT ADMIN
const History = Loadable(lazy(() => import('../../event/event-history-prize/index')));


const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// shop invitation
const ShopInvitation = Loadable(
  lazy(() => import('src/shop-invitation/components/ShopInvitation'))
);

// EVENT_PROMOTION_IV

const ListEventPromotion = Loadable(
  lazy(() => import('../pages/event-promotion-IV/listEventPromotion'))
);
const AdminList = Loadable(lazy(()=>import('../../admin/admin-pages/AdminList')))
const AddNewAdmin = Loadable(lazy(() => import('../../admin/admin-pages/AddNewAdmin')));
const EditAdmin = Loadable(lazy(() => import('../../admin/admin-pages/EditAdmin')));
