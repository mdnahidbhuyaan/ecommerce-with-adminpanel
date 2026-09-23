import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link, } from "react-router-dom";
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

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const {toast} = useToast()


function onSubmiit(event) {
 event.preventDefault()
 dispatch(registerUser(formData)).then((data)=>{
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
 })
  }
  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline "
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign up"}
        formData={formData}
        setFromData={setFormData}
        onSubmit={onSubmiit}
      />
    </div>
  );
}

export default AuthRegister;
