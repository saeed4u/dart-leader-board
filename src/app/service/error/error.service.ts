import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public $subject: Subject<any> = new Subject();

  public $behaviorSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
  }

  setValue(value: any) {
    this.$subject.next(value);
  }
}
