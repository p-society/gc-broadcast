export type InternalQueryOption<T = any> = {
  $select?: keyof T | (keyof T)[] | Record<keyof T, 1 | 0>;
 
  
  $sort?: Partial<Record<keyof T, 1 | -1>>;


  $limit?: number | string;


  $skip?: number | string;


  $populate?: string | object | Array<string | object>;


  $paginate?: true | false | 'true' | 'false';


  $or?: Array<Partial<Record<keyof T, any>>>;


  $regex?: Partial<Record<keyof T, string | RegExp>>;


  $in?: Partial<Record<keyof T, T[keyof T][]>>;


  $nin?: Partial<Record<keyof T, T[keyof T][]>>;


  $lt?: Partial<Record<keyof T, T[keyof T]>>;


  $lte?: Partial<Record<keyof T, T[keyof T]>>;


  $gt?: Partial<Record<keyof T, T[keyof T]>>;


  $gte?: Partial<Record<keyof T, T[keyof T]>>;


  $ne?: Partial<Record<keyof T, T[keyof T]>>;


  $exists?: Partial<Record<keyof T, boolean>>;
} & Partial<Record<keyof T, any>>;
