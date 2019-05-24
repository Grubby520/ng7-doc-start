export class HomeModel {
  name: string; // 姓名
  age: string; // 年龄
  hobbyList: string[]; // 爱好
  sex: string; // 性别

  constructor(data: any = {}) {
    this.name = data.name || '';
    this.age = data.age || '';
    this.hobbyList = data.hobbyList || [];
    this.sex = data.sex || '';
  }
}
