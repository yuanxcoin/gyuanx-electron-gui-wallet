/* eslint-disable prefer-promise-reject-errors */
export const greater_than_zero = input => {
  return input > 0;
};

export const payment_id = input => {
  // || input.length == 16 to be re-added after rpc fixed
  return (
    input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && input.length == 64)
  );
};

export const privkey = input => {
  return (
    input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && input.length == 64)
  );
};

export const service_node_key = input => {
  return input.length === 64 && /^[0-9A-Za-z]+$/.test(input);
};

export const session_id = input => {
  return input.length === 66 && /^05[0-9A-Za-z]+$/.test(input);
};

// shortened Lokinet LNS name
export const lokinet_name = input => {
  console.log("lokinet name called");
  let inputSafe = input || "";
  console.log(inputSafe);
  // 63 including or excluding .loki??
  // const maxLen = inputSafe.contains("-") ? 32 : 63;
  // console.log("max len is: " + maxLen);
  return true;
};

// Full lokinet address
export const lokinet_address = input => {
  console.log("lokinet address input");
  console.log(input);
  return (
    input.length === 52 &&
    /^[ybndrfg8ejkmcpqxot1uwisza345h769]{51}[yo]$/.test(input)
  );
};

export const session_name = input => {
  return (
    input.length === 0 ||
    /^[a-z0-9_]([a-z0-9-_]*[a-z0-9_])?$/.test(input.toLowerCase())
  );
};

export const address = (input, gateway) => {
  if (!/^[0-9A-Za-z]+$/.test(input)) return false;

  // Validate the address
  return new Promise((resolve, reject) => {
    gateway.once("validate_address", data => {
      if (data.address && data.address !== input) {
        reject();
      } else {
        if (data.valid) {
          resolve();
        } else {
          reject();
        }
      }
    });
    gateway.send("wallet", "validate_address", {
      address: input
    });
  });
};
