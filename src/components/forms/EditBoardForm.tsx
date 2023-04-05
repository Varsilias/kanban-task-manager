import React, { useState } from "react";
import { FormikProvider, Form, useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/buttons/SubmitButton";
import { CancelIcon } from "../icons";
import SecondaryButton from "../buttons/SecondaryButton";
import { useBoardContext } from "../../context";
const EditBoardForm = () => {
  const { activeBoardColums, selectedBoard } = useBoardContext();
  const [initialValues, setInitialValues] = useState({
    board_name: selectedBoard.name,
    board_columns: activeBoardColums.map(({ name }) => name),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      board_name: Yup.string()
        .required("Please enter your firstname")
        .min(3, "Lastname should contain atleast 3 characters"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    touched,
    // setFieldTouched,
  } = formik;

  const addNewSubtaskField = () => {
    setInitialValues((prev) => {
      return {
        ...prev,
        board_columns: [...prev.board_columns, ""],
      };
    });
  };

  const removeSubtaskField = (id: number) => {
    const { board_columns } = initialValues;
    if (board_columns.length <= 2) return;
    const newBoardColumns = board_columns.filter((_, index) => id !== index);

    setInitialValues((prev) => {
      return {
        ...prev,
        board_columns: newBoardColumns,
      };
    });
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold text-lg mb-6 dark:text-white">
          Add New Board
        </h2>
        <div className="board_name flex flex-col mb-4">
          <label
            htmlFor="board_name"
            className="text-sm font-bold text-gray-medium pb-2 dark:text-white"
          >
            Board Name
          </label>
          <input
            type="text"
            name="board_name"
            id="board_name"
            value={values.board_name}
            onChange={handleChange}
            className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
            placeholder="e.g. Web Design"
          />
        </div>

        <div className="board_column flex flex-col mb-4">
          <label
            htmlFor="board_column"
            className="text-sm font-bold text-gray-medium pb-2 dark:text-white"
          >
            Board Columns
          </label>
          <div className="board_columns">
            <FieldArray
              name="board_columns"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {values.board_columns && values.board_columns.length > 0
                    ? values.board_columns.map((value, index) => (
                        <div key={`${index}`}>
                          <Field name={`board_columns.${index}`}>
                            {(fieldMeta: any) => {
                              //   console.log(fieldMeta);
                              return (
                                <div
                                  className="flex items-center w-full space-x-4 mb-4"
                                  key={`${index}`}
                                >
                                  <input
                                    type="text"
                                    {...fieldMeta.field}
                                    className="p-1.5 outline-none border border-[#828FA340] rounded w-[95%] text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
                                    placeholder={`e.g. Make coffee`}
                                  />
                                  <div
                                    className="w-[5%] cursor-pointer"
                                    onClick={() => removeSubtaskField(index)}
                                  >
                                    <CancelIcon />
                                  </div>
                                </div>
                              );
                            }}
                          </Field>
                        </div>
                      ))
                    : null}
                </React.Fragment>
              )}
            />
          </div>

          <SecondaryButton onClick={() => addNewSubtaskField()}>
            + Add New Column
          </SecondaryButton>
        </div>

        <SubmitButton>Save Changes</SubmitButton>
      </Form>
    </FormikProvider>
  );
};

export default EditBoardForm;
