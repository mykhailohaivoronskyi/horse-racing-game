import { describe, it, expect } from 'vitest'
import { getOrdinalSuffix, pickRandomUnique } from '../../src/utils/common'

describe('common utilities edge cases', () => {
  describe('getOrdinalSuffix', () => {
    it('should handle 11th, 12th, and 13th correctly', () => {
      expect(getOrdinalSuffix(11)).toBe('11th')
      expect(getOrdinalSuffix(12)).toBe('12th')
      expect(getOrdinalSuffix(13)).toBe('13th')
    })

    it('should handle typical suffixes', () => {
      expect(getOrdinalSuffix(1)).toBe('1st')
      expect(getOrdinalSuffix(2)).toBe('2nd')
      expect(getOrdinalSuffix(3)).toBe('3rd')
      expect(getOrdinalSuffix(4)).toBe('4th')
      expect(getOrdinalSuffix(21)).toBe('21st')
      expect(getOrdinalSuffix(22)).toBe('22nd')
      expect(getOrdinalSuffix(23)).toBe('23rd')
      expect(getOrdinalSuffix(24)).toBe('24th')
    })
  })

  describe('pickRandomUnique', () => {
    it('should return an empty array when picking 0 items from an empty array', () => {
      expect(pickRandomUnique([], 0)).toEqual([])
    })

    it('should return the entire array when requesting more items than available', () => {
      const arr = [1, 2, 3]
      const result = pickRandomUnique(arr, 5)
      // Should return all unique items from the original array
      expect(result.sort()).toEqual(arr)
      expect(result).toHaveLength(arr.length)
    })

    it('should clamp negative count to zero and return empty array', () => {
      const arr = [1, 2, 3]
      expect(pickRandomUnique(arr, -2)).toEqual([])
    })
  })

})
