type Brand<K, T> = K & { __brand: T };
export type Gender = Brand<string, 'gender'>;
export type Birth = Brand<string, 'birth'>;
export type Email = Brand<string, 'email'>;
export type PhoneNumber = Brand<string, 'phoneNumber'>;
export type Password = Brand<string, 'password'>;
