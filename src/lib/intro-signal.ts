// 인트로 애니메이션 완료 신호를 컴포넌트 간 공유.
// 마운트 순서와 무관하게: 이미 끝났으면 콜백 즉시 실행, 아니면 끝날 때 실행.

let done = false;
const listeners = new Set<() => void>();

export function markIntroDone(): void {
  if (done) return;
  done = true;
  listeners.forEach((l) => l());
  listeners.clear();
}

export function isIntroDone(): boolean {
  return done;
}

// 인트로 완료 시 콜백 실행. 이미 완료됐으면 즉시 실행. 구독 해제 함수 반환.
export function onIntroDone(cb: () => void): () => void {
  if (done) {
    cb();
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
