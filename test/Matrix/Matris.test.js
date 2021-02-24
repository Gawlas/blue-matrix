import { describe, test } from '@jest/globals';
import Matrix from '../../src/Matrix';

describe('Matrix', () => {
  describe('constructor', () => {
    test('should create empty matrix if no args provided', () => {
      const A = new Matrix();

      expect(A.columns).toEqual(0);
      expect(A.rows).toEqual(0);
      expect(A.elements).toEqual([]);
    });

    test('should create matrix from rows array', () => {
      const A = new Matrix([[1]]);
      expect(A.columns).toEqual(1);
      expect(A.rows).toEqual(1);
      expect(A.elements).toEqual([[1]]);

      const B = new Matrix([[1, 2], [3, 4]]);
      expect(B.columns).toEqual(2);
      expect(B.rows).toEqual(2);
      expect(B.elements).toEqual([[1, 2], [3, 4]]);

      const C = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      expect(C.columns).toEqual(3);
      expect(C.rows).toEqual(3);
      expect(C.elements).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    });

    test('should throw TypeError if constructor called with non supported arguments', () => {
      expect(() => new Matrix(0)).toThrow(TypeError);
      expect(() => new Matrix(1)).toThrow(TypeError);
      expect(() => new Matrix(1, 2)).toThrow(TypeError);
      expect(() => new Matrix(1, 3, 4)).toThrow(TypeError);
      expect(() => new Matrix('string')).toThrow(TypeError);
      expect(() => new Matrix({ column: 1, row: 1 })).toThrow(TypeError);
      expect(() => new Matrix([1, 2, 3], [4, 5, 6], [7, 8, 9])).toThrow(TypeError);
    });
  });

  describe('getRowDimension', () => {
    test('should return correct row dimension', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const B = new Matrix();

      expect(A.getRowDimension()).toEqual(3);
      expect(B.getRowDimension()).toEqual(0);
    });

    test('should return number', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const B = new Matrix();

      expect(A.getRowDimension()).toStrictEqual(3); // check if type is number
      expect(B.getRowDimension()).toStrictEqual(0); // check if type is number
    });
  });

  describe('getColumnDimension', () => {
    test('should return correct column dimension', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const B = new Matrix();

      expect(A.getColumnDimension()).toEqual(4);
      expect(B.getColumnDimension()).toEqual(0);
    });

    test('should return number', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const B = new Matrix();

      expect(A.getColumnDimension()).toStrictEqual(4); // check if type is number
      expect(B.getColumnDimension()).toStrictEqual(0); // check if type is number
    });
  });

  describe('getElements', () => {
    test('should return correct elements', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const B = new Matrix();

      expect(A.getElements()).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      expect(B.getElements()).toEqual([]);
    });

    test('call should not affect object', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);

      A.getElements();

      expect(A.getColumnDimension()).toStrictEqual(4);
      expect(A.getRowDimension()).toStrictEqual(3);
      expect(A.elements).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
    });

    test('should not return reference to any instance variables', () => {
      const A = new Matrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
      const elements = A.getElements();
      elements[0][0] = 4;
      elements[1] = {};

      expect(A.getElement(0, 0)).toEqual(1);
      expect(A.getElement(0, 1)).toEqual(5);
    });
  });

  describe('getElement', () => {
    test('should return correct element', () => {
      //     [ 1 2 3 ]
      // A = [ 4 5 6 ]
      //     [ 7 8 9 ]
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.getElement(0, 0)).toEqual(1);
      expect(A.getElement(1, 0)).toEqual(2);
      expect(A.getElement(2, 0)).toEqual(3);
      expect(A.getElement(0, 2)).toEqual(7);
      expect(A.getElement(1, 2)).toEqual(8);
      expect(A.getElement(2, 2)).toEqual(9);
    });

    test('should throw TypeError if called without arguments', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.getElement).toThrow(TypeError);
    });

    test('should throw TypeError if index arguments have incorrect type', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.getElement.bind(A, '1', 1)).toThrow(TypeError);
      expect(A.getElement.bind(A, 1, null)).toThrow(TypeError);
      expect(A.getElement.bind(A, 1, [1, 2, 3])).toThrow(TypeError);
      expect(A.getElement.bind(A, 1, { a: 1, b: 1 })).toThrow(TypeError);
      expect(A.getElement.bind(A, true, 1)).toThrow(TypeError);
    });

    test('should throw RangeError if invalid index arguments', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      // negative numbers
      expect(A.getElement.bind(A, 1, -1)).toThrow(RangeError);
      expect(A.getElement.bind(A, -12, 0)).toThrow(RangeError);
      expect(A.getElement.bind(A, 1, -10)).toThrow(RangeError);

      // non integers
      expect(A.getElement.bind(A, 1, 1.5)).toThrow(RangeError);
      expect(A.getElement.bind(A, -1.2, 0)).toThrow(RangeError);
      expect(A.getElement.bind(A, 1, -11.3)).toThrow(RangeError);
      expect(A.getElement.bind(A, 1, Infinity)).toThrow(RangeError);
      expect(A.getElement.bind(A, -Infinity, 1)).toThrow(RangeError);

      // out of matrix range
      expect(A.getElement.bind(A, 1, 3)).toThrow(RangeError);
      expect(A.getElement.bind(A, 3, 0)).toThrow(RangeError);
    });
  });

  describe('setElement', () => {
    test('should set correct element', () => {
      //     [ 0 0 0 ]
      // A = [ 0 0 0 ]
      //     [ 0 0 0 ]
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      A.setElement(0, 0, 1);
      expect(A.elements[0][0]).toEqual(1);

      A.setElement(1, 0, 2);
      expect(A.elements[0][1]).toEqual(2);

      A.setElement(2, 0, 3);
      expect(A.elements[0][2]).toEqual(3);

      A.setElement(0, 2, 7);
      expect(A.elements[2][0]).toEqual(7);

      A.setElement(1, 2, 8);
      expect(A.elements[2][1]).toEqual(8);

      A.setElement(2, 2, 9);
      expect(A.elements[2][2]).toEqual(9);
    });

    test('should throw TypeError if called without arguments', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.setElement).toThrow(TypeError);
    });

    test('should throw TypeError if index arguments have incorrect type', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.setElement.bind(A, '1', 1, 1)).toThrow(TypeError);
      expect(A.setElement.bind(A, 1, '1', 1)).toThrow(TypeError);
      expect(A.setElement.bind(A, 1, null, 1)).toThrow(TypeError);
      expect(A.setElement.bind(A, true, 1, 5)).toThrow(TypeError);
    });

    test('should throw TypeError if value argument has incorrect type', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      expect(A.setElement.bind(A, 1, 1, '1')).toThrow(TypeError);
      expect(A.setElement.bind(A, 1, 1, null)).toThrow(TypeError);
      expect(A.setElement.bind(A, 1, 1, true)).toThrow(TypeError);
      expect(A.setElement.bind(A, 1, 1, [1, 2, 3])).toThrow(TypeError);
    });

    test('should throw RangeError if invalid index arguments', () => {
      const A = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

      // indexes - negative numbers
      expect(A.setElement.bind(A, 1, -1, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, -12, 0, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, 1, -10, 5)).toThrow(RangeError);

      // indexes - non integers
      expect(A.setElement.bind(A, 1, 1.5, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, -1.2, 0, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, 1, -11.3, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, 1, Infinity, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, -Infinity, 1, 5)).toThrow(RangeError);

      // indexes - out of matrix range
      expect(A.setElement.bind(A, 1, 3, 5)).toThrow(RangeError);
      expect(A.setElement.bind(A, 3, 0, 5)).toThrow(RangeError);
    });
  });
});
