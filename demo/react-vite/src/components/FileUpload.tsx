import React from 'react';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onUpload: (files: globalThis.File[]) => Promise<void>;
  isUploading?: boolean;
}

const ACCEPTED_FILE_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
  'video/*': ['.mp4', '.avi', '.mov'],
  'audio/*': ['.mp3', '.wav'],
};

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload, isUploading = false }) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File "${file.name}" is too large. Maximum size is 50MB.`);
      return false;
    }

    const fileType = file.type;
    const isValidType = Object.keys(ACCEPTED_FILE_TYPES).some((acceptedType) => {
      if (acceptedType.endsWith('/*')) {
        return fileType.startsWith(acceptedType.slice(0, -1));
      }
      return fileType === acceptedType;
    });

    if (!isValidType) {
      toast.error(`File type "${fileType}" is not supported.`);
      return false;
    }

    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const validFiles: File[] = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (validateFile(file)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) selected for upload.`);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload.');
      return;
    }

    try {
      await onUpload(selectedFiles);

      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Files</h2>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          selectedFiles.length > 0 ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
        }`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-lg font-medium text-gray-700">
              {selectedFiles.length > 0 && `${selectedFiles.length} file(s) selected`}
            </p>
            <p className="text-sm text-gray-500 mt-2">Supported: Images, Videos, Audio</p>
            <p className="text-xs text-gray-400 mt-1">Maximum file size: 50MB</p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              disabled={isUploading}
            >
              Select Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={Object.keys(ACCEPTED_FILE_TYPES).join(',')}
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Files</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  disabled={isUploading}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isUploading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} File(s)`}
          </button>
        </div>
      )}
    </div>
  );
};
