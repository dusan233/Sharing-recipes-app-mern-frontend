import React from "react";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import UserHero from "../../components/UserHero/UserHero";
import CloseAcc from "../../components/CloseAcc/CloseAcc";
import UpdateProfile from "../../components/UpdateProfile/UpdateProfile";
import UpdateAccount from "../../containers/ChangeEmailPassword/UpdateAccount";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionCreator from "../../store/index";

const UserProfile = ({
  username,
  headline,
  userId,
  token,
  deleteAcc,
  deleting,
  logout,
}) => {
  const deleteAccount = () => {
    deleteAcc(userId, token, logout);
  };

  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="user_container">
      <UserHero username={username} headline={headline} />
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Account</Tab>
          <Tab>Close account</Tab>
        </TabList>

        <TabPanel>
          <UpdateProfile userId={userId} token={token} username={username} />
        </TabPanel>
        <TabPanel>
          <UpdateAccount />
        </TabPanel>
        <TabPanel>
          <CloseAcc deleteAcc={deleteAccount} deleting={deleting} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

const mapStateToPtops = (state) => ({
  username: state.userData.username,
  headline: state.userData.headline,
  userId: state.auth.userId,
  token: state.auth.token,
  deleting: state.user.delitingAccount,
});

const mapDispatchToProps = {
  deleteAcc: actionCreator.deleteAccount,
  logout: actionCreator.Logout,
};

export default connect(mapStateToPtops, mapDispatchToProps)(UserProfile);
