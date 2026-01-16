'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Briefcase, Pencil } from 'lucide-react';
import { Experience } from '@/types/resume';

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    location: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    accomplishments: [''],
  });

  const resetForm = () => {
    setFormData({
      company: '',
      location: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      accomplishments: [''],
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAddExperience = () => {
    if (!formData.company || !formData.position) return;
    
    addExperience({
      ...formData,
      id: Date.now().toString(),
    });
    
    resetForm();
  };

  const handleUpdateExperience = () => {
    if (!editingId || !formData.company || !formData.position) return;
    
    updateExperience(editingId, formData);
    resetForm();
  };

  const startEditing = (exp: Experience) => {
    setEditingId(exp.id);
    setFormData({
      company: exp.company,
      location: exp.location,
      position: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      accomplishments: exp.accomplishments.length > 0 ? [...exp.accomplishments] : [''],
    });
    setIsAdding(false);
  };

  const updateAccomplishment = (index: number, value: string) => {
    const updated = [...formData.accomplishments];
    updated[index] = value;
    setFormData({ ...formData, accomplishments: updated });
  };

  const addAccomplishment = () => {
    setFormData({ ...formData, accomplishments: [...formData.accomplishments, ''] });
  };

  const removeAccomplishment = (index: number) => {
    setFormData({
      ...formData,
      accomplishments: formData.accomplishments.filter((_, i) => i !== index),
    });
  };

  const isFormOpen = isAdding || editingId !== null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <Button onClick={() => { resetForm(); setIsAdding(true); }} disabled={isFormOpen}>
          <Plus className="h-4 w-4 mr-1" />
          Add Experience
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Google"
                />
              </div>
              <div>
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Mountain View, CA"
                />
              </div>
            </div>

            <div>
              <Label>Position *</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date (MM/YYYY)</Label>
                <Input
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="01/2020"
                />
              </div>
              <div>
                <Label>End Date (MM/YYYY)</Label>
                <Input
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="Present"
                  disabled={formData.current}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="current"
                    checked={formData.current}
                    onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
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
                {formData.accomplishments.map((acc, index) => (
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
                      disabled={formData.accomplishments.length === 1}
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
              {editingId ? (
                <Button onClick={handleUpdateExperience}>Update Experience</Button>
              ) : (
                <Button onClick={handleAddExperience}>Save Experience</Button>
              )}
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.experience.map((exp) => (
          <Card key={exp.id} className={`p-4 ${editingId === exp.id ? 'ring-2 ring-primary' : ''}`}>
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
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(exp)}
                  disabled={isFormOpen}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  disabled={isFormOpen}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.experience.length === 0 && !isFormOpen && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No work experience added yet. Click &quot;Add Experience&quot; to get started.
        </p>
      )}
    </Card>
  );
}
