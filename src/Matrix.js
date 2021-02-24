/**
 * Class representing a matrix. <br/>
 * Internally matrix's elements are stored in two dimensional array.
 */
class Matrix {
  /**
   * Creates a new matrix.
   *
   * @param  {...any} args arguments
   * @example
   * const A = new Matrix();
   * // A = [ ]
   *
   * const B = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
   * //     [ 1 2 3 ]
   * // B = [ 4 5 6 ]
   * //     [ 7 8 9 ]
   */
  constructor(...args) {
    /**
     * matrix elements
     * @type {Array<Array<number>>}
     * @readonly
     * @example
     * //     [ 1 2 3 ]
     * // A = [ 4 5 6 ]
     * //     [ 7 8 9 ]
     *
     * console.log(A.elements); // [[1,2,3], [4,5,6], [7,8,9]];
     */
    this.elements = null;
    // TODO: implement getter/setter
    // TODO: getter - return copy
    // TODO: setter - throw error

    /**
     * number of rows
     * @type {Number}
     * @readonly
     * @example
     * //     [ 1 1 1 1 ]
     * // A = [ 2 2 2 2 ]
     * //     [ 3 3 3 3 ]
     *
     * console.log(A.rows); // 3
     */
    this.rows = null;

    /**
     * number of columns
     * @type {Number}
     * @readonly
     * @example
     * //     [ 1 1 1 1 ]
     * // A = [ 2 2 2 2 ]
     * //     [ 3 3 3 3 ]
     *
     * console.log(A.columns) // 4
     */
    this.columns = null;

    // new Matrix();
    if (args.length === 0) {
      this.rows = 0;
      this.columns = 0;
      this.elements = [];
      // eslint-disable-next-line brace-style
    }

    // new Matrix(rows);
    else if (args.length === 1 && Array.isArray(args[0])) {
      const rowArray = args[0];

      // validate arguments
      // TODO: add validation and tests

      this.rows = rowArray.length;
      this.columns = rowArray[0].length;
      this.elements = rowArray.map((row) => row.slice());

      // eslint-disable-next-line brace-style
    }

    // Invalid Arguments
    else {
      throw new TypeError('invalid arguments');
    }
  }

  /**
   * Returns number of rows.
   *
   * @returns {Number}
   * @example
   * //     [ 1  2  3  4 ]
   * // A = [ 5  6  7  8 ]
   * //     [ 9 10 11 12 ]
   *
   * A.getRowDimension(); // 3
   * */
  getRowDimension() {
    return this.rows;
  }

  /**
   * Returns number of columns.
   *
   * @returns {Number}
   * @example
   * //     [ 1  2  3  4 ]
   * // A = [ 5  6  7  8 ]
   * //     [ 9 10 11 12 ]
   *
   * A.getColumnDimension(); // 4
   * */
  getColumnDimension() {
    return this.columns;
  }

  /**
   * Returns matrix dimensions.
   *
   * @returns {{columns: Number, rows: Number}}
   * object with <b>rows</b> and <b>columns</b> properties
   * @example
   * //     [ 1  2  3  4 ]
   * // A = [ 5  6  7  8 ]
   * //     [ 9 10 11 12 ]
   *
   * A.getDimensions(); // {columns: 4, rows: 3}
   *
   */
  getDimensions() {
    return {
      columns: this.columns,
      rows: this.rows,
    };
  }

  /**
   * Returns array of rows. </br>
   * Creates new array, you can't affect matrix by modifying returned array.
   * @returns {Array<Array<number>>}
   * @example
   * //     [ 1  2  3  4 ]
   * // A = [ 5  6  7  8 ]
   * //     [ 9 10 11 12 ]
   *
   * A.getElements(); // [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
   */
  getElements() {
    return this.elements.map((row) => row.slice());
  }

  /**
   * Get element specified by column and row.
   *
   * @param {number} column   column index - indexed from zero
   * @param {number} row      row index - indexed from zero
   * @return {number}         element specified by column and row
   * @throws {TypeError}      if the row or column is not a number type
   * @throws {RangeError}     if the row or column index is not valid
   * @example
   * //     [ 1  2  3  4 ]
   * // A = [ 5  6  7  8 ]
   * //     [ 9 10 11 12 ]
   *
   * A.getElement(3, 1); // 8
   */
  getElement(column, row) {
    // check arguments type
    if (typeof (column) !== 'number') throw new TypeError('column should be a number');
    if (typeof (row) !== 'number') throw new TypeError('row should be a number');

    // check arguments range
    if (!Matrix.isIntegerInRange(column, 0, this.columns - 1)) throw new RangeError('column - invalid range');
    if (!Matrix.isIntegerInRange(row, 0, this.rows - 1)) throw new RangeError('row - invalid range');

    // return element
    return this.elements[row][column];
  }

  /**
   * Set matrix element specified by column and row.
   *
   * @param {number} column   column index - indexed from zero
   * @param {number} row      row index - indexed from zero
   * @param {number} value    element value
   * @throws {TypeError}      if the row or column is not a number type
   * @throws {RangeError}     if the row or column index is not valid
   * @example
   * //     [ 0 0 0 0 ]       [ 0 0 0 0 ]
   * // A = [ 0 0 0 0 ]  -->  [ 0 0 7 0 ]
   * //     [ 0 0 0 0 ]       [ 0 0 0 0 ]
   *
   * A.setElement(2, 1, 7);
   */
  setElement(column, row, value) {
    // check arguments type
    if (typeof (column) !== 'number') throw new TypeError('column should be a number');
    if (typeof (row) !== 'number') throw new TypeError('row should be a number');
    if (typeof (value) !== 'number') throw new TypeError('value should be a number');

    // check arguments range
    if (!Matrix.isIntegerInRange(column, 0, this.columns - 1)) throw new RangeError('column - invalid range');
    if (!Matrix.isIntegerInRange(row, 0, this.rows - 1)) throw new RangeError('row - invalid range');

    // update element
    this.elements[row][column] = value;
  }

  /**
   * Checks if given element is integer in range from min to max.
   *
   * @param {number} element
   * @param {number} min
   * @param {number} max
   * @return {boolean}
   * @private
   */
  static isIntegerInRange(element, min, max) {
    if (!Number.isInteger(element)) return false;

    return !(element < min || element > max);
  }
}

export { Matrix as default };
