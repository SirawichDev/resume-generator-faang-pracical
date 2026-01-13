'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Award as AwardIcon } from 'lucide-react';
import { Award } from '@/types/resume';

export function AwardsForm() {
  const { resumeData, addAward, removeAward } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newAward, setNewAward] = useState<Omit<Award, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    description: '',
  });

  const handleAddAward = () => {
    if (!newAward.title || !newAward.issuer) return;
    
    addAward({
      ...newAward,
      id: Date.now().toString(),
    });
    
    setNewAward({
      title: '',
      issuer: '',
      date: '',
      description: '',
    });
    setIsAdding(false);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Awards & Certifications</h2>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 mr-1" />
          Add Award
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={newAward.title}
                onChange={(e) => setNewAward({ ...newAward, title: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issuer *</Label>
                <Input
                  value={newAward.issuer}
                  onChange={(e) => setNewAward({ ...newAward, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <Label>Date (MM/YYYY)</Label>
                <Input
                  value={newAward.date}
                  onChange={(e) => setNewAward({ ...newAward, date: e.target.value })}
                  placeholder="03/2023"
                />
              </div>
            </div>

            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={newAward.description || ''}
                onChange={(e) => setNewAward({ ...newAward, description: e.target.value })}
                placeholder="Professional level certification for designing distributed systems"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddAward}>Save Award</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.awards.map((award) => (
          <Card key={award.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <AwardIcon className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{award.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {award.issuer}
                    {award.date && ` | ${award.date}`}
                  </p>
                  {award.description && (
                    <p className="text-sm mt-1">{award.description}</p>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeAward(award.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.awards.length === 0 && !isAdding && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No awards or certifications added yet. Click "Add Award" to showcase your achievements.
        </p>
      )}
    </Card>
  );
}
