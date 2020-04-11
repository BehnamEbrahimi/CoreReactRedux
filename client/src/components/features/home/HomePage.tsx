import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import { IUser } from "../../../models/user";
import { openModal, IOpenModal } from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  openModal: IOpenModal;
  isLoggedIn: boolean;
  user: IUser | null;
}

const HomePage: React.FC<IProps> = ({ openModal, isLoggedIn, user }) => {
  const token = window.localStorage.getItem("jwt");

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          CRR
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content={`Welcome to CRR`} />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

const mapStateToProps = ({ user: { isLoggedIn, user } }: IStore) => ({
  isLoggedIn,
  user,
});

export default connect(mapStateToProps, { openModal })(HomePage);
