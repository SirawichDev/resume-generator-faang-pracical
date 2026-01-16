'use client';

import { useState } from 'react';
import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, FolderGit2, X, Pencil } from 'lucide-react';
import { Project } from '@/types/resume';

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    description: '',
    technologies: [],
    highlights: [''],
    link: '',
    github: '',
  });
  const [newTech, setNewTech] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: [],
      highlights: [''],
      link: '',
      github: '',
    });
    setNewTech('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAddProject = () => {
    if (!formData.name || !formData.description) return;
    
    addProject({
      ...formData,
      id: Date.now().toString(),
      highlights: formData.highlights.filter((h) => h.trim()),
    });
    
    resetForm();
  };

  const handleUpdateProject = () => {
    if (!editingId || !formData.name || !formData.description) return;
    
    updateProject(editingId, {
      ...formData,
      highlights: formData.highlights.filter((h) => h.trim()),
    });
    resetForm();
  };

  const startEditing = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      name: project.name,
      description: project.description,
      technologies: [...project.technologies],
      highlights: project.highlights.length > 0 ? [...project.highlights] : [''],
      link: project.link || '',
      github: project.github || '',
    });
    setIsAdding(false);
  };

  const addTechnology = () => {
    if (!newTech.trim()) return;
    setFormData({
      ...formData,
      technologies: [...formData.technologies, newTech.trim()],
    });
    setNewTech('');
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const updateHighlight = (index: number, value: string) => {
    const updated = [...formData.highlights];
    updated[index] = value;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...formData.highlights, ''] });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const isFormOpen = isAdding || editingId !== null;

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => { resetForm(); setIsAdding(true); }} disabled={isFormOpen}>
          <Plus className="h-4 w-4 mr-1" />
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <Card className="p-4 mb-4 bg-muted/50">
          <div className="space-y-4">
            <div>
              <Label>Project Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="E-commerce Platform"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A full-stack e-commerce platform with real-time inventory management"
                rows={2}
              />
            </div>

            <div>
              <Label>Technologies</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add technology (e.g., React, Node.js)"
                  onKeyDown={(e) => e.key === 'Enter' && addTechnology()}
                />
                <Button onClick={addTechnology} size="sm" type="button">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary">
                    {tech}
                    <button
                      onClick={() => removeTechnology(index)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>Key Highlights</Label>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      placeholder="Implemented payment gateway integration with 99.9% uptime"
                      rows={2}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHighlight(index)}
                      disabled={formData.highlights.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={addHighlight} className="mt-2">
                <Plus className="h-4 w-4 mr-1" />
                Add Highlight
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Live Link</Label>
                <Input
                  value={formData.link || ''}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://project-demo.com"
                />
              </div>
              <div>
                <Label>GitHub Repository</Label>
                <Input
                  value={formData.github || ''}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  placeholder="github.com/username/project"
                />
              </div>
            </div>

            <div className="flex gap-2">
              {editingId ? (
                <Button onClick={handleUpdateProject}>Update Project</Button>
              ) : (
                <Button onClick={handleAddProject}>Save Project</Button>
              )}
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {resumeData.projects.map((project) => (
          <Card key={project.id} className={`p-4 ${editingId === project.id ? 'ring-2 ring-primary' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-3 flex-1">
                <FolderGit2 className="h-5 w-5 mt-1 text-muted-foreground" />
                <div className="flex-1">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  {(project.link || project.github) && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {project.link && <span>🔗 {project.link}</span>}
                      {project.link && project.github && <span className="mx-2">|</span>}
                      {project.github && <span>💻 {project.github}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditing(project)}
                  disabled={isFormOpen}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  disabled={isFormOpen}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {resumeData.projects.length === 0 && !isFormOpen && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No projects added yet. Click &quot;Add Project&quot; to showcase your work.
        </p>
      )}
    </Card>
  );
}
