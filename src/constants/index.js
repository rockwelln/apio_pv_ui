export const countsPerPages = [
  { value: 5, title: "5" },
  { value: 10, title: "10" },
  { value: 25, title: "25" },
  { value: 50, title: "50" },
  { value: 100, title: "100" }
];

export const trunkGroupMode = [
  { name: "not active", value: "" },
  { name: "Reroute", value: "Reroute" },
  { name: "Forward", value: "Forward" }
];

export const USERTYPES = [
  { name: "none", value: "" },
  { name: "Enduser", value: "enduser" },
  { name: "Customer administrator", value: "customer_administrator" },
  { name: "Customer support", value: "customer_support" },
  { name: "Super customer support", value: "super_customer_support" },
  { name: "Screener", value: "screener" },
  { name: "Reseller", value: "reseller" }
];

export const TYPEOFIAD = [
  { name: "PRA", value: "PRA" },
  { name: "BRA", value: "BRA" },
  { name: "SIP", value: "SIP" },
  { name: "PRA then SIP", value: "PRA then SIP" },
  { name: "SIP then PRA", value: "SIP then PRA" }
];

export const TYPEOFACCESS = [
  { name: "COAX", value: "COAX" },
  { name: "VDSL", value: "VDSL" },
  { name: "FIBER", value: "FIBER" }
];

export const SERVICETYPE = [
  { name: "Service redundant type 1", value: "1" },
  { name: "Service redundant type 2", value: "2" },
  { name: "Service redundant type 3", value: "3" },
  { name: "Service redundant type 4", value: "4" },
  { name: "Service redundant dual type 2 (2 EDU)", value: "a" },
  { name: "Service redundant dual type 2 bis (2 EDU)", value: "b" },
  { name: "Service redundant dual type 5 (2 EDU)", value: "5" },
  { name: "Service redundant dual type 5 bis (2 EDU)", value: "c" },
  { name: "Service redundant dual type 6 (2 EDU)", value: "6" },
  { name: "Service redundant type 7", value: "7" }
];

export const ADVICEOFCHARGE = [
  { name: "none", value: false },
  { name: "AOC-D", value: "AOC-D" },
  { name: "AOC-E", value: "AOC-E" }
];

export const DTMF = [
  { name: "RFC2833", value: "RFC2833" },
  { name: "G711", value: "G711" }
];

export const CHANNELHUNTING = [
  {
    name: "Lowest available channel first",
    value: "Lowest available channel first"
  },
  {
    name: "Highest available channel first",
    value: "Highest available channel first"
  },
  { name: "Loadbalanced", value: "Loadbalanced" },
  { name: `Circular clockwise \u26a0`, value: "Circular clockwise" },
  {
    name: `Circular counter clockwise \u26a0`,
    value: "Circular counter clockwise"
  }
];

export const DIRECTION = [
  { name: "Bi-directional", value: "Bi" },
  { name: "Uni-directional", value: "Uni" }
];

export const DESTINATIONNUMBERSPRA = [
  { name: "No-fromating rule", value: "None" },
  { name: "National format with leadig 0's", value: "Strip + and add 00" },
  { name: "National format without leadig 0's", value: "Strip +" },
  { name: "National: E164 without leading +", value: "a" }
];
export const NATIONNUMBERSPRA = [
  { name: "No-fromating rule", value: "None" },
  { name: "National format with leadig 0's", value: "Strip 0" },
  { name: "National format without leadig 0's", value: "Strip 0 and add +32" },
  { name: "National: E164 without leading +", value: "Strip 0 and add 32" }
];
export const INTERNATIONNUMBERSPRA = [
  { name: "No-fromating rule", value: "None" },
  { name: "International format (E164) without leadig 0's", value: "a" },
  { name: "International format with leadig 0's", value: "b" }
];
