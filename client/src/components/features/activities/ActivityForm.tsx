import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { IActivity } from '../../../models/activity';
import {
  setEditMode,
  createActivity,
  editActivity,
  ISetEditMode,
  ICreateActivity,
  IEditActivity
} from '../../../actions';
import { IStore } from '../../../reducers';

interface IProps {
  initialFormState: IActivity | undefined;
  submitting: boolean;
  target: string;
  setEditMode: ISetEditMode;
  createActivity: ICreateActivity;
  editActivity: IEditActivity;
}

const ActivityForm: React.FC<IProps> = ({
  initialFormState,
  submitting,
  target,
  setEditMode,
  createActivity,
  editActivity
}) => {
  const initializeForm = (): IActivity => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm());

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity);
    } else {
      editActivity(activity.id, activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={submitting && target === 'submit'}
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

const mapStateToProps = ({
  activity: { selectedActivity, submitting, target }
}: IStore): {
  initialFormState: IActivity | undefined;
  submitting: boolean;
  target: string;
} => {
  return { initialFormState: selectedActivity, submitting, target };
};

export default connect(mapStateToProps, {
  setEditMode,
  createActivity,
  editActivity
})(ActivityForm);
