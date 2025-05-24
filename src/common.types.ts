type Brand<K, T> = K & { __brand: T };
export type Gender = Brand<string, 'gender'>;
export type Birth = Brand<string, 'birth'>;
export type Email = Brand<string, 'email'>;
export type KoreanPhoneNumber = Brand<string, 'koreanPhoneNumber'>;
export type Password = Brand<string, 'password'>;
export type UserName = Brand<string, 'userName'>;
export type Nullable<T> = T | null;
