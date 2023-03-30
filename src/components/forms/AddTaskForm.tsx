import { useRef, useState } from "react";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/buttons/SubmitButton";
import { CancelIcon } from "../icons";
import SecondaryButton from "../buttons/SecondaryButton";

const AddTaskForm = () => {
  const [counter, setCounter] = useState(1);
  const [subtaskFields, setSubTaskFields] = useState([
    { name: `subtask_0`, value: "", placeholder: "e.g. Make coffee" },
    {
      name: `subtask_1`,
      value: "",
      placeholder: "e.g. Drink coffee & smile",
    },
  ]);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    subtasks: [...subtaskFields.map(({ value }) => value)],
  });

  //   const initialValues = {
  //     title: "",
  //     description: "",
  //     subtasks: [...subtaskFields.map(({ value }) => ({ value }))],
  //   }

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
    onSubmit: (values) => {},
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
    setSubTaskFields((prev) => [
      ...prev,
      {
        name: `subtask_${counter + 1}`,
        value: "",
        placeholder: `${
          (counter + 1) % 2 === 0
            ? "e.g. Make coffee"
            : "e.g. Drink coffee & smile"
        }`,
      },
    ]);

    setInitialValues(({ description, title, subtasks }) => ({
      title,
      description,
      subtasks: [...subtasks, ""],
    }));

    setCounter(counter + 1);
  };

  const removeSubtaskField = (id: number) => {
    const { subtasks } = initialValues;

    const newSubtaskField = subtaskFields.filter((_, index) => {
      return index !== id;
    });

    const newSubtasks = subtasks.filter((_, index) => {
      return index !== id;
    });

    setSubTaskFields(newSubtaskField);
    setInitialValues(({ description, title }) => ({
      title,
      description,
      subtasks: [...newSubtasks],
    }));
  };

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black font-bold text-lg mb-6 dark:text-white">
          Add New Task
        </h2>
        <div className="title flex flex-col mb-4">
          <label
            htmlFor="title"
            className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
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
            className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
          >
            Description
          </label>
          <textarea
            rows={5}
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          ></textarea>
        </div>

        <div className="description flex flex-col mb-4">
          <label
            htmlFor="description"
            className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
          >
            Subtasks
          </label>
          <div className="subtasks">
            {subtaskFields.map(({ name, placeholder }, index) => (
              <div
                className="flex items-center w-full space-x-4 mb-4"
                key={`${name}-${placeholder}`}
              >
                <input
                  type="text"
                  name={name}
                  id={name}
                  value={values.subtasks[index]}
                  onChange={handleChange}
                  className="p-1.5 outline-none border border-[#828FA340] rounded w-[95%] text-sm dark:text-white dark:bg-gray-dark placeholder:text-xs"
                  placeholder={placeholder}
                />
                <div
                  className="w-[5%] cursor-pointer"
                  onClick={() => removeSubtaskField(index)}
                >
                  <CancelIcon />
                </div>
              </div>
            ))}
          </div>

          <SecondaryButton onClick={() => addNewSubtaskField()}>
            + Add New Subtask
          </SecondaryButton>
        </div>

        <SubmitButton>Create Task</SubmitButton>
      </Form>
    </FormikProvider>
  );
};

export default AddTaskForm;
