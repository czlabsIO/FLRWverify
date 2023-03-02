import { Token, ValidatedSet } from "../../types/types";
import fetch from "node-fetch";

/** Read existing validated tokens into Set */
export async function getJupAll(): Promise<string[]> {
  try {
    const data = await fetch(`https://token.jup.ag/all`)
    const tokens = await data.json()
    return tokens.map((token: Token) => token.address)
  } catch (error: any) {
    throw new Error("Failed to fetch tokens from jup ALL list");
  }
}
