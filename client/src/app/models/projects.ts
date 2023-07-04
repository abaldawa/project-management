/**
 * @author Abhijit Baldawa
 */

export interface Project {
  id: string;
  name: string;
  discountOrFee?:
    | { type: "DISCOUNT"; discount: number }
    | { type: "FEES"; fees: number };
}
