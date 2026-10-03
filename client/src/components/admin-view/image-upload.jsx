import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  // eslint-disable-next-line no-unused-vars
  uploadedImageUrl,
  // eslint-disable-next-line no-unused-vars
  setUploadedImageUrl,
  setImageLoadingState,
}) {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (setImageFile) setImageFile(selectedFile);
    console.log(selectedFile);
  }

  function handleDrageOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage(){
    setImageFile(null)
    if(inputRef.current){
      inputRef.current.value = '';
    }
  }


  console.log(imageFile);

  async function uploadImageToCloudinary(){
    setImageLoadingState(true)
    const data = new FormData()
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",data);
      console.log(response, "response")

      if(response.data?.success){
        setImageLoadingState(false)
      }

  }


  useEffect(()=>{
if(imageFile !== null) uploadImageToCloudinary(imageFile)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[imageFile])

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block ml-5">
        Upload Image
      </Label>
      <div
        onDragOver={handleDrageOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg m-5"
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
           <div className="flex items-center">
            <FileIcon className="w-8 h-8 text-primary mr-2"/>
           </div>
           <p className="text-sm font-medium ">{imageFile.name}</p>
           <button variant="ghost" size="icon" className="text-muted-foreground hover:text-muted-foreground" onClick={handleRemoveImage}>
            <XIcon className="w-4 h-4 "/>
            <span className="sr-only">
              Remove File
            </span>
           </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
