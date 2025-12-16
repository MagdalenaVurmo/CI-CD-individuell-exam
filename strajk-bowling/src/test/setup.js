import { beforeAll, afterEach, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { server } from "../__tests__/mocks/server";

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))

afterEach(() => {
    cleanup()
server.resetHandlers()
})

afterAll(() => server.close())