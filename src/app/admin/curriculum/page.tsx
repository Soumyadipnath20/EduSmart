import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CurriculumAnalysisClient } from '@/components/curriculum/analysis-client';

export default function CurriculumAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Curriculum AI Assistant</h1>
        <p className="text-muted-foreground">
          Leverage AI to analyze curriculum performance and get resource recommendations.
        </p>
      </div>
      <CurriculumAnalysisClient />
    </div>
  );
}
