/**
 * @author Abhijit Baldawa
 */

export interface CostItem {
  id: string;
  description: string;
  taxRateInPercent: number; // one of three tax rates, incl. 0%, is added
  billedBy:
    | {
        type: "HOUR";
        totalHours: number;
        costPerHour: number;
      }
    | {
        type: "UNITS";
        totalUnits: number;
        costPerUnit: number;
      };
}
