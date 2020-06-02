import { AuthService } from './../../auth.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


//building custom validtors  to evaluate the passowrd
export class CustomValidators {

    static authService:AuthService;
   
    static displayError(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null;
          }
          const valid = regex.test(control.value);
          return valid ? null : error;
        };
      }

    
      static validateEmail(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
             let alreadyExist;
          this.authService.validateEmail(control.value)
          .subscribe(data=>{
              var res=data;
              if(res===control.value){
                  alreadyExist:true;
                  return {'alreadyExist':true}
              }else{
                  alreadyExist:null;
                  return null
              }
          },(error)=>{
              console.log(error);
              
          }
          
          );
          return alreadyExist;
            
        }
    }
    

    }
