import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResults } from './components/AnalysisResults';

export interface ResumeAnalysis {
  score: number;
  atsCompatibility: {
    score: number;
    issues: string[];
    strengths: string[];
  };
  keywords: {
    found: string[];
    missing: string[];
  };
  jobRecommendations: {
    title: string;
    matchScore: number;
    company: string;
    skills: string[];
    reason: string;
  }[];
  suggestions: string[];
}

export default function App() {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const mockAnalysis: ResumeAnalysis = {
        score: 78,
        atsCompatibility: {
          score: 82,
          issues: [
            'Contains tables that may not parse correctly',
            'Some formatting may be lost in plain text conversion',
            'Header/footer content might be ignored by some ATS'
          ],
          strengths: [
            'Uses standard section headings',
            'Clear, readable font',
            'Proper use of bullet points',
            'No images or graphics blocking text parsing'
          ]
        },
        keywords: {
          found: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Agile', 'Git'],
          missing: ['TypeScript', 'Docker', 'Kubernetes', 'CI/CD', 'Azure']
        },
        jobRecommendations: [
          {
            title: 'Senior Full Stack Developer',
            matchScore: 92,
            company: 'TechCorp Inc.',
            skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
            reason: 'Your experience with React and Node.js aligns perfectly with this role. Strong match for required skills.'
          },
          {
            title: 'Frontend Developer',
            matchScore: 88,
            company: 'Digital Solutions',
            skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
            reason: 'Your frontend skills are a great fit. Consider adding TypeScript to strengthen your profile.'
          },
          {
            title: 'DevOps Engineer',
            matchScore: 65,
            company: 'Cloud Systems',
            skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
            reason: 'Your AWS and Python skills are relevant. Adding Docker and Kubernetes would increase your match score.'
          },
          {
            title: 'Software Engineer',
            matchScore: 85,
            company: 'Innovation Labs',
            skills: ['Python', 'JavaScript', 'SQL', 'Git'],
            reason: 'Strong technical foundation matches well with this generalist role.'
          }
        ],
        suggestions: [
          'Add more quantifiable achievements (e.g., "Improved performance by 40%")',
          'Include TypeScript in your skills section - it\'s highly sought after',
          'Add certifications if you have any (AWS, Azure, etc.)',
          'Use more action verbs at the start of bullet points',
          'Consider adding a projects section showcasing your work'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReset = () => {
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-indigo-900 mb-2">Resume Analyzer</h1>
          <p className="text-gray-600">
            Get instant feedback on ATS compatibility, scoring, and personalized job recommendations
          </p>
        </header>

        {!analysis ? (
          <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} />
        ) : (
          <AnalysisResults analysis={analysis} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
