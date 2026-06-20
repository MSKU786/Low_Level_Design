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

interface NotificationUIFactory {
  createToast(): Toast;
  createAlert(): Alert;
  createBanner(): Banner;
}

class WebToast implements Toast {
  constructor() {}

  show(message: string, duration: number): Promise<void> {
    console.log(`Message from webtoast ${message} for duratoin ${duration}`);
    return Promise.resolve();
  }
}

class WebAlert implements Alert {
  show(
    titla: string,
    message: string,
    onConfirm: () => Promise<void>,
    onCancel: () => Promise<void>,
  ): Promise<void> {
    console.log(`wEB ALERT ${titla} and ${message}`);
    return Promise.resolve();
  }
}

class WebBanner implements Banner {
  show(message: string, type: BannerType): Promise<void> {
    return Promise.resolve();
  }

  dismiss(): Promise<void> {
    return Promise.resolve();
  }
}

class IOSToast implements Toast {
  constructor() {}

  show(message: string, duration: number): Promise<void> {
    console.log(`Message from IOStoast ${message} for duratoin ${duration}`);
    return Promise.resolve();
  }
}

class IOSAlert implements Alert {
  show(
    titla: string,
    message: string,
    onConfirm: () => Promise<void>,
    onCancel: () => Promise<void>,
  ): Promise<void> {
    console.log(`IOS ALERT ${titla} and ${message}`);
    return Promise.resolve();
  }
}

class IOSBanner implements Banner {
  show(message: string, type: BannerType): Promise<void> {
    return Promise.resolve();
  }

  dismiss(): Promise<void> {
    return Promise.resolve();
  }
}

class WebNotificationFactory implements NotificationUIFactory {
  createAlert(): Alert {
    return new WebAlert();
  }

  createBanner(): Banner {
    return new WebBanner();
  }

  createToast(): Toast {
    return new WebToast();
  }
}

class IOSNotificationFactory implements NotificationUIFactory {
  createAlert(): Alert {
    return new IOSAlert();
  }

  createBanner(): Banner {
    return new IOSBanner();
  }

  createToast(): Toast {
    return new IOSToast();
  }
}
