'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { Experience } from '@/types/resume';

export function ExperienceForm() {
  const { resumeData, addExperience, removeExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState<Omit<Experience, 'id'>>({
    company: '',
    location: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    accomplishments: [''],
  });

  const handleAddExperience = () => {
    if (!newExp.company || !newExp.position) return;
    
    addExperience({
      ...newExp,
      id: Date.now().toString(),
    });
    
    setNewExp({
      company: '',
      location: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      accomplishments: [''],
    });
    setIsAdding(false);
  };

  const updateAccomplishment = (index: number, value: string) => {
    const updated = [...newExp.accomplishments];
    updated[index] = value;
    setNewExp({ ...newExp, accomplishments: updated });
  };

  const addAccomplishment = () => {
    setNewExp({ ...newExp, accomplishments: [...newExp.accomplishments, ''] });
  };

  const removeAccomplishment = (index: number) => {
    setNewExp({
      ...newExp,
      accomplishments: newExp.accomplishments.filter((_, i) => i !== index),
    });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {isAdding && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={newExp.company}
                  onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                  placeholder="Google"
                />
              </div>
              <div>
                <Label>Location *</Label>
                <Input
                  value={newExp.location}
                  onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                  placeholder="Mountain View, CA"
                />
              </div>
            </div>

            <div>
              <Label>Position *</Label>
              <Input
                value={newExp.position}
                onChange={(e) => setNewExp({ ...newExp, position: e.target.value })}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date (MM/YYYY)</Label>
                <Input
                  value={newExp.startDate}
                  onChange={(e) => setNewExp({ ...newExp, startDate: e.target.value })}
                  placeholder="01/2020"
                />
              </div>
              <div>
                <Label>End Date (MM/YYYY)</Label>
                <Input
                  value={newExp.endDate}
                  onChange={(e) => setNewExp({ ...newExp, endDate: e.target.value })}
                  placeholder="Present"
                  disabled={newExp.current}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="current"
                    checked={newExp.current}
                    onChange={(e) => setNewExp({ ...newExp, current: e.target.checked })}
                    className="mr-2"
                  />
                  <Label htmlFor="current" className="cursor-pointer">Currently working here</Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Accomplishments</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Use the format: [Action] that resulted in [quantifiable outcome]
              </p>
              <div className="space-y-2">
                {newExp.accomplishments.map((acc, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={acc}
                      onChange={(e) => updateAccomplishment(index, e.target.value)}
                      placeholder="Developed a microservices architecture that reduced system latency by 40%"
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAccomplishment(index)}
                      disabled={newExp.accomplishments.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={addAccomplishment}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Accomplishment
              </Button>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleAddExperience}>Save Experience</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <Card key={exp.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <Briefcase className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} | {exp.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                  {exp.accomplishments.length > 0 && (
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {exp.accomplishments.map((acc, idx) => (
                        <li key={idx} className="text-sm">
                          {acc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.experience.length === 0 && !isAdding && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No work experience added yet. Click "Add Experience" to get started.
        </p>
      )}
    </Card>
  );
}
