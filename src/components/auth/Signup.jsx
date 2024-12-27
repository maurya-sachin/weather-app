import { useState } from "react";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../../supabase";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value) {
          errorMessage = `${
            field === "firstName" ? "First" : "Last"
          } name is required.`;
        } else if (value.length < 3) {
          errorMessage = `${
            field === "firstName" ? "First" : "Last"
          } name must be at least 3 characters.`;
        }
        break;
      case "email":
        if (!value) {
          errorMessage = "Email is required.";
        } else if (!validateEmail(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
      case "password":
        if (!value) {
          errorMessage = "Password is required.";
        } else if (value.length < 6) {
          errorMessage = "Password must be at least 6 characters.";
        }
        break;
      case "confirmPassword":
        if (!value) {
          errorMessage = "Confirm password is required.";
        } else if (value !== formData.password) {
          errorMessage = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldError({ ...fieldError, [name]: validateField(name, value) });
  };

  const handleBlur = (field) => {
    setFieldError((prevErrors) => ({
      ...prevErrors,
      [field]: validateField(field, formData[field]),
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = {
      firstName: validateField("firstName", formData.firstName),
      lastName: validateField("lastName", formData.lastName),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    setFieldError(validationErrors);

    if (Object.values(validationErrors).some((err) => err)) {
      setError("Please fill out all fields correctly.");
      toast.error("Please fill out all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      // Call Supabase's signUp method
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            displayName: `${formData.firstName} ${formData.lastName}`, // Optional full name
          },
        },
      });
      setLoading(false);

      if (error) {
        console.error("Supabase SignUp Error:", error.message);
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      } else {
        console.log("Supabase SignUp Success:", data);
        toast.success("Signed up successfully!");
        navigate("/"); // Redirect to dashboard  sign-up
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // Initiate Google sign-up with Supabase
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        console.log("Google sign-up success:", user);
        toast.success("Signed up successfully with Google!");
        navigate("/"); // Redirect to dashboard  sign-up
      }
    } catch (err) {
      console.error("Error during Google sign-up:", err);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-700/50 border border-white/20 dark:border-gray-700/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
              <AlertCircle className="inline-block mr-2" /> {error}
            </div>
          )}
          <div className="flex gap-4">
            <div className="w-full">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                onFocus={() => handleBlur("firstName")}
                aria-label="First Name"
                disabled={loading}
                className={`w-full rounded-lg border p-3 outline-none focus:ring-2 dark:bg-gray-800 ${
                  fieldError.firstName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
                }`}
              />
              {fieldError.firstName && (
                <p className="text-red-500 text-sm">{fieldError.firstName}</p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                onFocus={() => handleBlur("lastName")}
                aria-label="Last Name"
                disabled={loading}
                className={`w-full rounded-lg border p-3 outline-none focus:ring-2 dark:bg-gray-800 ${
                  fieldError.lastName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
                }`}
              />
              {fieldError.lastName && (
                <p className="text-red-500 text-sm">{fieldError.lastName}</p>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleBlur("email")}
              aria-label="Email"
              disabled={loading}
              className={`w-full rounded-lg border p-3 outline-none focus:ring-2 dark:bg-gray-800 ${
                fieldError.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
              }`}
            />
            {fieldError.email && (
              <p className="text-red-500 text-sm">{fieldError.email}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleBlur("password")}
                aria-label="Password"
                disabled={loading}
                className={`w-full rounded-lg border p-3 pr-10 outline-none focus:ring-2 dark:bg-gray-800 ${
                  fieldError.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldError.password && (
              <p className="text-red-500 text-sm">{fieldError.password}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleBlur("confirmPassword")}
                aria-label="Confirm Password"
                disabled={loading}
                className={`w-full rounded-lg border p-3 pr-10 outline-none focus:ring-2 dark:bg-gray-800 ${
                  fieldError.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {fieldError.confirmPassword && (
              <p className="text-red-500 text-sm">
                {fieldError.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full rounded-lg p-3 bg-red-600 text-white flex items-center justify-center space-x-2 hover:bg-red-700 disabled:bg-red-300 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <span>Signing up with Google...</span>
              </div>
            ) : (
              <>
                <FaGoogle size={20} /> {/* Use the Google icon here */}
                <span>Sign Up with Google</span>
              </>
            )}
          </button>
        </form>
        <div>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
