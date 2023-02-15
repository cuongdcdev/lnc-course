import { utils } from "near-api-js";

export class Contract {
  wallet;

  constructor({ wallet }) {
    this.wallet = wallet;
  }

  async get_number() {
    return await this.wallet.viewMethod({ method: 'get_number' });
  }

  async increase_number() {
    return await this.wallet.callMethod({ method: 'increase_number' });
  }

  async decrease_number() {
    return await this.wallet.callMethod({ method: 'decrease_number' });
  }

  async set_message(msg) {
    return this.wallet.callMethod({ method: 'set_message', args: { msg: msg } });
  }

  async get_messages() {
    return this.wallet.viewMethod({ method: 'get_messages' });
  }

  async donate(amount) {
    return this.wallet.callMethod({ method: 'deposit', deposit: utils.format.parseNearAmount(amount) });
  }
}