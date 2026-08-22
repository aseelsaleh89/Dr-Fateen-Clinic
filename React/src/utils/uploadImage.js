import API from "./api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await API.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.imageUrl;
};