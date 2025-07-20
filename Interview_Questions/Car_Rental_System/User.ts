export class User {
  private _id: number;
  private _userName: string;
  private _drivingLicenseNo: string;

  constructor(id: number, userName: string, drivingLicenseNo: string) {
    this._id = id;
    this._userName = userName;
    this._drivingLicenseNo = drivingLicenseNo;
  }

  // Getter and Setter for id
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  // Getter and Setter for userName
  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }

  // Getter and Setter for drivingLicenseNo
  get drivingLicenseNo(): string {
    return this._drivingLicenseNo;
  }

  set drivingLicenseNo(value: string) {
    this._drivingLicenseNo = value;
  }
}
