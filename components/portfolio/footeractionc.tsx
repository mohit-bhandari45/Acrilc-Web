import api, {
  ADD_PORTFOLIO,
  CHECK_PORTFOLIO,
  DELETE_PORTFOLIO,
} from "@/apis/api";
import { IUser } from "@/store/types";
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
        setAll((prev) => {
          return { ...prev, del: false };
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError?.response?.status;
      if (status === 409) {
        setAll((prev) => {
          return { ...prev, del: true };
        });
      }
    }
  };

  const handleShorten = async () => {
    if (all.customSlug.length === 0) {
      setAll((prev) => {
        return { ...prev, error: "Enter a shorturl" };
      });
      return;
    }

    const host = window.location.origin;

    try {
      const response = await api.post(ADD_PORTFOLIO, { url: all.customSlug });

      if (response.status === 200) {
        setAll((prev) => {
          return { ...prev, shortUrl: `${host}/${all.customSlug}` };
        });
        console.log(response.data.data);
        setAll((prev) => {
          return { ...prev, generated: true };
        });
        toast.success("URL Generated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAll((prev) => {
      return {
        ...prev,
        generated: false,
        error: "",
        customSlug: "",
        shortUrl: "",
        del: false,
      };
    });
  };

  const handlerDelete = async () => {
    try {
      const response = await api.delete(DELETE_PORTFOLIO);

      if (response.status === 200) {
        toast.success("URL deleted!");
        setAll((prev) => {
          return { ...prev, del: true };
        });
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
        <div className="w-[65%] mx-auto py-8 flex flex-wrap gap-20 mb-20 justify-center">
          <button
            onClick={handleShare}
            className="flex cursor-pointer items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <button
              // onClick={handleContact}
              className="flex items-center cursor-pointer gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <button
            // onClick={handleExport}
            className="flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        (all.del === true ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h2 className={`text-lg font-semibold mb-4`}>
                Previous URL:{" "}
                <a
                  target="_blank"
                  href={`${window.location.origin}/${user.portfolioURL}`}
                >
                  Link
                </a>
              </h2>
              <button
                onClick={handlerDelete}
                className={`bg-orange-400 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-orange-500 w-full`}
              >
                Delete Previous URL?
              </button>

              <button
                onClick={handleCloseModal}
                className="mt-6 text-sm cursor-pointer text-gray-500 hover:underline w-full"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
              <h2
                className={`text-lg font-semibold mb-4 ${
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
                onChange={(e) => {
                  setAll((prev) => ({
                    ...prev,
                    error: "",
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. my-portfolio"
              />
              {all.error && (
                <p className="text-red-500 text-sm mb-2">{all.error}</p>
              )}

              <button
                onClick={handleShorten}
                className={`bg-orange-400 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-orange-500 w-full ${
                  all.generated && "hidden"
                }`}
              >
                Generate URL
              </button>

              {all.shortUrl && (
                <div className="mt-4 text-center">
                  <p className="text-xl mb-1">Shortened URL:</p>
                  <a
                    href={all.shortUrl}
                    className="underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {all.shortUrl}
                  </a>
                </div>
              )}

              <button
                onClick={handleCloseModal}
                className="mt-6 text-sm cursor-pointer text-gray-500 hover:underline w-full"
              >
                Close
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
