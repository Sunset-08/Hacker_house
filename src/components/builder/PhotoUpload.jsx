import React, { useState, useRef } from 'react';
import { useBuilderContext } from '../../context/BuilderContext';
import { Camera, Upload, Trash2, AlertCircle } from 'lucide-react';

/**
 * Resizes a large image locally on an offscreen HTML5 canvas to a max dimension.
 * Keeps export crisp (1200px max) while preventing browser memory lag on huge phone photos.
 */
function processAndResizeImage(file, maxDimension = 1200) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;
                if (width > maxDimension || height > maxDimension) {
                    if (width > height) {
                        height = Math.round((height * maxDimension) / width);
                        width = maxDimension;
                    } else {
                        width = Math.round((width * maxDimension) / height);
                        height = maxDimension;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to compressed data URL (JPEG 0.90 for high quality & fast render)
                const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.90);
                resolve(resizedDataUrl);
            };
            img.onerror = () => reject(new Error('Failed to load image for resizing.'));
            img.src = event.target.result;
        };
        reader.onerror = () => reject(new Error('Failed to read image file.'));
        reader.readAsDataURL(file);
    });
}

export default function PhotoUpload() {
    const { photo, setPhoto } = useBuilderContext();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (file) => {
        setUploadError('');
        if (!file) return;

        // Basic image type check
        if (!file.type.startsWith('image/') && !file.name.match(/\.(heic|heif)$/i)) {
            setUploadError('That photo fought back. Please upload a valid image file (JPG, PNG, HEIC).');
            return;
        }

        setIsProcessing(true);
        try {
            const resizedUrl = await processAndResizeImage(file, 1200);
            setPhoto(resizedUrl);
        } catch (err) {
            setUploadError('That photo fought back. Failed to process photo locally.');
        } finally {
            setIsProcessing(false);
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
                    LOCAL PROCESS // HIGH RES
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
                            {isProcessing ? 'COMPILING PHOTO BUFFER...' : 'DROP PHOTO HERE OR CLICK TO UPLOAD'}
                        </span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase mt-1">
                            PNG, JPG, HEIC // AUTO-OPTIMIZED FOR 300 DPI EXPORT
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
                                PHOTO OPTIMIZED & READY
                            </span>
                            <span className="text-[9px] font-mono text-beach-teal uppercase block mt-0.5">
                                LOCAL CANVAS BUFFER (1200PX MAX)
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
