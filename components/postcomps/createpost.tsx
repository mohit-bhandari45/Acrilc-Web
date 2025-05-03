"use client";

import api, { CREATE_POST } from "@/apis/api";
import { useAppSelector } from "@/store/hooks";
import { Upload, X } from "lucide-react";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const CreatePost = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [size, setSize] = useState("");
  const [collection, setCollection] = useState("");
  const [forte, setForte] = useState("");
  const [keywords, setKeywords] = useState("");
  const fileInputRef = useRef(null);
  const MAX_IMAGES = 5;

  if (!user) {
    return null;
  }

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    const newPreviews = [...previews];

    Array.from(files).forEach((file) => {
      if (newImages.length < MAX_IMAGES) {
        newImages.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    // Handle form submission here

    setLoader(true);
    const formData = new FormData();

    // Appending images
    images.forEach((image) => {
      formData.append("media", image);
    });

    formData.append("title", title);
    formData.append("story", story);
    formData.append("size", size);
    formData.append("collectionId", collection);
    formData.append("forte", forte);

    // Convert array or string to comma-separated string (backend will normalize)
    formData.append("hashTags", keywords); // Or transform if array: keywords.join(',')

    try {
      const response = await api.post(CREATE_POST, formData);

      if (response.status === 200) {
        router.push(`/post/${response.data.data._id}`);
      }
    } catch (error: Error) {
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 my-13">
      <h1 className="text-4xl font-bold mb-6 text-center">New Post</h1>

      <div>
        <div className="mb-6">
          <div className="flex mb-2">
            <select
              className="px-1 py-2 cursor-pointer border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="Post"
            >
              <option>Post</option>
              <option>Story Board</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative h-32 border rounded-md overflow-hidden"
              >
                <img
                  src={preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {images.length < MAX_IMAGES && (
              <div
                onClick={triggerFileInput}
                className="h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                <Upload className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload Image</p>
                <p className="text-xs text-gray-400">
                  {images.length}/{MAX_IMAGES}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right text-xs text-gray-500">0/100</div>
        </div>

        {/* Story of the Art */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Story of the Art
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right text-xs text-gray-500">0/100</div>
        </div>

        {/* Size */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size (inches,cm,ft)
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add to Collection */}
        {/* <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Add to Collection
          </label>
          <div className="relative">
            <select
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">Collections</option>
              <option value="collection1">Collection 1</option>
              <option value="collection2">Collection 2</option>
            </select>
          </div>
        </div> */}

        {/* Forte */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Forte
          </label>
          <div className="relative">
            <select
              value={forte}
              onChange={(e) => setForte(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {user.preferences?.map((forte, idx) => {
                return (
                  <option key={idx} value={forte}>
                    {forte}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Key Words */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Words
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Separate with commas"
          />
        </div>

        {/* Publish Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-yellow-500 flex justify-center items-center text-white rounded-md hover:bg-yellow-600 cursor-pointer transition-colors"
        >
          <div>{loader ? "Publishing..." : "Publish"}</div>
          {loader && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
