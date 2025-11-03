/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end] ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // We will sort it first
  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [start, end] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [currStart, currEnd] = ranges[i];

    // If current range overlaps or the gap less than or equal to threshold, we will merge them
    if (currStart <= end + threshold) {
      end = Math.max(end, currEnd);
    } else {
      merged.push([start, end]);
      [start, end] = [currStart, currEnd];
    }
  }

  merged.push([start, end]);
  return merged;
};

module.exports = {
  mergeTimeRanges,
};
