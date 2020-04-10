import React from "react";
import { Tab } from "semantic-ui-react";

import ProfilePhotos from "./ProfilePhotos";
import ProfileDescription from "./ProfileDescription";
import ProfileFollows from "./ProfileFollows";
import { ILoadFollows, ISetActiveTab } from "../../../actions";

interface IProps {
  loadFollows: ILoadFollows;
  setActiveTab: ISetActiveTab;
}

const panes = [
  { menuItem: "About", render: () => <ProfileDescription /> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Activities",
    render: () => <Tab.Pane>Activities content</Tab.Pane>,
  },
  { menuItem: "Followers", render: () => <ProfileFollows /> },
  { menuItem: "Following", render: () => <ProfileFollows /> },
];

const ProfileContent: React.FC<IProps> = ({ loadFollows, setActiveTab }) => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => {
        switch (data.activeIndex) {
          case 3:
            setActiveTab("followers");
            loadFollows("followers");
            break;
          case 4:
            setActiveTab("followings");
            loadFollows("followings");
            break;
          default:
        }
      }}
    />
  );
};

export default ProfileContent;
