type PatchObj = {
  /**
   * File where this patch occurs
   */
  file: string;

  /**
   * Starting line number of patch
   */
  start: number;

  /**
   * Ending line number of patch
   */
  end: number;

  /**
   * The patch contents
   */
  lines: string[];
};

export type Patch = {
  removed: PatchObj;
  added: PatchObj;
};

export type Token = {
  name: string;
  symbol: string;
  address: string;
  decimals:number;
  logoURI: string;
};

export type SolanaFmToken = {
  mint: string;
  tokenName: string;
  symbol: string;
  decimals:number;
  description: string;
  logo: string;
  tags: string[];
  verified: boolean;
};

export type ValidatedSet = {
  mints: Set<string>;
  names: Set<string>;
  symbols: Set<string>;
  logoURL: Set<string>;
}

export enum ValidationError {
  UNRELATED_FILE = "Changes made to unrelated files",
  UNRELATED_CODE = "Changes to unrelated code are not allowed",
  MULTIPLE_TOKENS = "Only one token can be added at a time",
  DUPLICATE_NAME = "Token name already exists",
  DUPLICATE_SYMBOL = "Token symbol already exists",
  DUPLICATE_MINT = "Mint already exists",
  INVALID_MINT = "Invalid mint address, not on ed25519 curve",
  INVALID_DECIMALS = "Invalid decimals",
  INVALID_IMAGE_URL = "Invalid image URL",
  INVALID_COMMUNITY_VALIDATED = "Invalid community validated"
}