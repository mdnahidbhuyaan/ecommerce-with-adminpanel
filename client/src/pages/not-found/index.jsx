import { Button } from "@base-ui/react";

function NotFound() {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-200 h-100 bg-blue-50 items-center text-center shadow-md rounded-md">
          <h1 className="text-3xl font-bold text-center items-center mt-20">Please go to login</h1>
          <Button veriant="default" size="icon" className="bg-blue-500 py-2 px-4 rounded-full mt-4 text-white font-bold shadow-md">
            Login
          </Button>
          <button > </button>
        </div>
      </div>
    );
}

export default NotFound;