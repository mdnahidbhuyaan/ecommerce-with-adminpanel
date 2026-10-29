import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
const initialState = {
  userName: "",
  email: "",
  password: "",
};
function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {toast} = useToast()

  function onSubmiit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.add({
          title: "Registration Successful",
          description: "Your account has been created successfully.",
          type: "success",
        });
        navigate("/auth/login");
      } else {
        toast.add({
          //  title: "Registration UnSuccessful",
          variant: "destructive",
          description: data?.payload?.message,
          type: "success",
        });
      }
    });
  }
  console.log(formData);

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/50 sm:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-200">
          <span className="text-2xl font-bold text-white">W</span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Create Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Join us and discover your favorite products.
        </p>

        <p className="mt-5 text-sm text-gray-600">
          Already have an account?
          <Link
            className="ml-2 font-semibold text-violet-600 transition-colors hover:text-blue-600 hover:underline"
            to="/auth/login"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Register Form */}
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Create Account"}
        formData={formData}
        setFromData={setFormData}
        onSubmit={onSubmiit}
      />

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-400">
        Create your account and start shopping today.
      </p>
    </div>
  );
}

export default AuthRegister;
