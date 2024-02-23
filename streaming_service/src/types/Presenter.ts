export abstract class Presenter {
  protected timeout: NodeJS.Timeout | null = null;
  abstract renderEl(): void;
  protected abstract activate(): void;
  protected abstract deactivate(): void;
}
