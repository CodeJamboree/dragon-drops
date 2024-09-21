export default class ContextError extends Error {
  constructor(provider: string) {
    super(`use${provider} must be used within ${provider}`);
  }
}