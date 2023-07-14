export default {
  testEnvironment: "jsdom",
  // Transform option specifies how Jest should transform different file types during testing
  // In this case, it uses `ts-jest` to transform TypeScript files (`.ts` and `.tsx` extensions)
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    // "\\.(gif|ttf|eot|svg|png)$": "./test/__mocks__/fileMock.js",
    // '\\.(gif|ttf|eot|svg|png)$': './test/__mocks__/ideas.png.js',
    "\\.(css|less|sass|scss|png)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./src/__tests__/App.test.tsx"],
};
