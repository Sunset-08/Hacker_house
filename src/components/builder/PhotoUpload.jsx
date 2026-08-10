import React, { useState, useRef } from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { Camera, Upload, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function PhotoUpload() {
    const { photo, setPhoto } = useBuilderContext();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (file) => {
        setUploadError('');
        if (!file) return;

        // Basic image type check
        if (!file.type.startsWith('image/') && !file.name.match(/\.(heic|heif)$/i)) {
            setUploadError('That photo fought back. Please upload a valid image file (JPG, PNG, HEIC).');
            return;
        }

        // Limit size to ~10MB for local browser memory safety
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('Image size exceeds 10MB limit.');
            return;
        }

        try {
            const objectUrl = URL.createObjectURL(file);
            setPhoto(objectUrl);
        } catch (err) {
            setUploadError('Failed to read image locally.');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const removePhoto = () => {
        if (photo && photo.startsWith('blob:')) {
            URL.revokeObjectURL(photo);
        }
        setPhoto(null);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-3 text-left">

            {/* Micro Header */}
            <div className="flex items-center justify-between border-b border-[#2E303C]/40 pb-2">
                <span className="text-[10px] font-mono text-neon-coral font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5" /> 3. PHOTO UPLOAD
                </span>
                <span className="text-[9px] font-mono text-gray-500 uppercase">
                    LOCAL ONLY // NO UPLOAD
                </span>
            </div>

            {/* Microcopy prompt */}
            <p className="text-[11px] font-mono text-gray-300 italic">
                "Show us the builder behind the build."
            </p>

            {/* Drag and Drop / Select Zone */}
            {!photo ? (
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed p-6 text-center cursor-pointer transition-all ${isDragging
                            ? 'border-neon-coral bg-neon-coral/10'
                            : 'border-border-card bg-[#08080C] hover:border-gray-500 hover:bg-zinc-950/80'
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/heic, image/heif, image/*"
                        className="hidden"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                handleFileSelect(e.target.files[0]);
                            }
                        }}
                    />

                    <div className="flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-neon-coral/10 border border-neon-coral/30 flex items-center justify-center text-neon-coral clip-slanted mb-2">
                            <Upload className="w-5 h-5" />
                        </div>

                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wide block">
                            DROP PHOTO HERE OR CLICK TO UPLOAD
                        </span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase mt-1">
                            PNG, JPG, HEIC // ALL ORIENTATIONS SUPPORTED
                        </span>
                    </div>
                </div>
            ) : (
                /* Uploaded Thumbnail Preview Control */
                <div className="bg-[#08080C] border border-border-card p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black border border-neon-coral/40 overflow-hidden relative">
                            <img
                                src={photo}
                                alt="Builder avatar preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <span className="text-xs font-mono font-bold text-white uppercase block">
                                PHOTO LOADED
                            </span>
                            <span className="text-[9px] font-mono text-beach-teal uppercase block mt-0.5">
                                LOCAL MEMORY BUFFER
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={removePhoto}
                        className="p-2 bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-black transition-colors"
                        title="Remove photo"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}

            {uploadError && (
                <div className="flex items-center gap-2 text-red-400 text-[10px] font-mono bg-red-500/10 p-2 border border-red-500/30">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{uploadError}</span>
                </div>
            )}

        </div>
    );
}
