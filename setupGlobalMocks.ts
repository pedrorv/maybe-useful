class MockMutationObserver implements MutationObserver {
  disconnect() {}
  observe() {}
  takeRecords(): MutationRecord[] {
    return [];
  }
}

global.MutationObserver = MockMutationObserver;

// @ts-ignore
global.window.screen.orientation = { type: "" };
