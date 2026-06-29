import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["problems/**/*.test.ts"],
    globals: false,
  },
});
