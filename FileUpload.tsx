import { Upload, FileText } from 'lucide-react';
import { useState, useRef } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export function FileUpload({ onFileUpload, isAnalyzing }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))) {
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700">Analyzing your resume...</p>
          </div>
        ) : (
          <>
            <div className="w-20 h-20 mx-auto mb-6 bg-indigo-100 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-indigo-600" />
            </div>
            
            <h2 className="mb-2 text-gray-900">Upload Your Resume</h2>
            
            <p className="text-gray-600 mb-6">
              Drag and drop your resume here, or click to browse
            </p>
            
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Choose File
            </button>
            
            <p className="text-gray-500 mt-4">
              Supported formats: PDF, DOC, DOCX
            </p>
          </>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-gray-900 mb-1">ATS Check</h3>
          <p className="text-gray-600">Ensure your resume passes Applicant Tracking Systems</p>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600">📊</span>
          </div>
          <h3 className="text-gray-900 mb-1">Score Analysis</h3>
          <p className="text-gray-600">Get a detailed score with improvement tips</p>
        </div>

        <div className="bg-white rounded-lg p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-purple-600">💼</span>
          </div>
          <h3 className="text-gray-900 mb-1">Job Matches</h3>
          <p className="text-gray-600">Discover jobs that fit your profile</p>
        </div>
      </div>
    </div>
  );
}
