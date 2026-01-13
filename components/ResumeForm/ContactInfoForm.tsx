'use client';

import { useResumeStore } from '@/lib/resume-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export function ContactInfoForm() {
  const { resumeData, updateContactInfo } = useResumeStore();
  const { contactInfo } = resumeData;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={contactInfo.fullName}
            onChange={(e) => updateContactInfo({ fullName: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) => updateContactInfo({ email: e.target.value })}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => updateContactInfo({ phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={contactInfo.location}
            onChange={(e) => updateContactInfo({ location: e.target.value })}
            placeholder="San Francisco, CA 94102"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={contactInfo.linkedin || ''}
              onChange={(e) => updateContactInfo({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={contactInfo.github || ''}
              onChange={(e) => updateContactInfo({ github: e.target.value })}
              placeholder="github.com/johndoe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={contactInfo.website || ''}
              onChange={(e) => updateContactInfo({ website: e.target.value })}
              placeholder="johndoe.com"
            />
          </div>

          <div>
            <Label htmlFor="portfolio">Portfolio</Label>
            <Input
              id="portfolio"
              value={contactInfo.portfolio || ''}
              onChange={(e) => updateContactInfo({ portfolio: e.target.value })}
              placeholder="portfolio.johndoe.com"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
