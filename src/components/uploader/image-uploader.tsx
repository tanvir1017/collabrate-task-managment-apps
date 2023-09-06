import { Cloud } from "lucide-react";
import Image from "next/legacy/image";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ImageUpload = ({ pictureURL, setPictureURL, photo__URL }: any) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e: any) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "rtuxyq2m");
    formData.append("cloud_name", "djbcnjkin");
    try {
      const res = await window.fetch(
        `https://api.cloudinary.com/v1_1/djbcnjkin/image/upload`,
        {
          method: "post",
          body: formData,
        }
      );
      const result = await res.json();
      console.log("result", result.url);
    } catch (error) {
      if (error) {
        setLoading(false);
        console.log("Internal server error while uploading picture");
      }
    }
  };
  return (
    <>
      <div className="w-[145px] h-[144px] border-2 rounded-full m-auto relative overflow-hidden">
        {loading ? (
          <Image
            className="absolute"
            src="/icons/loader.svg"
            alt="user-avatar"
            layout="fill"
            objectFit="cover"
            priority
          />
        ) : (
          <Image
            className="absolute"
            src={!pictureURL ? photo__URL : pictureURL}
            alt="user-avatar"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
        <div
          className="rounded-full absolute top-[100%] hover:top-[50%] transition-all
              duration-300 opacity-0 hover:opacity-100  left-[50%] -translate-x-[50%] -translate-y-[50%]"
        >
          <label className="absolute transition duration-200 p-4 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full backdrop-blur-sm bg-white/5 border-2 border-white/30">
            <Cloud className="text-[var(--red-primary-brand-color)]" />{" "}
          </label>
          <input
            className="scale-150 p-8 opacity-0 cursor-pointer top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute"
            required={true}
            type="file"
            onChange={uploadImage}
          />
        </div>
      </div>
    </>
  );
};
export default ImageUpload;
