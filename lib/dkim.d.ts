import Key from "dkim-key";
import Signature from "dkim-signature";

export { Key, Signature };

export function getKey(domain: any, selector: any, callback: (error: Error, key: Key) => any): void;
export function getKey(domain: any, callback: (error: Error, key: Key) => any): void;

export function processBody(message: string | Buffer, method?: string): string;

export function processHeader(headers: string[], signHeaders: any[], method: string): string;
export function processHeader(headers: string[], method: string): string;

interface Signature {
  algorithm: string,
  canonical: string,
  copiedHeaders: [],
  domain: string,
  expires: null | string,
  hash: Buffer,
  headers: [],
  identity: null,
  length: null,
  query: string,
  selector: string,
  signature: Buffer,
  timestamp: null | string,
  version: string
}

interface Key {
  version: null | string,
  type: string,
  flags: string,
  granularity: null | string,
  hash: null,
  notes: null,
  service: null,
  key: Buffer
}

export interface VerifyResult {
  verified: false;
  status: string;
  error: null;
  signature: Signature;
  key: Key;
}

export function verify(message: Buffer, callback: (error: Error, result: VerifyResult[]) => any): void;

export function verifySignature(body: Buffer, headers: any[], callback: (error: Error, result: VerifyResult) => any): void;
