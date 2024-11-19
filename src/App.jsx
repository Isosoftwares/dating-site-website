import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersistLogin from "./components/PersistLogin";
import BackToTopButton from "./components/BackToTopButton";
import RequireAuth from "./components/RequireAuth";
import F404Page from "./pages/F404Page";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import useScrollToTop from "./hooks/useScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ClientDashboard from "./client-dashboard/ClientDashboard";
import ClientOverview from "./client-dashboard/ClientOverview";
import { MantineProvider } from "@mantine/core";
import ChangePassword from "./client-dashboard/components/ChangePassword";
import "@mantine/core/styles.css";
import Clients from "./admin/Clients";
import Account from "./admin/Account";
import AdminDashboard from "./admin/AdminDashboard";
import ClientDetailsAdmin from "./admin/ClientDetailsAdmin";
import Contact from "./pages/Contact";
import "@mantine/carousel/styles.css";
import ViewUser from "./client-dashboard/ViewUser";
import Online from "./client-dashboard/Online";
import ClientProfile from "./client-dashboard/ClientProfile";
import MessagesPage from "./client-dashboard/messaging/MessagesPage";
import EditProfile from "./client-dashboard/EditProfile";
import Likes from "./client-dashboard/activities/Likes";
import Favorites from "./client-dashboard/activities/Favorites";
import ProfileViews from "./client-dashboard/activities/ProfileViews";
import Subscriptions from "./client-dashboard/subscriptions/Subscriptions";
import Overview from "./admin/Overview";
import UserSubscriptions from "./admin/UserSubscriptions";
import SubscriptionsAdmin from "./admin/SubscriptionsAdmin";

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-[#faf6fa] overflow-x-hidden">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BackToTopButton />

      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Router>
            {/* Call useScrollToTop here, inside the Router */}
            <ScrollToTopWrapper>
              <Routes>
                <Route element={<PersistLogin />}>
                  <Route path="/" element={<Login />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/policies" element={<Privacy />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/*" element={<F404Page />} />

                  {/* client dash */}
                  <Route element={<RequireAuth allowedRoles={["Client"]} />}>
                    <Route exact path="/client" element={<ClientDashboard />}>
                      <Route index element={<ClientOverview />} />
                      <Route path="overview" element={<ClientOverview />} />
                      <Route path="online" element={<Online />} />
                      <Route path="profile" element={<ClientProfile />} />
                      <Route path="edit-profile" element={<EditProfile />} />
                      <Route path="messages" element={<MessagesPage />} />
                      <Route path="user/:_id" element={<ViewUser />} />
                      <Route path="likes" element={<Likes />} />
                      <Route path="favorites" element={<Favorites />} />
                      <Route path="profile-views" element={<ProfileViews />} />
                      <Route path="upgrade" element={<Subscriptions />} />
                      <Route path="change-password" element={<ChangePassword />} />
                    </Route>
                  </Route>

                  {/* admin dash */}
                  <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route exact path="/dashboard" element={<AdminDashboard />}>
                      <Route index element={<Overview />} />
                      <Route path="overview" element={<Overview />} />
                      <Route path="clients" element={<Clients />} />
                      <Route path="manage-subscriptions" element={<SubscriptionsAdmin />} />
                      <Route path="client-subscriptions" element={<UserSubscriptions />} />
                      <Route path="account" element={<Account />} />
                      <Route
                        path="clients/:_id"
                        element={<ClientDetailsAdmin />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </ScrollToTopWrapper>
          </Router>
        </MantineProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;

// Create a wrapper component that handles scroll behavior
const ScrollToTopWrapper = ({ children }) => {
  useScrollToTop(); // Call your scroll-to-top hook here
  return <>{children}</>;
};
