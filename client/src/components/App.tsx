import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';

import Navbar from './features/nav/Navbar';
import ActivityDashboard from './features/activities/ActivityDashboard';

const App: React.FC = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </Fragment>
  );
};

export default App;
