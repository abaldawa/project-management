/**
 * @author Abhijit Baldawa
 */

export interface ProjectPhase {
  id: string;
  name: string;
  discountOrFee?:
    | { type: "DISCOUNT"; discount: number }
    | { type: "FEES"; fees: number };
}
