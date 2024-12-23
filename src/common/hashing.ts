import * as bcrypt from 'bcryptjs';

export async function hashString(input: string): Promise<string> {
  const saltRounds = 10;
  const hashedString = await bcrypt.hash(input, saltRounds);
  return hashedString;
}

export async function compareHashedString(
  input: string,
  hashedString: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(input, hashedString);
  return isMatch;
}
