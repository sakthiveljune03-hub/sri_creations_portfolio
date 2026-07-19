/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  year: string;
  description: string;
  skills: string[];
}

export interface StatItem {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  listTitle: string;
  listItems: string[];
  extendedDetails: string[];
  icon: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
}
