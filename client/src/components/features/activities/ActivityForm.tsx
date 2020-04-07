import React, { useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form as FinalForm, Field } from "react-final-form";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";

import TextInput from "../../common/TextInput";
import TextAreaInput from "../../common/TextAreaInput";
import SelectInput from "../../common/SelectInput";
import { category } from "../../../constants";
import DateInput from "../../common/DateInput";
import { combineDateAndTime } from "../../../utils/combineDateAndTime";
import { IActivity, ActivityFormValues } from "../../../models/activity";
import {
  loadActivity,
  ILoadActivity,
  createActivity,
  ICreateActivity,
  editActivity,
  IEditActivity,
  clearActivity,
  IClearActivity,
} from "../../../actions";
import { IStore } from "../../../reducers";

interface IProps {
  loadActivity: ILoadActivity;
  createActivity: ICreateActivity;
  editActivity: IEditActivity;
  clearActivity: IClearActivity;
  activity: IActivity | undefined;
  submitting: boolean;
  target: string;
}

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<IProps & RouteComponentProps<DetailParams>> = ({
  loadActivity,
  createActivity,
  editActivity,
  clearActivity,
  activity,
  submitting,
  target,
  match,
}) => {
  const [formData, setFormData] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id && !activity) {
      setLoading(true);
      loadActivity(match.params.id);
    }

    if (!match.params.id) {
      setFormData(new ActivityFormValues());
    }

    // when this component is unmounted, the activity will be cleared
    return () => clearActivity();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (match.params.id && activity) {
      setLoading(false);
      setFormData(new ActivityFormValues(activity));
    }
  }, [activity, match.params.id]);

  const validate = combineValidators({
    title: isRequired({ message: "The event title is required" }),
    category: isRequired("Category"),
    description: composeValidators(
      isRequired("Description"),
      hasLengthGreaterThan(4)({
        message: "Description needs to be at least 5 characters",
      })
    )(),
    city: isRequired("City"),
    venue: isRequired("Venue"),
    date: isRequired("Date"),
    time: isRequired("Time"),
  });

  const handleFinalFormSubmit = (formData: any) => {
    const dateAndTime = combineDateAndTime(formData.date, formData.time);
    const { date, time, ...activity } = formData;
    activity.date = dateAndTime;

    if (!formData.id) {
      let newActivity = {
        ...formData,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(formData.id, formData);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={formData}
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="Description"
                  rows={3}
                  value={formData.description}
                  component={TextAreaInput}
                />
                <Field
                  name="category"
                  placeholder="Category"
                  options={category}
                  value={formData.category}
                  component={SelectInput}
                />
                <Form.Group widths="equal">
                  <Field
                    name="date"
                    date={true}
                    placeholder="Date"
                    value={formData.date}
                    component={DateInput}
                  />
                  <Field
                    name="time"
                    time={true}
                    placeholder="Time"
                    value={formData.time}
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  component={TextInput}
                />
                <Field
                  name="venue"
                  placeholder="Venue"
                  value={formData.venue}
                  component={TextInput}
                />
                <Button
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                  loading={submitting && target === "submit"}
                  disabled={loading || invalid || pristine}
                />
                <Button
                  as={Link}
                  to={
                    match.params.id
                      ? `/activities/${match.params.id}`
                      : "/activities"
                  }
                  floated="right"
                  type="button"
                  content="Cancel"
                  disabled={loading}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = ({
  activity: { activity, submitting, target },
}: IStore) => ({ activity, submitting, target });

export default connect(mapStateToProps, {
  loadActivity,
  createActivity,
  editActivity,
  clearActivity,
})(ActivityForm);
