import { TrendingUp, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  score: number;
  keywords: {
    found: string[];
    missing: string[];
  };
  suggestions: string[];
}

export function ScoreDisplay({ score, keywords, suggestions }: ScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setAnimatedScore(current);
        if (current >= score) {
          clearInterval(interval);
        }
      }, 20);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-green-500';
    if (score >= 60) return 'stroke-yellow-500';
    return 'stroke-red-500';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    return 'D';
  };

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-6 h-6 text-indigo-600" />
        <h2 className="text-gray-900">Overall Resume Score</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Score Meter */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="transform -rotate-90 w-48 h-48">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-gray-900">{animatedScore}</span>
              <span className="text-gray-500">out of 100</span>
              <span className={`mt-1 px-3 py-1 rounded-full ${
                score >= 80 ? 'bg-green-100 text-green-700' :
                score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                Grade {getScoreGrade(score)}
              </span>
            </div>
          </div>
        </div>

        {/* Keywords Analysis */}
        <div>
          <div className="mb-4">
            <h3 className="text-gray-900 mb-3">Keywords Found ({keywords.found.length})</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.found.slice(0, 8).map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-gray-900 mb-3">Recommended Keywords ({keywords.missing.length})</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.missing.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mt-3">
              Adding these keywords could improve your match score for relevant positions
            </p>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h3 className="text-gray-900">Suggestions for Improvement</h3>
        </div>
        <ul className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 mt-1">→</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
