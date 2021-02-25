import * as CodaSDK from "@o1labs/client-sdk";
import * as fs from "fs";

/* Get these payouts from the first stage - load them from a file or whatever... */
let payouts = [{'publicKey': 'B62qkbdgRRJJfqcyVd23s9tgCkNYuGMCmZHKijnJGqYgs9N3UdjcRtR', 'total': 4644003513}];

let keys = {
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
};

/* You need to manually set the nonce */
let nonce = 657;

/* Send a payment */
for (let [key, value] of Object.entries(payouts)) {
  let signedPayment = CodaSDK.signPayment(
    {
      to: value["publicKey"],
      from: keys.publicKey,
      fee: 10000000,
      nonce: nonce,
      amount: value["total"],
      memo: "My awesome staking pool payout",
    },
    keys
  );

  /*console.log(JSON.stringify(signedPayment, null, 2));*/

  let data = JSON.stringify(signedPayment);

  /* Writes them to a file by nonce for broadcasting */
  fs.writeFileSync("payments/" + nonce + ".json", data);

  nonce++;
}