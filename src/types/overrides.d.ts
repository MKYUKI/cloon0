// src/types/overrides.d.ts

declare module '@tsparticles/engine' {
    // Engineを強引にclass扱いする
    export class Engine {
      // ここに最低限のメソッドを型定義しておく or unknown
      public someMethod?: () => void;
    }
  }
  