import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = FieldRenderProps<string, HTMLElement> & FormFieldProps;
// interface IProps
//   extends FieldRenderProps<string, HTMLElement>,
//     FormFieldProps {}

const TextAreaInput: React.FC<IProps> = ({
  input, //rff
  meta: { touched, error }, //rff
  width, //sui
  rows,
  placeholder,
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextAreaInput;
