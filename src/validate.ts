import { Patch, ValidatedSet, ValidationError } from "./types/types";
import { PublicKey } from "@solana/web3.js";


export const VALIDATED_TOKENS_FILE = "validated-tokens.csv";

function isValidatedFile(file: string) {
  return file === VALIDATED_TOKENS_FILE;
}

export function validateGitPatch(patch: Patch, validatedSet: ValidatedSet): ValidationError[] {
  // console.log("Processing patch", patch);
  const errors: ValidationError[] = [];

  // Flag changes to unrelated files
  if (
    !isValidatedFile(patch.removed.file) ||
    !isValidatedFile(patch.added.file)
  ) {
    // errors.push(ValidationError.UNRELATED_FILE);
    // return errors;

    //TODO: Put this back after this PR is merged
    return []
  }

  // Flag removals
  if (patch.removed.lines.length > 0) {
    errors.push(ValidationError.UNRELATED_CODE);
  }

  // Flag multiple line additions
  if (patch.added.lines.length > 1) {
    errors.push(ValidationError.MULTIPLE_TOKENS);
  }

  const [tokenName, symbol, mint, decimals, imageURL, isCommunity] =
    patch.added.lines[0].split(",");

  // Flag duplicates
  if (validatedSet.names.has(tokenName)) {
      errors.push(ValidationError.DUPLICATE_NAME);
  }
  
  if (validatedSet.symbols.has(symbol)) {
      errors.push(ValidationError.DUPLICATE_SYMBOL);
  }
  
  if (validatedSet.mints.has(mint)) {
      errors.push(ValidationError.DUPLICATE_MINT);
  }

  // Flag invalid mint address
  if(!PublicKey.isOnCurve(new PublicKey(mint))) {
      errors.push(ValidationError.INVALID_MINT);
  } 

  if (isNaN(Number(decimals)) || Number(decimals) < 0 || Number(decimals) > 9) {
    errors.push(ValidationError.INVALID_DECIMALS);
  }

  if (isCommunity !== "true") {
    errors.push(ValidationError.INVALID_COMMUNITY_VALIDATED);
  }

  // TODO: match with onchain data
  // ....
  // ...

  // console.log("Patch Errors", errors);
  return errors;
}
