import { useRef, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { FormikProvider, Form, useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "../../components/buttons/SubmitButton";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const SignUp = () => {
  const passwordInputRef = useRef({} as any);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowPassword(!showPassword);
    console.log(passwordInputRef.current.type);
    passwordInputRef.current.type = showPassword ? "text" : "password";
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required("Please enter your firstname")
        .min(3, "Lastname should contain atleast 3 characters"),
      lastname: Yup.string()
        .required("Please enter your lastname")
        .min(3, "Lastname should contain atleast 3 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please provide a valid email"),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 1 uppercase letter, lowercase letter, number and 1 special character"
        )
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
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
  return (
    <AuthLayout>
      <div className="flex justify-center bg-white dark:bg-gray-very-dark px-4 py-12 rounded-md md:mx-[400px]">
        <div className="w-full md:w-2/3">
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <h2 className="text-black font-bold text-lg mb-6 dark:text-white">
                Sign Up
              </h2>
              <div className="firstname flex flex-col mb-4">
                <label
                  htmlFor="firstname"
                  className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  value={values.firstname}
                  onChange={handleChange}
                  className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-very-dark"
                />
              </div>

              <div className="lastname flex flex-col mb-4">
                <label
                  htmlFor="lastname"
                  className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-very-dark"
                />
              </div>

              <div className="email flex flex-col mb-4">
                <label
                  htmlFor="email"
                  className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="daniel@example.com"
                  className="p-1.5 outline-none border border-[#828FA340] rounded text-sm dark:text-white dark:bg-gray-very-dark"
                />
              </div>

              <div className="password flex flex-col mb-8">
                <label
                  htmlFor="password"
                  className="text-sm text-bold text-gray-medium pb-2 dark:text-white"
                >
                  Password
                </label>
                <div className="flex justify-between items-center border border-[#828FA340] rounded">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={passwordInputRef}
                    value={values.password}
                    onChange={handleChange}
                    placeholder="************"
                    className="p-1.5 outline-none text-sm dark:text-white dark:bg-gray-very-dark"
                  />
                  {showPassword ? (
                    <MdOutlineVisibilityOff
                      size={20}
                      className="mr-1 dark:text-white"
                      onClick={(e) => togglePasswordVisibility(e)}
                    />
                  ) : (
                    <MdOutlineVisibility
                      size={20}
                      className="mr-1 dark:text-white"
                      onClick={(e) => togglePasswordVisibility(e)}
                    />
                  )}
                </div>
              </div>
              <SubmitButton>Sign Up</SubmitButton>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
