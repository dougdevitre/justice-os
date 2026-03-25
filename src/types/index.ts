/**
 * Justice OS — Shared Type Definitions
 *
 * Core types used across the platform. Plugins and consumers
 * should import types from this module.
 */

/** Represents a case in the justice system */
export interface Case {
  id: string;
  title: string;
  caseNumber: string;
  jurisdiction: string;
  status: 'open' | 'closed' | 'pending';
  parties: Party[];
  createdAt: Date;
  updatedAt: Date;
}

/** A party involved in a case */
export interface Party {
  id: string;
  name: string;
  role: 'petitioner' | 'respondent' | 'attorney' | 'judge' | 'witness';
  email?: string;
}

/** A tagged piece of evidence */
export interface Evidence {
  id: string;
  caseId: string;
  fileName: string;
  tags: string[];
  uploadedAt: Date;
}

/** A timeline event */
export interface TimelineEvent {
  id: string;
  caseId: string;
  date: Date;
  label: string;
  description: string;
  type: 'filing' | 'hearing' | 'ruling' | 'deadline' | 'note';
}

/** Plugin interface */
export interface JusticePlugin {
  name: string;
  version: string;
  description: string;
  onLoad(context: PluginContext): Promise<void>;
  onUnload(): Promise<void>;
}

/** Context provided to plugins during initialization */
export interface PluginContext {
  caseManager: unknown;
  docGenerator: unknown;
  logger: unknown;
}
