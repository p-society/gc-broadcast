import { Types } from 'mongoose';

export const processFilter = (obj: Record<string, any>) => {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === 'object' && val !== null) {
      processFilter(val);
    } else if (Types.ObjectId.isValid(val)) {
      obj[key] = new Types.ObjectId(val);
    }
  }
};
