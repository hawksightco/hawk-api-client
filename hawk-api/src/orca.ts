import * as web3 from "@solana/web3.js";
import tiny_invariant from "tiny-invariant";

export const TICK_ARRAY_SIZE = 88;
export const MIN_TICK_INDEX = -443636;
export const MAX_TICK_INDEX = 443636;
export const PDA_TICK_ARRAY_SEED = "tick_array";

/**
 * Get the PDA of the tick array containing tickIndex.
 * tickArrayOffset can be used to get neighboring tick arrays.
 *
 * @param tickIndex
 * @param tickSpacing
 * @param whirlpool
 * @param programId
 * @param tickArrayOffset
 * @returns
 */
export function getTickArrayFromTickIndex(tickIndex: number, tickSpacing: number, whirlpool: web3.PublicKey, programId: web3.PublicKey, tickArrayOffset: number = 0) {
  const startIndex = getStartTickIndex(tickIndex, tickSpacing, tickArrayOffset);
  return getTickArray(programId, whirlpool, startIndex);
}

/**
 * Get the startIndex of the tick array containing tickIndex.
 *
 * @param tickIndex
 * @param tickSpacing
 * @param offset can be used to get neighboring tick array startIndex.
 * @returns
 */
export function getStartTickIndex(tickIndex: number, tickSpacing: number, offset: number = 0) {
  const realIndex = Math.floor(tickIndex / tickSpacing / TICK_ARRAY_SIZE);
  const startTickIndex = (realIndex + offset) * tickSpacing * TICK_ARRAY_SIZE;
  const ticksInArray = TICK_ARRAY_SIZE * tickSpacing;
  const minTickIndex = MIN_TICK_INDEX - ((MIN_TICK_INDEX % ticksInArray) + ticksInArray);
  tiny_invariant(startTickIndex >= minTickIndex, `startTickIndex is too small - - ${startTickIndex}`);
  tiny_invariant(startTickIndex <= MAX_TICK_INDEX, `startTickIndex is too large - ${startTickIndex}`);
  return startTickIndex;
}

/**
 * @category Program Derived Addresses
 * @param programId
 * @param whirlpoolAddress
 * @param startTick
 * @returns
 */
export function getTickArray(programId: web3.PublicKey, whirlpoolAddress: web3.PublicKey, startTick: number) {
  const [publicKey, bump] = web3.PublicKey.findProgramAddressSync([
    Buffer.from(PDA_TICK_ARRAY_SEED),
    whirlpoolAddress.toBuffer(),
    Buffer.from(startTick.toString()),
  ], programId);
  return { bump, publicKey };
}
