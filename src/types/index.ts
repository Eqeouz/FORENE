export type MembershipType = 'Student' | 'Researcher' | 'Professional' | 'Institution';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type ProjectStatus = 'Ongoing' | 'Completed';
export type InsightCategory = 'All' | 'Lab-work' | 'Industry Practice';

export interface MembershipApplication {
  id: string;
  membershipType: MembershipType;
  fullName: string;
  courseOfStudy: string;
  phone: string;
  certificateUrl: string;
  country: string;
  school: string;
  status: ApplicationStatus;
  createdAt: any;
}

export interface ResearchProposal {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  positionRole: string;
  researchArea: string;
  title: string;
  objectives: string;
  abstract: string;
  methodology: string;
  expectedImpact: string;
  needsCollaborators: boolean;
  skillsNeeded?: string;
  resourcesNeeded: string;
  fundingRequired: 'Yes' | 'No' | 'Not sure';
  proposalDocUrl: string;
  supportingDocUrl?: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  createdAt: any;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  category: InsightCategory;
  featuredImageUrl: string;
  body: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: any;
  createdAt: any;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'training' | 'connections' | 'series';
  badge: 'Free' | 'Paid';
  thumbnailUrl: string;
  description: string;
  instructor: string;
  tableOfContents: any;
  createdAt: any;
}

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  createdAt: any;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
  category: 'government' | 'ngo' | 'educational';
  createdAt: any;
}
