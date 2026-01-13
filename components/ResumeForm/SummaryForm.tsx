'use client';

import { useResumeStore } from '@/lib/resume-store';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function SummaryForm() {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
      <div className="space-y-2">
        <Label htmlFor="summary">
          Brief overview of your experience and career goals
        </Label>
        <Textarea
          id="summary"
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Experienced Software Engineer with 5+ years building scalable web applications..."
          rows={5}
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          Keep it concise - 2-3 sentences highlighting your key strengths and career focus
        </p>
      </div>
    </Card>
  );
}
