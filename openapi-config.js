/** @type {import('@rtk-query/codegen-openapi').ConfigFile} */
const config = {
  schemaFile: 'http://localhost:8000/api/schema/?format=json',
  apiFile: './src/redux/slices/api/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: './src/redux/slices/api/generatedApi.ts',
  exportName: 'generatedApi',
  hooks: true,
  useEnumType: true
}

module.exports = config
