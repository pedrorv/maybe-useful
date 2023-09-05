class MockMutationObserver implements MutationObserver {
  disconnect() {}
  observe() {}
  takeRecords(): MutationRecord[] {
    return [];
  }
}

global.MutationObserver = MockMutationObserver;
