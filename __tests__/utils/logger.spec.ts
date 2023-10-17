import { setDryRun } from "@/utils/common";
import { clearEvents, getEvents, logEvent } from "@/utils/logger";

describe("Logger", () => {
  beforeEach(() => {
    clearEvents();
    setDryRun(true);
  });

  it("logs an event", () => {
    const mockedEvent = { isMock: true };

    logEvent(mockedEvent as any);

    expect(getEvents()).toEqual([mockedEvent]);
  });

  it("returns all logged events", () => {
    const mockedEvent = { isMock: true };

    logEvent(mockedEvent as any);
    logEvent(mockedEvent as any);
    logEvent(mockedEvent as any);

    expect(getEvents()).toEqual([mockedEvent, mockedEvent, mockedEvent]);
  });

  it("clears all logged events", () => {
    const mockedEvent = { isMock: true };

    logEvent(mockedEvent as any);
    logEvent(mockedEvent as any);
    logEvent(mockedEvent as any);

    expect(getEvents().length).toBe(3);

    clearEvents();

    expect(getEvents().length).toBe(0);
  });
});
