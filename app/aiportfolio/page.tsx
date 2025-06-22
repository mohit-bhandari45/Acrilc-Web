"use client";

import { useState, useEffect, useRef, ChangeEvent } from 'react';

const AiPorfolio = () => {
    const [name, setName] = useState('');
    const [artJourney, setArtJourney] = useState('');
    const [bio, setBio] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isGenerated, setIsGenerated] = useState(false);

    const validate = (): boolean => {
        return name.trim() !== '' && files.length > 0 && !isGenerating;
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const removeFile = (idx: number): void => {
        setFiles(prev => prev.filter((_, i) => i !== idx));
    };

    const handleGenerate = (): void => {
        if (!validate()) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setIsGenerated(true);
        }, 2000);
        setTimeout(() => {
            setIsGenerated(false);
        }, 3000);
    };

    useEffect(() => {
        if (!fileInputRef.current) return;
        const dt = new DataTransfer();
        files.forEach(f => dt.items.add(f));
        fileInputRef.current.files = dt.files;
        if (files.length === 0) {
            fileInputRef.current.value = '';
        }
    }, [files]);

    return (
        <div className="pt-12 min-h-screen bg-gradient-to-br from-[#f8e1f4] via-[#c9e7fa] to-[#ffe6d6] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full space-y-8">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create Your AI Portfolio</h1>
                    <p className="text-gray-600">
                        Let AI craft a beautiful portfolio website showcasing your artistic journey
                    </p>
                </header>

                {/* Name Input */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Enter your name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                {/* Art Journey */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2z" />
                        </svg>
                        Tell us about your art journey
                    </label>
                    <textarea
                        rows={4}
                        value={artJourney}
                        onChange={e => setArtJourney(e.target.value)}
                        placeholder="Share your artistic background..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 resize-none"
                    />
                </div>

                {/* Artworks Upload */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Upload your artworks
                    </label>
                    <div
                        className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-gray-50 rounded-full">
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-700">Choose images to upload</p>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                        </div>
                    </div>
                    {files.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Selected files:</p>
                            <div className="space-y-2">
                                {files.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3 truncate">
                                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                        </div>
                                        <button onClick={() => removeFile(idx)} className="p-1 hover:bg-gray-200 rounded transition">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bio Input */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 card-hover">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Few words about yourself
                    </label>
                    <textarea
                        rows={3}
                        value={bio}
                        onChange={e => setBio(e.target.value)}
                        placeholder="A brief introduction about who you are beyond your art..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400 resize-none"
                    />
                </div>

                {/* Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row justify-center items-center gap-4 card-hover">
                    <div className="flex items-center gap-2">
                        <label htmlFor="cardCount" className="text-sm font-medium text-gray-700">Cards</label>
                        <select id="cardCount" className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none text-sm shadow-sm">
                            <option>8 cards</option>
                            <option>10 cards</option>
                            <option>12 cards</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="language" className="text-sm font-medium text-gray-700">Language</label>
                        <select id="language" className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none text-sm shadow-sm">
                            <option>English (US)</option>
                            <option>English (UK)</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                        </select>
                    </div>
                </div>

                {/* Generate Button */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center card-hover">
                    <button
                        onClick={handleGenerate}
                        disabled={!validate()}
                        className={`
                            w-full py-4 rounded-lg
                            text-white font-semibold flex items-center justify-center gap-2
                            transition-all duration-[0.2s] ease-in-out
                            ${validate()
                                ? 'bg-gradient-to-r from-[#7f53ac] to-[#fcae7b] hover:opacity-90 hover:from-[#f953c6] hover:via-[#b91d73] hover:to-[#fcae7b] hover:scale-105 shadow-md hover:shadow-lg'
                                : 'bg-gray-300 cursor-not-allowed'
                            }
                        `}
                    >
                        {isGenerating ? (
                            <svg
                                className="w-5 h-5 text-white animate-spin"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 
                                        8.001 0 004.582 9m0 0H9m11 
                                        11v-5h-.581m0 0a8.003 8.003 
                                        0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 
                                        6.857L21 12l-5.714 2.143L13 21l-2.286-6.857
                                        L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        )}
                        <span>{isGenerating ? 'Generating Your Portfolio...' : 'Generate My Portfolio'}</span>
                    </button>
                    {!validate() && (
                        <p className="text-sm text-gray-500 mt-2">Please fill in your name and upload at least one artwork</p>
                    )}
                </div>

                {/* Success Message */}
                {isGenerated && (
                    <div
                        id="success-message"
                        className="bg-green-50 border border-green-100 rounded-xl shadow-sm p-6 text-center animate-fade-in-up"
                    >
                        <div className="flex items-center justify-center gap-3 text-green-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857 L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                            <p className="font-medium">Your AI portfolio is being generated!</p>
                        </div>
                        <p className="mt-2 text-sm text-green-600">You'll receive an email with your personalized portfolio website shortly.</p>
                    </div>
                )}

                {/* Footer */}
                <footer className="text-center mt-12 mb-8 text-gray-500 text-sm">
                    Powered by Acrilc AI • Creating beautiful portfolios for artists worldwide
                </footer>
            </div>
        </div>
    )
}

export default AiPorfolio;