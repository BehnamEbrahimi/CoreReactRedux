import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { DateTimePicker } from "react-widgets";

type IProps = FieldRenderProps<Date, HTMLElement> & FormFieldProps;
// interface IProps
//   extends FieldRenderProps<Date, HTMLElement>,
//     FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input: { value, onChange, onBlur }, //rff
  meta: { touched, error }, //rff
  width, //sui
  date = false, //rw
  time = false, //rw
  placeholder,
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DateTimePicker
        placeholder={placeholder}
        value={value || null}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={(e) => e.preventDefault()}
        date={date}
        time={time}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
