export interface IHttp {
  /**
   * @example <caption>Example usage of patch.</caption>
   * // Enter only the endpoint without the schema and domain
   * post('/reset', {email, password})
   */
  post(path: string, data: object): Promise<any>;
  /**
   * @example <caption>Example usage of patch.</caption>
   * // Enter only the endpoint without the schema and domain
   * patch('/password', {password})
   */
  patch(path: string, data: object): Promise<any>;
}
