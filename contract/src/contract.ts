import { NearBindgen, near, call, view, Vector } from 'near-sdk-js';

@NearBindgen({})
class Contract {
  num: number = 0;
  messages: Vector = new Vector("msg");

  @view({})
  get_number(): number {
    return this.num;
  }

  @call({})
  increase_number(): void {
    // increase number and log account call
    near.log("Increase number by " + near.predecessorAccountId());
    this.num++;
  }

  @call({})
  decrease_number(): void {
    if (this.num == 0) {
      throw new Error("Can't decrease number");
    }
    // decrease number and log account call
    near.log("Decrease number by " + near.predecessorAccountId());
    this.num--;
  }

  @call({ privateFunction: true })
  reset_number(): void {
    // this method can only be called by the contract's account
    this.num = 0;
  }

  @call({ payableFunction: true })
  deposit(): void {
    //deposit NEAR token to the contract's account
    near.log("User deposit amount: " + near.attachedDeposit());
    this.num += 10;
  }

  @call({})
  set_message(msg) {
    //set new messag 
    this.messages.push(msg);
  }

  @view({})
  get_messages() {
    // get messages as a simple array
    return this.messages.toArray();
  }

}