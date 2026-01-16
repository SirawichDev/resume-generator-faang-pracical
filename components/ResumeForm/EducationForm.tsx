'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap, Pencil } from 'lucide-react';
import { Education } from '@/types/resume';

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    honors: [],
  });
  const [newHonor, setNewHonor] = useState('');

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
    });
    setNewHonor('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAddEducation = () => {
    if (!formData.institution || !formData.degree || !formData.field) return;
    
    addEducation({
      ...formData,
      id: Date.now().toString(),
    });
    
    resetForm();
  };

  const handleUpdateEducation = () => {
    if (!editingId || !formData.institution || !formData.degree || !formData.field) return;
    
    updateEducation(editingId, formData);
    resetForm();
  };

  const startEditing = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa || '',
      honors: edu.honors ? [...edu.honors] : [],
    });
    setIsAdding(false);
  };

  const addHonor = () => {
    if (!newHonor.trim()) return;
    setFormData({ ...formData, honors: [...(formData.honors || []), newHonor.trim()] });
    setNewHonor('');
  };

  const removeHonor = (index: number) => {
    setFormData({
      ...formData,
      honors: formData.honors?.filter((_, i) => i !== index) || [],
    });
  };

  const isFormOpen = isAdding || editingId !== null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Education</h2>
        <Button onClick={() => { resetForm(); setIsAdding(true); }} disabled={isFormOpen}>
          <Plus className="h-4 w-4 mr-1" />
          Add Education
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="Stanford University"
                />
              </div>
              <div>
                <Label>Location *</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Stanford, CA"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Degree *</Label>
                <Input
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Start Date (MM/YYYY)</Label>
                <Input
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  placeholder="09/2016"
                />
              </div>
              <div>
                <Label>End Date (MM/YYYY)</Label>
                <Input
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  placeholder="06/2020"
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={formData.gpa || ''}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div>
              <Label>Honors & Awards</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newHonor}
                  onChange={(e) => setNewHonor(e.target.value)}
                  placeholder="Dean's List, Summa Cum Laude"
                  onKeyDown={(e) => e.key === 'Enter' && addHonor()}
                />
                <Button onClick={addHonor} size="sm" type="button">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.honors && formData.honors.length > 0 && (
                <div className="space-y-1">
                  {formData.honors.map((honor, index) => (
                    <div key={index} className="flex justify-between items-center bg-background p-2 rounded">
                      <span className="text-sm">{honor}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeHonor(index)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <Button onClick={handleUpdateEducation}>Update Education</Button>
              ) : (
                <Button onClick={handleAddEducation}>Save Education</Button>
              )}
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.education.map((edu) => (
          <Card key={edu.id} className={`p-4 ${editingId === edu.id ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <GraduationCap className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution} | {edu.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                  )}
                  {edu.honors && edu.honors.length > 0 && (
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {edu.honors.map((honor, idx) => (
                        <li key={idx} className="text-sm">
                          {honor}
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
                  onClick={() => startEditing(edu)}
                  disabled={isFormOpen}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  disabled={isFormOpen}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.education.length === 0 && !isFormOpen && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No education added yet. Click &quot;Add Education&quot; to get started.
        </p>
      )}
    </Card>
  );
}
