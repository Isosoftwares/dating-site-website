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
import Payments from "./client-dashboard/Payments";
import Support from "./client-dashboard/Support";
import Clients from "./admin/Clients";
import AllPayments from "./admin/AllPayments";
import Account from "./admin/Account";
import AdminDashboard from "./admin/AdminDashboard";
import ClientDetailsAdmin from "./admin/ClientDetailsAdmin";
import PaymentIframe from "./client-dashboard/PaymentIframe";
import Contact from "./pages/Contact";
import MessagePage from "./admin/MessagePage";
import "@mantine/carousel/styles.css";
import ViewUser from "./client-dashboard/ViewUser";
import Online from "./client-dashboard/Online";
import ClientProfile from "./client-dashboard/ClientProfile";
import Messages from "./client-dashboard/Messages";
import EditProfile from "./client-dashboard/EditProfile";

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
                      <Route path="messages" element={<Messages />} />
                      <Route path="user/:_id" element={<ViewUser />} />
                    </Route>
                  </Route>

                  {/* admin dash */}
                  <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route exact path="/dashboard" element={<AdminDashboard />}>
                      <Route index element={<Clients />} />
                      <Route path="clients" element={<Clients />} />
                      <Route path="payments" element={<AllPayments />} />
                      <Route path="account" element={<Account />} />
                      <Route path="card-payment" element={<PaymentIframe />} />
                      <Route
                        path="clients/:_id"
                        element={<ClientDetailsAdmin />}
                      />
                      <Route path="message/:_id" element={<MessagePage />} />
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
