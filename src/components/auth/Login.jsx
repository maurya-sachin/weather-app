import { useState } from "react";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const validateField = (field, value) => {
    let errorMessage = "";
    if (field === "email") {
      if (!value) {
        errorMessage = "Email is required.";
      } else if (!validateEmail(value)) {
        errorMessage = "Invalid email format.";
      }
    } else if (field === "password") {
      if (!value) {
        errorMessage = "Password is required.";
      } else if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters.";
      }
    }
    return errorMessage;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateFieldAndUpdateError("email", e.target.value);
    setError(""); // Clear global error on field change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validateFieldAndUpdateError("password", e.target.value);
    setError(""); // Clear global error on field change
  };

  const handleFocus = () => {
    setError(""); // Clear global error on focus
  };

  const validateFieldAndUpdateError = (field, value) => {
    const updatedError = { ...fieldError };
    updatedError[field] = validateField(field, value);
    setFieldError(updatedError);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = {
      email: validateField("email", email),
      password: validateField("password", password),
    };

    setFieldError(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      setError("Please fill out all fields correctly.");
      toast.error("Please fill out all fields correctly.");
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Logged in successfully!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-700/50 border border-white/20 dark:border-gray-700/30 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">
              <AlertCircle className="inline-block mr-2" /> {error}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              onFocus={handleFocus}
              onBlur={() => validateFieldAndUpdateError("email", email)}
              disabled={loading}
              aria-label="Email"
              aria-describedby={fieldError.email ? "email-error" : ""}
              className={`w-full rounded-lg border p-3 outline-none focus:ring-2 dark:bg-gray-800 ${
                fieldError.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-blue-500"
              }`}
            />
            {fieldError.email && (
              <p id="email-error" className="text-red-500 text-sm">
                {fieldError.email}
              </p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handleFocus}
                onBlur={() => validateFieldAndUpdateError("password", password)}
                disabled={loading}
                aria-label="Password input field"
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
              <p id="password-error" className="text-red-500 text-sm">
                {fieldError.password}
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
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
