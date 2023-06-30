import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
const initialValues = {
  email: "",
  password: "",
};
const onSubmit = (data) => {
  console.log("Data", data);
};
const FormWithValidation = () => {
  <View>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {errors.email && <Text>{errors.email}</Text>}
          <TextInput
            placeholder="Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />
          {errors.password && <Text>{errors.password}</Text>}
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  </View>;
};
export default FormWithValidation;