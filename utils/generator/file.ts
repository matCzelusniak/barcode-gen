import Code from "@/utils/code/code";

abstract class File {
  protected codes: Code[];
  constructor(_codes: Code[]) {
    this.codes = _codes;
  }
  public abstract getFile(): Promise<JSX.Element>;
}

export default File;
