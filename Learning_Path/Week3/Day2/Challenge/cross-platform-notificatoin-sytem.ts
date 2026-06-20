// Each platform has it's own implemenation of toast alert banner
enum BannerType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

interface Toast {
  show(message: string, duration: number): Promise<void>;
}

interface Alert {
  show(
    titla: string,
    message: string,
    onConfirm: () => Promise<void>,
    onCancel: () => Promise<void>,
  ): Promise<void>;
}

interface Banner {
  show(message: string, type: BannerType): Promise<void>;
  dismiss(): Promise<void>;
}
