import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";


function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  // eslint-disable-next-line no-unused-vars
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode 
}) {
  const inputRef = useRef(null);
  console.log(isEditMode, "isEditMode")
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
        setUploadedImageUrl(response.data?.result.url)
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
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg m-5`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState ? 
          <Skeleton className=" h-10"/>:
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
