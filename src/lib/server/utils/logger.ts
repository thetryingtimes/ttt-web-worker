export class R2Logger {
  static async log(platform: App.Platform, body: object) {
    const key = new Date().toISOString().replace(/:|\./g, '');

    try {
      await platform.env.LOGS.put(
        `${key}.json`,
        JSON.stringify(body, null, 2),
        {
          httpMetadata: {
            contentType: 'application/json',
            contentDisposition: 'inline',
            contentEncoding: 'utf-8'
          }
        }
      );
    } catch (e) {}
  }
}
