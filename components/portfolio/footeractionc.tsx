import api, { ADD_PORTFOLIO, CHECK_PORTFOLIO, DELETE_PORTFOLIO } from "@/apis/api";
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
  const [all, setAll] = useState({ customSlug: "", shortUrl: "", error: "", del: false, generated: false });

  const handleShare = async () => {
    try {
      await api.get(CHECK_PORTFOLIO);
      setAll(prev => ({ ...prev, del: false }));
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 409) {
        setAll(prev => ({ ...prev, del: true }));
      }
    }
    setShowModal(true);
  };

  const handleShorten = async () => {
    if (!all.customSlug) { setAll(prev => ({ ...prev, error: "Please enter a custom slug" })); return; }
    try {
      const res = await api.post(ADD_PORTFOLIO, { url: all.customSlug });
      if (res.status === 200) {
        setAll(prev => ({ ...prev, shortUrl: `${window.location.origin}/${all.customSlug}`, generated: true }));
        toast.success("URL Generated");
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(DELETE_PORTFOLIO);
      if (res.status === 200) { toast.success("URL deleted!"); setAll(prev => ({ ...prev, del: true })); setShowModal(false); }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setAll({ customSlug: "", shortUrl: "", error: "", del: false, generated: false });
  };

  if (!isSame) return null;

  return (
    <>
      <div className="py-12 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-200 cursor-pointer"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share Portfolio Link
          </button>

          <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 bg-white text-gray-700 text-sm font-medium rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-200 cursor-pointer">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export as PDF
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-2xl p-7 w-full max-w-md shadow-2xl">
            {all.del ? (
              <>
                <h2 className="font-serif text-xl text-gray-900 mb-2">Existing Portfolio URL</h2>
                <p className="text-sm text-gray-500 mb-5">You already have a custom portfolio URL.</p>
                <a
                  href={`${window.location.origin}/${user.portfolioURL}`}
                  target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-blue-600 underline mb-6 truncate"
                >
                  {window.location.origin}/{user.portfolioURL}
                </a>
                <button onClick={handleDelete}
                  className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition cursor-pointer mb-3">
                  Delete & Create New
                </button>
                <button onClick={closeModal} className="w-full py-2 text-sm text-gray-400 hover:text-gray-700 cursor-pointer">Cancel</button>
              </>
            ) : (
              <>
                {!all.generated && (
                  <>
                    <h2 className="font-serif text-xl text-gray-900 mb-1">Customize Your URL</h2>
                    <p className="text-sm text-gray-500 mb-5">Create a short, memorable link to your portfolio.</p>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 mb-2 bg-gray-50">
                      <span className="text-sm text-gray-400 flex-shrink-0">{typeof window !== "undefined" ? window.location.origin : ""}/</span>
                      <input
                        type="text" value={all.customSlug} name="customSlug"
                        onChange={e => setAll(prev => ({ ...prev, error: "", customSlug: e.target.value }))}
                        className="flex-1 bg-transparent text-sm text-gray-900 outline-none"
                        placeholder="my-portfolio"
                      />
                    </div>
                    {all.error && <p className="text-red-500 text-xs mb-3">{all.error}</p>}
                    <button onClick={handleShorten}
                      className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition cursor-pointer mb-3">
                      Generate URL →
                    </button>
                    <button onClick={closeModal} className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Cancel</button>
                  </>
                )}
                {all.shortUrl && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Your portfolio URL</p>
                    <a href={all.shortUrl} target="_blank" rel="noopener noreferrer"
                      className="block text-base font-medium text-gray-900 underline break-all mb-6">
                      {all.shortUrl}
                    </a>
                    <button onClick={closeModal} className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition cursor-pointer">
                      Done
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
