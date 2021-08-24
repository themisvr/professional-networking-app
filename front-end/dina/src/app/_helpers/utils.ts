import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class SamePasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
        const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

        return invalidCtrl || invalidParent;
    }
}

export function checkPasswords(group: AbstractControl, passElemName: string, confirmPassElemName: string): ValidationErrors | null {
    let pass = group.get(passElemName)?.value;
    let confirmPass = group.get(confirmPassElemName)?.value
    return pass === confirmPass ? null : { notSame: true }
  }