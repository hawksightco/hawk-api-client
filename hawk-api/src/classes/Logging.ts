class Logging {

  /**
   * Prevent multiple instance of this class
   */
  private constructor() {}

  /**
   * Whether logging is enabled
   */
  public enabled: boolean = true;

  /**
   * Singleton instance
   */
  static _instance: Logging;

  /**
   * Create / get the singleton instance
   */
  static instance(): Logging {
    if (this._instance === undefined) {
      this._instance = new Logging();
    }
    return this._instance;
  }

  /**
   * Log to console
   *
   * @param msg Message to log
   */
  log(...msg: any) {
    if (this.enabled) {
      console.log(...msg);
    }
  }
}

/**
 * Log to console
 *
 * @param msg
 */
export function Log(...msg: any) {
  Logging.instance().log(...msg);
}

/**
 * Whether enable logging or not
 *
 * @param flag
 */
export function logging(flag: boolean) {
  Logging.instance().enabled = flag;
}