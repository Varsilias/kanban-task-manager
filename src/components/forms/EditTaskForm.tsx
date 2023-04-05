import React, { useState } from "react";
import { FormikProvider, Form, useFormik, FieldArray, Field } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/buttons/SubmitButton";
import { CancelIcon } from "../icons";
import SecondaryButton from "../buttons/SecondaryButton";
import { ArrowDownIcon } from "../icons";
import { useBoardContext } from "../../context";

interface IEditTaskProps {
  title: string;
  description: string;
  subtasks: {
    title: string;
    isCompleted: boolean;
  }[];
  status: string;
}

const EditTaskForm = ({
  title,
  description,
  subtasks,
  status,
}: IEditTaskProps) => {
  const [showStatusList, setShowStatusList] = useState(false);
  const { activeBoardColums } = useBoardContext();
  const statuses = activeBoardColums.map(({ name }) => ({ name }));

  const [initialValues, setInitialValues] = useState({
    title: title,
    description: description,
    subtasks: subtasks.map(({ title }) => title),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required("Please enter your firstname")
        .min(3, "Lastname should contain atleast 3 characters"),
      description: Yup.string()
        .required("Please enter your lastname")
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
        subtasks: [...prev.subtasks, ""],
      };
    });
  };

  const removeSubtaskField = (id: number) => {
    const { subtasks } = initialValues;
    if (subtasks.length <= 2) return;
    const newSubtaskFields = subtasks.filter((_, index) => id !== index);

    setInitialValues((prev) => {
      return {
        ...prev,
        subtasks: newSubtaskFields,
      };
    });
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold text-lg mb-6 dark:text-white">
          Edit Task
        </h2>
        <div className="title flex flex-col mb-4">
          <label
            htmlFor="title"
            className="text-sm font-bold text-gray-medium pb-2 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
            placeholder="e.g Take coffee break"
          />
        </div>

        <div className="description flex flex-col mb-4">
          <label
            htmlFor="description"
            className="text-sm font-bold text-gray-medium pb-2 dark:text-white"
          >
            Description
          </label>
          <textarea
            rows={5}
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            className="p-1.5 outline-none resize-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          ></textarea>
        </div>

        <div className="subtask flex flex-col mb-4">
          <label
            htmlFor="subtask"
            className="text-sm font-bold text-gray-medium pb-2 dark:text-white"
          >
            Subtasks
          </label>
          <div className="subtasks">
            <FieldArray
              name="subtasks"
              render={(arrayHelpers) => (
                <React.Fragment>
                  {values.subtasks && values.subtasks.length > 0
                    ? values.subtasks.map((value, index) => (
                        <div key={`${index}`}>
                          <Field name={`subtasks.${index}`}>
                            {(fieldMeta: any) => (
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
                            )}
                          </Field>
                        </div>
                      ))
                    : null}
                </React.Fragment>
              )}
            />
          </div>

          <SecondaryButton onClick={() => addNewSubtaskField()}>
            + Add New Subtask
          </SecondaryButton>
        </div>

        <div className="status relative mb-4 mt-4">
          <h3 className="text-sm font-bold text-gray-medium dark:text-white mb-1">
            Current Status
          </h3>
          <div className="py-2 px-3 border border-purple-primary rounded dark:text-white text-[13px]">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusList(!showStatusList);
              }}
            >
              <p>
                {statuses.find(({ name }) => name === status)?.name ||
                  statuses[0].name}
              </p>
              <div>
                <ArrowDownIcon />
              </div>
            </div>
          </div>

          {showStatusList && (
            <div className="absolute bg-white dark:bg-gray-very-dark w-full p-3 drop-shadow text-gray-medium text-[13px] rounded overflow-y-auto">
              {statuses.map(({ name }) => (
                <li key={name} className="p-1 list-none">
                  {name}
                </li>
              ))}
            </div>
          )}
        </div>

        <SubmitButton>Create Task</SubmitButton>
      </Form>
    </FormikProvider>
  );
};

export default EditTaskForm;
