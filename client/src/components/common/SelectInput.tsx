import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

type IProps = FieldRenderProps<string, HTMLElement> & FormFieldProps;
// interface IProps
//   extends FieldRenderProps<string, HTMLElement>,
//     FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
  input: { value, onChange },
  meta: { touched, error },
  width,
  options,
  placeholder,
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <Select
        value={value}
        onChange={(e, data) => onChange(data.value)}
        placeholder={placeholder}
        options={options}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
