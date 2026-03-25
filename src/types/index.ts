/**
 * Justice OS — Shared Type Definitions
 *
 * Core types used across the platform. Plugins and consumers
 * should import types from this module.
 */

// ---------------------------------------------------------------------------
// Identifiers & Primitives
// ---------------------------------------------------------------------------

/** Branded UUID type for compile-time safety */
export type UUID = string & { readonly __brand: 'UUID' };

/** ISO-8601 date string */
export type ISODateString = string & { readonly __brand: 'ISODate' };

/** US state / territory jurisdiction codes */
export type JurisdictionCode =
  | 'AL' | 'AK' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'FL' | 'GA'
  | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MD'
  | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ'
  | 'NM' | 'NY' | 'NC' | 'ND' | 'OH' | 'OK' | 'OR' | 'PA' | 'RI' | 'SC'
  | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY'
  | 'DC' | 'PR' | 'GU' | 'VI' | 'AS' | 'MP'
  | 'FEDERAL';

// ---------------------------------------------------------------------------
// Case
// ---------------------------------------------------------------------------

/** Status of a case in the system */
export type CaseStatus = 'open' | 'closed' | 'pending' | 'dismissed' | 'appealed';

/** Category of legal matter */
export type CaseCategory =
  | 'civil'
  | 'criminal'
  | 'family'
  | 'housing'
  | 'immigration'
  | 'probate'
  | 'small-claims'
  | 'traffic'
  | 'other';

/** Represents a case in the justice system */
export interface Case {
  id: string;
  title: string;
  caseNumber: string;
  jurisdiction: string;
  status: CaseStatus;
  category?: CaseCategory;
  parties: Party[];
  filingDate?: Date;
  closedDate?: Date;
  tags?: string[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Party
// ---------------------------------------------------------------------------

/** Roles a party can hold in a case */
export type PartyRole = 'petitioner' | 'respondent' | 'attorney' | 'judge' | 'witness' | 'guardian' | 'interpreter';

/** A party involved in a case */
export interface Party {
  id: string;
  name: string;
  role: PartyRole;
  email?: string;
  phone?: string;
  organizationName?: string;
  barNumber?: string;
}

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------

/** A tagged piece of evidence */
export interface Evidence {
  id: string;
  caseId: string;
  fileName: string;
  mimeType?: string;
  fileSizeBytes?: number;
  tags: string[];
  description?: string;
  uploadedBy?: string;
  uploadedAt: Date;
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

/** Types of timeline events */
export type TimelineEventType = 'filing' | 'hearing' | 'ruling' | 'deadline' | 'note' | 'motion' | 'order' | 'continuance';

/** A timeline event */
export interface TimelineEvent {
  id: string;
  caseId: string;
  date: Date;
  label: string;
  description: string;
  type: TimelineEventType;
  isDeadline?: boolean;
  completedAt?: Date;
}

// ---------------------------------------------------------------------------
// Plugin System
// ---------------------------------------------------------------------------

/** Plugin interface — all Justice OS plugins must implement this */
export interface JusticePlugin {
  name: string;
  version: string;
  description: string;

  /** Called when the plugin is loaded into the platform */
  onLoad(context: PluginContext): Promise<void>;

  /** Called when the plugin is unloaded or the platform shuts down */
  onUnload(): Promise<void>;
}

/** Context provided to plugins during initialization */
export interface PluginContext {
  /** Case management operations and event subscription */
  caseManager: CaseManagerAPI;
  /** Document generation interface */
  docGenerator: DocGeneratorAPI;
  /** Structured logger scoped to the plugin */
  logger: PluginLogger;
  /** Key-value store for plugin-specific settings */
  config: PluginConfigStore;
}

/** Public surface of the CaseManager exposed to plugins */
export interface CaseManagerAPI {
  getCase(caseId: string): Promise<Case | null>;
  queryCases(options?: Record<string, unknown>): Promise<Case[]>;
  on(event: string, listener: (payload: unknown) => void | Promise<void>): void;
  off(event: string, listener: (payload: unknown) => void | Promise<void>): void;
}

/** Document generation API surface */
export interface DocGeneratorAPI {
  generate(templateId: string, data: Record<string, unknown>): Promise<GeneratedDocument>;
  listTemplates(jurisdiction?: string): Promise<DocumentTemplate[]>;
}

/** A generated document ready for download or filing */
export interface GeneratedDocument {
  id: string;
  caseId: string;
  templateId: string;
  format: 'pdf' | 'docx';
  content: Buffer;
  generatedAt: Date;
}

/** A document template in the template registry */
export interface DocumentTemplate {
  id: string;
  name: string;
  jurisdiction: string;
  category: CaseCategory;
  version: string;
  fields: TemplateField[];
}

/** A single field required by a document template */
export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'select';
  required: boolean;
  options?: string[];
  helpText?: string;
}

/** Logger interface scoped to a plugin */
export interface PluginLogger {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
  debug(message: string, meta?: Record<string, unknown>): void;
}

/** Key-value config store for plugins */
export interface PluginConfigStore {
  get<T = unknown>(key: string): Promise<T | undefined>;
  set<T = unknown>(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// Type Guards
// ---------------------------------------------------------------------------

/** Check if a value is a valid CaseStatus */
export function isCaseStatus(value: unknown): value is CaseStatus {
  return typeof value === 'string' && ['open', 'closed', 'pending', 'dismissed', 'appealed'].includes(value);
}

/** Check if a value looks like a Case object */
export function isCase(value: unknown): value is Case {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.caseNumber === 'string' &&
    isCaseStatus(obj.status)
  );
}

/** Check if a value looks like a Party object */
export function isParty(value: unknown): value is Party {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.id === 'string' && typeof obj.name === 'string' && typeof obj.role === 'string';
}
