export interface AIProvider {
  generateCode(prefix: string, suffix: string): Promise<string>;
}
