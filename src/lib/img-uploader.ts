export const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lxphac3w");
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
    return result;
  } catch (error) {
    if (error) {
      console.log("Internal server error while uploading picture");
    }
  }
};
