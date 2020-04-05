import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = FieldRenderProps<string, HTMLElement> & FormFieldProps;
// Equivalently:
// interface IProps
//   extends FieldRenderProps<string, HTMLElement>,
//     FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input, //rff -> {name:"..", onBlur:()=>{}, onChange: ()=>{}, onFocus:()=>{}, ...}
  meta: { touched, error }, //rff
  width, //sui
  type, //sui
  placeholder,
}) => {
  return (
    <Form.Field
      error={touched && !!error} //!! in JS returns true if truthy and false if falsy (0, null, undefined)
      type={type}
      width={width}
    >
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
