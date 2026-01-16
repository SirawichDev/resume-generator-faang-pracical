'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

export function SkillsForm() {
  const { resumeData, setSkills } = useResumeStore();
  console.log("🚀 ~ SkillsForm ~ resumeData:", resumeData)
  const [newCategory, setNewCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setSkills([...resumeData.skills, { category: newCategory.trim(), items: [] }]);
    setNewCategory('');
  };

  const removeCategory = (index: number) => {
    setSkills(resumeData.skills.filter((_, i) => i !== index));
  };

  const addSkillToCategory = (categoryIndex: number) => {
    if (!newSkill.trim()) return;
    const updatedSkills = [...resumeData.skills];
    updatedSkills[categoryIndex].items.push(newSkill.trim());
    setSkills(updatedSkills);
    setNewSkill('');
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const updatedSkills = [...resumeData.skills];
    updatedSkills[categoryIndex].items = updatedSkills[categoryIndex].items.filter(
      (_, i) => i !== skillIndex
    );
    setSkills(updatedSkills);
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="e.g., Programming Languages, Frameworks, Databases"
            onKeyDown={(e) => e.key === 'Enter' && addCategory()}
          />
          <Button onClick={addCategory} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {resumeData.skills.map((skill, categoryIndex) => (
          <div key={categoryIndex} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">{skill.category}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCategory(categoryIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {skill.items.map((item, skillIndex) => (
                <Badge key={skillIndex} variant="secondary" className="gap-1">
                  {item}
                  <button
                    onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                onChange={(e) => {
                  console.log('ee', e)
                  console.log('ee', e.target.id)
                  setNewSkill(e.target.value)
                }}
                placeholder="Add skill..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkillToCategory(categoryIndex);
                    setNewSkill('');
                  }
                }}
              />
              <Button
                onClick={() => addSkillToCategory(categoryIndex)}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {resumeData.skills.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          Add skill categories to organize your technical expertise
        </p>
      )}
    </Card>
  );
}
