'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Award as AwardIcon, Pencil } from 'lucide-react';
import { Award } from '@/types/resume';

export function AwardsForm() {
  const { resumeData, addAward, updateAward, removeAward } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Award, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      description: '',
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAddAward = () => {
    if (!formData.title || !formData.issuer) return;
    
    addAward({
      ...formData,
      id: Date.now().toString(),
    });
    
    resetForm();
  };

  const handleUpdateAward = () => {
    if (!editingId || !formData.title || !formData.issuer) return;
    
    updateAward(editingId, formData);
    resetForm();
  };

  const startEditing = (award: Award) => {
    setEditingId(award.id);
    setFormData({
      title: award.title,
      issuer: award.issuer,
      date: award.date,
      description: award.description || '',
    });
    setIsAdding(false);
  };

  const isFormOpen = isAdding || editingId !== null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Awards & Certifications</h2>
        <Button onClick={() => { resetForm(); setIsAdding(true); }} disabled={isFormOpen}>
          <Plus className="h-4 w-4 mr-1" />
          Add Award
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issuer *</Label>
                <Input
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div>
                <Label>Date (MM/YYYY)</Label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="03/2023"
                />
              </div>
            </div>

            <div>
              <Label>Description (Optional)</Label>
              <Textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Professional level certification for designing distributed systems"
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <Button onClick={handleUpdateAward}>Update Award</Button>
              ) : (
                <Button onClick={handleAddAward}>Save Award</Button>
              )}
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.awards.map((award) => (
          <Card key={award.id} className={`p-4 ${editingId === award.id ? 'ring-2 ring-primary' : ''}`}>
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
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(award)}
                  disabled={isFormOpen}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAward(award.id)}
                  disabled={isFormOpen}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.awards.length === 0 && !isFormOpen && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No awards or certifications added yet. Click &quot;Add Award&quot; to showcase your achievements.
        </p>
      )}
    </Card>
  );
}
