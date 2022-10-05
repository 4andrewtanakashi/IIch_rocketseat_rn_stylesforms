module.exports =  {
  preset: "jest-expo",
  testPathIgnore: [
    '/node_modules',
    '/android',
    '/ios'
  ],
  setupFilesAfterEnv: [
      "@testing-library/jest-native/extend-expect"
  ]
}