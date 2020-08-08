export default class JSMpegWritableSource {
  constructor(url: string, options: any);
  connect(destination: any);
  resume(): void;
  destroy(): void;
  write(data: any): void;
}
