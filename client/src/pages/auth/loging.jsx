import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { toast } from "@/components/ui/use-toast";


const initialState = {

  email: "",
  password: "",
};
function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  function onSubmiit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then(data=>{
      if(data?.payload?.success){
        toast.add({
          title: data?.payload?.message,
        })
      }else{
           toast.add({
             title: data?.payload?.message,
             variant: "destructive",
           });
      }
    })
  }

  return (
    
<div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/50 sm:p-8">
  {/* Header */}
  <div className="mb-8 text-center">
    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 shadow-lg shadow-blue-200">
      <span className="text-2xl font-bold text-white">W</span>
    </div>

    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
      Welcome Back!
    </h1>

    <p className="mt-3 text-sm leading-6 text-gray-500">
      Sign in to continue your shopping journey.
    </p>

    <p className="mt-5 text-sm text-gray-600">
      Don't have an account?
      <Link
        className="ml-2 font-semibold text-blue-600 transition-colors hover:text-violet-600 hover:underline"
        to="/auth/register"
      >
        Create Account
      </Link>
    </p>
  </div>

  {/* Login Form */}
  <CommonForm
    formControls={loginFormControls}
    buttonText={"Sign In"}
    formData={formData}
    setFromData={setFormData}
    onSubmit={onSubmiit}
  />

  {/* Footer */}
  <p className="mt-6 text-center text-xs text-gray-400">
    Secure login · Your shopping starts here
  </p>
</div>
  )
;
}

export default AuthLogin;
