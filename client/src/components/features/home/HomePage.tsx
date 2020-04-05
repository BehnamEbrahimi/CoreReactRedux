import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";

const HomePage = () => {
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
        <Header as="h2" inverted content="Welcome to CRR" />
        <Button as={Link} to="/activities" size="huge" inverted>
          Take me to the CRR!
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
