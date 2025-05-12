"use client";

import api, { CREATE_POST, CREATE_STORYBOARD, UPDATE_POST } from "@/apis/api";
import { useAppSelector } from "@/store/hooks";
import { Upload, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useRef, useState } from "react";
import checkContent from "./utils";
import toast from "react-hot-toast";
import Image from "next/image";
import { IPost } from "@/types/types";
import { Button } from "../ui/button";

interface CreateContentProps {
  isCreate: boolean;
  data?: IPost;
  type: string | null;
  setType: React.Dispatch<SetStateAction<string | null>>;
  setEdit?: React.Dispatch<SetStateAction<boolean>>;
}

const CreateContent = ({
  type,
  setType,
  isCreate,
  data,
  setEdit,
}: CreateContentProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const user = useAppSelector((state) => state.user.user)!;
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 5;

  /*Content */
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  // const [collection, setCollection] = useState("");
  const [forte, setForte] = useState<string>("");
  const [keywords, setKeywords] = useState("");
  /*Content */

  useEffect(() => {
    if (user?.preferences?.length) {
      setForte(user.preferences[0]);
    }
  }, [user.preferences]);

  useEffect(() => {
    if (!isCreate) {
      if (type === "post" && data) {
        setImages(data.media as unknown as File[]);
        const previewUrls = data.media.map((m) => m.url); // assuming `m.url` is already a string
        setPreviews(previewUrls!);
        setTitle(data.title);
        setDescription(data.story);
        setSize(data.size);
        setForte(data.forte);
      }
    }
  }, [data, isCreate, type]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const removeImage = (index: number) => {
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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // checks
    const result = checkContent(
      type!,
      title,
      description,
      size,
      // collection,
      forte,
      keywords,
      images
    );
    if (result.status === false) {
      toast.error(result.msg);
      return;
    }

    setLoader(true);
    const formData = new FormData();

    // Appending images
    images.forEach(async (image) => {
      // if (image.url) {
      //   const res = await fetch(image.url);
      //   const blob = await res.blob();
      //   const f = new File([blob], `${idx}/${blob.type.split("/")[1]}`, {
      //     type: blob.type,
      //   });
      //   formData.append("media", f);
      // } else {
      formData.append("media", image);
      // }
    });

    console.log(formData.get("media"));

    if (type === "post") {
      formData.append("size", size);
      // formData.append("collectionId", collection);
      formData.append("forte", forte);
      formData.append("story", description);
    } else {
      formData.append("description", description);
    }

    formData.append("title", title);
    formData.append("hashTags", keywords); // Or transform if array: keywords.join(',')

    if (!isCreate) {
      try {
        let response;
        if (type === "post") {
          response = await api.patch(`${UPDATE_POST}/${data!._id}`, formData);
        } else {
          response = await api.patch(CREATE_STORYBOARD, formData);
        }

        if (response.status === 200) {
          const message =
            type === "post" ? "Post Updated!" : "Storyboard Updated!";
          if (type === "post") {
            // window.location.reload();
          } else {
            router.push(`/profile`);
          }
          toast.success(message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
      setLoader(false);

      return;
    }

    try {
      let response;
      if (type === "post") {
        response = await api.post(CREATE_POST, formData);
      } else {
        response = await api.post(CREATE_STORYBOARD, formData);
      }

      const id = response.data.data._id;

      if (response.status === 200) {
        const message =
          type === "post" ? "Post Created!" : "Storyboard Created!";
        if (type === "post") {
          router.push(`/content/${id}`);
        } else {
          router.push(`/profile`);
        }
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoader(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);

    const params = new URLSearchParams(searchParams);
    params.set("type", e.target.value);
    router.replace(`/content/create?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 my-13">
      <h1 className="text-4xl font-bold mb-6 text-center">New Post</h1>

      <div>
        <div className="mb-6">
          <div className="flex mb-2">
            <select
              className="px-1 py-2 cursor-pointer border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={type!}
              onChange={handleChange}
            >
              <option value="post">Post</option>
              <option value="storyboard">Storyboard</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div className="grid grid-cols-3 gap-3">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative h-32 border rounded-md overflow-hidden"
              >
                <Image
                  src={preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
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
            placeholder="Enter Your Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-right text-xs text-gray-500">
            <span className={`${title.length > 100 && "text-red-500"}`}>
              {title.length}
            </span>
            /100
          </div>
        </div>

        {/* Story of the Art */}
        {type === "post" ? (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Story of the Art
            </label>
            <textarea
              placeholder="Enter Your Story"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right text-xs text-gray-500">
              <span className={`${description.length > 200 && "text-red-500"}`}>
                {description.length}
              </span>
              /200
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-right text-xs text-gray-500">0/1000</div>
          </div>
        )}

        {/* Size */}
        {type === "post" && (
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
        )}

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
        {type === "post" && (
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
                {user!.preferences?.map((forte: string, idx: number) => {
                  return (
                    <option key={idx} value={forte}>
                      {forte}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

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

        {/* Cancel button */}
        {!isCreate && (
          <button
            onClick={() => {
              if (setEdit) {
                setEdit(false);
              }
            }} // or any custom cancel logic
            className="w-full mb-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}
        {isCreate && (
          <button
            onClick={() => {
              router.push("/profile")
            }} // or any custom cancel logic
            className="w-full mb-3 py-2 bg-gray-200 cursor-pointer text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}

        {/* Publish Button */}
        <Button
          onClick={handleSubmit}
          disabled={loader}
          variant={"outline"}
          className={`
    w-full py-3 gap-3 flex justify-center cursor-pointer items-center text-white rounded-md transition-colors bg-[#FAA21B] hover:bg-[#fa921b]
  `}
        >
          <div>
            {isCreate
              ? loader
                ? "Publishing..."
                : "Publish"
              : loader
              ? "Saving..."
              : "Save Changes"}
          </div>

          {loader && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateContent;
