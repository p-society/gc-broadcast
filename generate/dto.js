const getDto = (Name) => `export class Create${Name}Dto {
  readonly name: string;
}
`;

module.exports = getDto;
