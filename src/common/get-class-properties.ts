export default function getClassProperties(cls) {
  const obj = new cls();
  return Object.getOwnPropertyNames(obj).filter((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(cls.prototype, key);
    return descriptor && typeof descriptor.value === 'undefined'; // Only properties
  });
}
