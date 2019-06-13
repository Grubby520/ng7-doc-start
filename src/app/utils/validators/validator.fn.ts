import { FormControl } from '@angular/forms';

export function nameValid(control: FormControl) {
  let msg = '';
  if (control.value === null) {
    return null;
  } else if (control.value.length < 2) {
    msg = '字符长度不得低于2位';
  } else if (control.value.length > 8) {
    msg = '字符长度不得大于8位';
  }
  return msg.length ? {result: {info: msg}} : null;
}
