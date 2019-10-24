const crypto = require('crypto');

const base32Encode = require('base32-encode');
const uuid4 = require('uuid/v4');


// Here, sizeBytes is the number of bytes in the ID.
function generateId(sizeBytes: number): string {
  // Start by generating some random bytes.
  const bytes = crypto.randomBytes(sizeBytes);
  // Return the Crockford Base 32 encoding.
  return base32Encode(bytes, 'Crockford');
}

function calculateChecksum(bytes: Buffer): number {
  // Start by converting the byte value in a Buffer to a BigInt.
  const intValue = bytes.readBigInt64BE(0);
  // Return the remainder after dividing by 37, converted to a Number value.
  return Number(value % BigInt(37)).valueOf();
}

function getChecksumCharacter(checksumValue: number): string {
  // Define the alphabet (Base 32 + the 5 additional characters).
  const alphabet = '0123456789ABCDEFGHJKLMNPQRSTVWXYZ*~$=U';
  // Return the character at position checksumValue.
  return alphabet[checksumValue];
}

function generateIdWithChecksum(size: number): string {
  const bytes = crypto.randomBytes(size);
  // Calculate the checksum and get the correct checksum character.
  const checksumChar = getChecksumCharacter(calculateChecksum(bytes));
  // Return the Base 32 serialized identifier with the checksum character appended.
  return base32Encode(bytes, 'Crockford') + checksumChar;
}

function verifyId(identifier: string): boolean {
  // Split the identifier into two pieces: the value and the checksum character.
  const value = identifier.substring(0, identifier.length-1);
  const checksumChar = identifier[identifier.length-1];
  // Decode the Base 32 value into its raw bytes.
  const buffer = Buffer.from(base32Decode(value, 'Crockford'));
  // Return whether the calculated checksum value is equal to the provided one.
  return getChecksumCharacter(calculateChecksum(buffer)) != checksumChar);
}

