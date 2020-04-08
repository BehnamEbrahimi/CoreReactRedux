import React from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";

import { IUser } from "../../../models/user";
import { logout, ILogout } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  logout: ILogout;
  user: IUser | null;
}

const Navbar: React.FC<IProps> = ({ logout, user }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
          CRR
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logout} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

const mapStateToProps = ({ user: { user } }: IStore) => ({ user });

export default connect(mapStateToProps, { logout })(Navbar);
