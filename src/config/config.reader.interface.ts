import { Nullable } from '../common.types';

export interface IConfigReader {
  /**
   * key를 사용해 Config를 불러옵니다. 없는 경우, 에러를 반환합니다.
   * @param key Config Key
   */
  readMandatory(key: string): string;

  /**
   * key를 사용해 Config를 불러옵니다. 없는 경우, 지정한 기본값을 사용합니다.
   * @param key key를 사용해 Config를 불러옵니다. 없는 경우, defaultValue를 사용합니다.
   * @param defaultValue key가 없는 경우의 defaultValue
   */
  readOptional(key: string, defaultValue: string): string;

  /**
   * key를 사용해 Config를 불러옵니다. 없는 경우, null을 반환합니다.
   */
  readOrNull(key: string): Nullable<string>;
}
