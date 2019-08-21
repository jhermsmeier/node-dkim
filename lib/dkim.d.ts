import Key from "dkim-key";
import Signature from "dkim-signature";

export { Key, Signature };

export function getKey(domain: any, selector: any, callback: (error: Error, key: Key) => any): void;
export function getKey(domain: any, callback: (error: Error, key: Key) => any): void;

export function processBody(message: string | Buffer, method?: string): string;

export function processHeader(headers: string[], signHeaders: any[], method: string): string;
export function processHeader(headers: string[], method: string): string;

export interface VerifyResult {
  verified: false;
  status: string;
  error: null;
  signature: null;
  key: null;
}

export function verify(message: Buffer, callback: (error: Error, result: VerifyResult) => any): void;

export function verifySignature(body: Buffer, headers: any[], callback: (error: Error, result: VerifyResult) => any): void;
