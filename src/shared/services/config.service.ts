export class ConfigService {
  static environment;
  static getEnvironment(): string {
    return this.environment;
  }
  static setEnvironment(environment: string) {
    if (!environment || environment !== 'QA') {
      console.error('INVALID ENVIRONMENT');
    } else {
      this.environment = environment;
      console.log('LOGGER INITIALIZED');
    }
  }
  static getConfig() {
    return {
      jwtSecret: `${ConfigService.getEnvironment()}/JWT_SECRET`,
    };
  }
}
