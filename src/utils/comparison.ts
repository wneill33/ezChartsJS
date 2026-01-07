/**
 * Utility functions for comparing values in React.memo
 */

/**
 * Performs a shallow equality check between two objects
 * Used for custom comparison in React.memo
 *
 * @param objA - First object to compare
 * @param objB - Second object to compare
 * @returns true if objects are shallowly equal, false otherwise
 */
export function shallowEqual(
  objA: Record<string, any>,
  objB: Record<string, any>
): boolean {
  if (objA === objB) return true;

  if (!objA || !objB) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];

    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

/**
 * Compares two arrays for shallow equality
 * Useful for comparing data arrays in chart props
 */
export function shallowArrayEqual<T>(arrA: T[], arrB: T[]): boolean {
  if (arrA === arrB) return true;

  if (!arrA || !arrB) return false;

  if (arrA.length !== arrB.length) return false;

  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) {
      return false;
    }
  }

  return true;
}
