import api, {
  ADD_PORTFOLIO,
  CHECK_PORTFOLIO,
  DELETE_PORTFOLIO,
} from "@/apis/api";
import { IUser } from "@/types/types";
import { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface FooterActionsProps {
  user: IUser;
  isSame: boolean;
}

export const FooterActions = ({ user, isSame }: FooterActionsProps) => {
  const [showModal, setShowModal] = useState(false);

  const [all, setAll] = useState({
    customSlug: "",
    shortUrl: "",
    error: "",
    del: false,
    generated: false,
  });

  const handleShare = async () => {
    await handleCheck();
    setShowModal(true);
  };

  const handleCheck = async () => {
    try {
      const response = await api.get(CHECK_PORTFOLIO);

      if (response.status === 200) {
        setAll((prev) => ({ ...prev, del: false }));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError?.response?.status;
      if (status === 409) {
        setAll((prev) => ({ ...prev, del: true }));
      }
    }
  };

  const handleShorten = async () => {
    if (all.customSlug.length === 0) {
      setAll((prev) => ({ ...prev, error: "Enter a short URL" }));
      return;
    }

    const host = window.location.origin;

    try {
      const response = await api.post(ADD_PORTFOLIO, { url: all.customSlug });

      if (response.status === 200) {
        setAll((prev) => ({
          ...prev,
          shortUrl: `${host}/${all.customSlug}`,
          generated: true,
        }));
        toast.success("URL Generated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAll((prev) => ({
      ...prev,
      generated: false,
      error: "",
      customSlug: "",
      shortUrl: "",
      del: false,
    }));
  };

  const handlerDelete = async () => {
    try {
      const response = await api.delete(DELETE_PORTFOLIO);

      if (response.status === 200) {
        toast.success("URL deleted!");
        setAll((prev) => ({ ...prev, del: true }));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      {isSame && (
        <div className="w-[65%] mx-auto py-8 flex flex-row flex-wrap gap-4 sm:gap-6 justify-center mb-12">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share portfolio link
          </button>

          {!isSame && (
            <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M22 4l-10 8L2 4"></path>
              </svg>
              Contact me via email
            </button>
          )}

          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export in pdf
          </button>
        </div>
      )}

      {showModal &&
        (all.del ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-md">
              <h2 className="text-base sm:text-lg font-semibold mb-4">
                Previous URL:{" "}
                <a
                  target="_blank"
                  href={`${window.location.origin}/${user.portfolioURL}`}
                  className="underline"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              </h2>
              <button
                onClick={handlerDelete}
                className="bg-[#FAA21B] hover:bg-[#fa921b] text-white px-4 py-2 rounded-full cursor-pointer w-full text-sm sm:text-base transition-colors"
              >
                Delete Previous URL?
              </button>
              <button
                onClick={handleCloseModal}
                className="mt-4 sm:mt-6 text-sm cursor-pointer text-gray-500 hover:underline w-full"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-md">
              <h2
                className={`text-base sm:text-lg font-semibold mb-4 ${
                  all.generated && "hidden"
                }`}
              >
                Customize your share URL
              </h2>
              <label
                className={`block text-sm text-gray-700 mb-1 ${
                  all.generated && "hidden"
                }`}
              >
                Enter custom slug:
              </label>
              <input
                type="text"
                value={all.customSlug}
                name="customSlug"
                hidden={all.generated}
                onChange={(e) =>
                  setAll((prev) => ({
                    ...prev,
                    error: "",
                    [e.target.name]: e.target.value,
                  }))
                }
                className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                placeholder="e.g. my-portfolio"
              />
              {all.error && (
                <p className="text-red-500 text-sm mb-2">{all.error}</p>
              )}
              <button
                onClick={handleShorten}
                className={`text-white cursor-pointer px-4 py-2 rounded-full bg-[#FAA21B] hover:bg-[#fa921b] w-full text-sm sm:text-base transition-colors ${
                  all.generated && "hidden"
                }`}
              >
                Generate URL
              </button>
              {all.shortUrl && (
                <div className="mt-4 text-center">
                  <p className="text-base sm:text-xl mb-1">Shortened URL:</p>
                  <a
                    href={all.shortUrl}
                    className="underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setTimeout(() => window.location.reload(), 100); // slight delay to allow navigation
                    }}
                  >
                    {all.shortUrl}
                  </a>
                </div>
              )}
              <button
                onClick={handleCloseModal}
                className="mt-4 sm:mt-6 text-sm cursor-pointer text-gray-500 hover:underline w-full"
              >
                Close
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
