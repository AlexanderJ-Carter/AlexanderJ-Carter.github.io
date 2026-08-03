/**
 * Shared NEXUS local state — rooms, energy, fragments.
 * Browser-only; safe to import from client scripts.
 */

export const NEXUS_STORAGE_KEY = 'nexus-state-v1';
export const NEXUS_EVENT = 'nexus:state';

export type NexusRoomId = 'signal' | 'exposure' | 'atlas' | 'echo';

export type NexusState = {
  v: 1;
  visited: NexusRoomId[];
  energy: number;
  fragments: string[];
  lastRoom: NexusRoomId | null;
  updatedAt: number;
};

export function emptyNexusState(): NexusState {
  return {
    v: 1,
    visited: [],
    energy: 0,
    fragments: [],
    lastRoom: null,
    updatedAt: Date.now(),
  };
}

export function readNexusState(): NexusState {
  try {
    const raw = localStorage.getItem(NEXUS_STORAGE_KEY);
    if (!raw) return emptyNexusState();
    const parsed = JSON.parse(raw) as Partial<NexusState>;
    if (parsed.v !== 1) return emptyNexusState();
    return {
      ...emptyNexusState(),
      ...parsed,
      visited: Array.isArray(parsed.visited) ? parsed.visited : [],
      fragments: Array.isArray(parsed.fragments) ? parsed.fragments : [],
    };
  } catch {
    return emptyNexusState();
  }
}

export function writeNexusState(state: NexusState): void {
  const next = { ...state, updatedAt: Date.now() };
  localStorage.setItem(NEXUS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(NEXUS_EVENT, { detail: next }));
}

export function markRoomVisited(room: NexusRoomId): NexusState {
  const state = readNexusState();
  if (!state.visited.includes(room)) {
    state.visited = [...state.visited, room];
    state.energy = Math.min(100, state.energy + 20);
  }
  state.lastRoom = room;
  writeNexusState(state);
  return state;
}

export function addFragment(id: string): NexusState {
  const state = readNexusState();
  if (!state.fragments.includes(id)) {
    state.fragments = [...state.fragments, id];
    state.energy = Math.min(100, state.energy + 10);
    writeNexusState(state);
  }
  return state;
}
