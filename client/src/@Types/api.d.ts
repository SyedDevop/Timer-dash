export interface ConsolesApi {
  gpio: number;
  id: string;
  name: string;
  windowsId: number | null;
}

export interface GpiosApi {
  id: number;
  io: number;
  available: boolean;
  consoleId: string | null;
  windowsId: number | null;
  windows: WindowsApi | null;
}

export interface WindowsApi {
  id: number;
  name: string | null;
}
