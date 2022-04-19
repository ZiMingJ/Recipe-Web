import React from "react";

import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

import { useAuthToken } from "../components/AuthTokenContext";

const NewRecipe = () => {
  const { accessToken } = useAuthToken();
  const navigate = useNavigate();

  return (
    <>
      <h1>New Recipe</h1>
      <Formik
        initialValues={{ title: "", body: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            (errors as any).title = "Required";
          }
          if (!values.body) {
            (errors as any).body = "Required";
          }
          return errors;
        }}
        onSubmit={(values: any, { setSubmitting }) => {
          setTimeout(() => {
            axios
              .post(`${process.env.REACT_APP_API_BASE_URL}/recipes/`, values, {
                headers: { Authorization: `Bearer ${accessToken}` },
              })
              .then((res) => {
                alert("Success");
                setSubmitting(false);
                navigate("/recipe/" + (res.data as any).id);
              })
              .catch((err) => console.log(err));
          }, 200);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              width: 400,
              borderWidth: 3,
            }}
          >
            <label htmlFor="title">Title:</label>
            <Field
              style={{ borderWidth: 3, borderColor: "#333" }}
              name="title"
              id="title"
            />
            <ErrorMessage name="title" component="div" />

            <label htmlFor="body">Body:</label>
            <Field
              style={{ borderWidth: 3, borderColor: "#333" }}
              name="body"
              id="body"
            />
            <ErrorMessage name="body" component="div" />

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default NewRecipe;
