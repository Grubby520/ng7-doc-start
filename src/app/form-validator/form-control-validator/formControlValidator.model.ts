export class FormControlValidatorModel {
  name: string; // 姓名
  age: string; // 年龄
  hobbyList: string[]; // 爱好
  sex: string; // 性别
  telephone: string; // 手机号码

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.age = data.age || '';
    this.hobbyList = data.hobbyList || [];
    this.sex = data.sex || '';
    this.telephone = data.telephone || '';
  }
}
