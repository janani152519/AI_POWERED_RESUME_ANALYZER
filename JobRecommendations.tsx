import { Briefcase, Building2, TrendingUp, ExternalLink } from 'lucide-react';

interface JobRecommendation {
  title: string;
  matchScore: number;
  company: string;
  skills: string[];
  reason: string;
}

interface JobRecommendationsProps {
  recommendations: JobRecommendation[];
}

export function JobRecommendations({ recommendations }: JobRecommendationsProps) {
  const getMatchColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-700 border-green-300';
    if (score >= 70) return 'bg-blue-100 text-blue-700 border-blue-300';
    return 'bg-yellow-100 text-yellow-700 border-yellow-300';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 85) return 'Excellent Match';
    if (score >= 70) return 'Good Match';
    return 'Potential Match';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-6 h-6 text-indigo-600" />
        <h2 className="text-gray-900">Job Recommendations</h2>
        <span className="ml-auto text-gray-500">
          Based on your skills and experience
        </span>
      </div>

      <div className="grid gap-4">
        {recommendations.map((job, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full border ${getMatchColor(job.matchScore)}`}>
                    {job.matchScore}% Match
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{job.company}</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Apply
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-gray-700 flex items-start gap-2">
                <TrendingUp className="w-4 h-4 mt-1 text-indigo-600 flex-shrink-0" />
                <span>{job.reason}</span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-600">Skills:</span>
              {job.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Match indicator bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-gray-600 mb-1">
                <span>{getMatchLabel(job.matchScore)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    job.matchScore >= 85 ? 'bg-green-500' :
                    job.matchScore >= 70 ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${job.matchScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <p className="text-indigo-900">
          <strong>💼 Career Tip:</strong> Jobs with 85%+ match align well with your current skills. 
          Jobs with 70-84% match may require learning 1-2 additional skills. Consider both for the best opportunities!
        </p>
      </div>
    </div>
  );
}
