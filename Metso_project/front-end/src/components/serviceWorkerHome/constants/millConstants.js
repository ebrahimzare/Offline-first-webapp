import React from "react";
export const tableHeader = ["Component", "Condition", "Work to be scheduled"];

function createData(component, condition, work_to_be_scheduled) {
  return {
    mill_id: "",
    version: 1,
    component,
    condition,
    work_to_be_scheduled
  };
}

export const tableData = [
  createData("Gear/Gear Guard / Gear spray sys.", "NA", ""),
  createData("Pinion/ Drive system (Up drive)", "NA", ""),
  createData("Pinion/ Drive system (Down drive)", "NA", ""),
  createData("Shell", "NA", ""),
  createData("Feed head", "NA", "-"),
  createData("Discharge head", "NA", ""),
  createData("Palier principal.alimentation", "NA", ""),
  createData("Palier principal.décharge", "NA", ""),
  createData("Système de lubrication. des paliers", "NA", ""),
  createData("Pas à pas (Inching drive)", "NA", "")
];

export const select_options = [
  {
    value: "Red",
    label: <img src={"./photos/red.png"} width="20" height="20" alt="Bad" />
  },
  {
    value: "Yellow",
    label: (
      <img src={"./photos/yellow.png"} width="20" height="20" alt="Average" />
    )
  },
  {
    value: "Green",
    label: (
      <img src={"./photos/green.png"} width="20" height="20" alt="Excellent" />
    )
  },
  {
    value: "NA",
    label: <img src={"./photos/NA.jpeg"} width="20" height="20" alt="NA" />
  }
];

export const leftTHead = [
  "BOLT LOCATION",
  "TYPE",
  "SIZE",
  "LENGTH",
  "SOCKET",
  "TORQUE/ Nm"
];

export const rightTHead = ["Description", "INFORMATION / CRITERIA"];

export const leftTData = [
  {
    bolt_location: "Main Bearing Baseplate Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M39",
    bolt_length: "160mm",
    bolt_socket: "60mm",
    bolt_torque: "2,640"
  },
  {
    bolt_location: "Main Bearing Cap Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M16",
    bolt_length: "75mm",
    bolt_socket: "24mm",
    bolt_torque: "185"
  },
  {
    bolt_location: "Main Bearing Insert Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M20",
    bolt_length: "65mm",
    bolt_socket: "30mm",
    bolt_torque: "215"
  },
  {
    bolt_location: "Feed Baseplate to Plinth Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M48",
    bolt_length: "N/A",
    bolt_socket: "75mm",
    bolt_torque: "2,200"
  },
  {
    bolt_location: "Disc. Baseplate to Plinth Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M48",
    bolt_length: "N/A",
    bolt_socket: "75mm",
    bolt_torque: "2,200"
  },
  {
    bolt_location: "Head / Head Flange Bolts",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Head / Head Flange Studs",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Trunnion / Head Flange Bolts",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Head / Shell Flange Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M39",
    bolt_length: "220mm",
    bolt_socket: "60mm",
    bolt_torque: "2,315"
  },
  {
    bolt_location: "Shell / Shell Flange Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M39",
    bolt_length: "220mm",
    bolt_socket: "60mm",
    bolt_torque: "2,315"
  },
  {
    bolt_location: "Head / Shell / Gear Flange Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M39",
    bolt_length: "400mm",
    bolt_socket: "60mm",
    bolt_torque: "2,315"
  },
  {
    bolt_location: "Gear Split Flange Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M56",
    bolt_length: "400mm",
    bolt_socket: "85mm",
    bolt_torque: "SUPERBOLT"
  },
  {
    bolt_location: "Gear Split  Bolts / Small End",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Gear Split Bolts / Large End",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Pinion Housing Base Plate Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M42",
    bolt_length: "160mm",
    bolt_socket: "65mm",
    bolt_torque: "2,100"
  },
  {
    bolt_location: "Pinion Housing Cap Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "2,000"
  },
  {
    bolt_location: "Base Plate to Plinth Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M48",
    bolt_length: "N/A",
    bolt_socket: "75mm",
    bolt_torque: "2,220"
  },
  {
    bolt_location: "Low Speed Coupling Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Reducer Base Plate Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Base Plate to Plinth Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M42",
    bolt_length: "N/A",
    bolt_socket: "65mm",
    bolt_torque: "1,470"
  },
  {
    bolt_location: "High Speed Coupling Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Motor Base Plate Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Base Plate to Plinth Bolts",
    bolt_type: "HEX NUT.",
    bolt_size: "M36",
    bolt_length: "N/A",
    bolt_socket: "55mm",
    bolt_torque: "920"
  },
  {
    bolt_location: "Barring Gear Mounting Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Barring Motor Mounting Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  },
  {
    bolt_location: "Feed Trunnion Liner Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M30",
    bolt_length: "140mm",
    bolt_socket: "46mm",
    bolt_torque: "895"
  },
  {
    bolt_location: "Discharge Trunnion Liner Bolts",
    bolt_type: "HEX HD.",
    bolt_size: "M30",
    bolt_length: "140mm",
    bolt_socket: "46mm",
    bolt_torque: "895"
  },
  {
    bolt_location: "Trommel Mounting Bolts",
    bolt_type: "N/A",
    bolt_size: "N/A",
    bolt_length: "N/A",
    bolt_socket: "N/A",
    bolt_torque: "N/A"
  }
];

export const rightTData = [
  { mill_description: "Main Bearing Type", info_criteria: `HYDRODYNAMIC` },
  {
    mill_description: "Main Bearing Size",
    info_criteria: `66" X 22" - WHITE METAL`
  },
  {
    mill_description: "Main Bearing Seal Type",
    info_criteria: `RUBBER SEAL EXTRUSION`
  },
  { mill_description: "Gear & Pinion Type", info_criteria: `HELICAL` },
  { mill_description: "Gear Diameter", info_criteria: `244.37"- 6207mm` },
  { mill_description: "Gear vs. Pinion Teeth", info_criteria: `240 vs. 22` },
  { mill_description: "Pinion Diameter", info_criteria: `24.21"- 615mm` },
  {
    mill_description: "Pinion  Bearing  Type",
    info_criteria: `SPHERICAL ROLLER`
  },
  { mill_description: "Pinion  Bearing  Size", info_criteria: `SDAF23256` },
  { mill_description: "Motor Type", info_criteria: `SLIP RING INDUCTION` },
  { mill_description: "Motor Size", info_criteria: `2950 HP - 2200 KW` },
  { mill_description: "Reducer Type", info_criteria: `DOUBLE REDUCTION` },
  { mill_description: "Reducer Size", info_criteria: `H2SH19` },
  {
    mill_description: "High Speed Coupling  Type",
    info_criteria: `RUPEX -PIN AND BUSH`
  },
  { mill_description: "High Speed Coupling Size", info_criteria: `RWN 560` },
  { mill_description: "High Speed Shaft Gap", info_criteria: `4mm - 8mm` },
  {
    mill_description: "Low Speed Coupling Type",
    info_criteria: `ZAPEX - GEAR`
  },
  { mill_description: "Low Speed Coupling Size", info_criteria: `ZZS 545` },
  { mill_description: "Low Speed Shaft Gap", info_criteria: `500mm` },
  { mill_description: "Barring Unit Type", info_criteria: `MECHANICAL` },
  { mill_description: "Barring Unit Size", info_criteria: `H4SH10(B)` },
  {
    mill_description: "Barring Unit Motor Size",
    info_criteria: `40 HP - 30 KW(SIEMENS)`
  },
  { mill_description: "Barring Shaft Gap", info_criteria: `10mm` },
  { mill_description: "Brake Type", info_criteria: `ELECTRO MAGNETIC - DRUM` },
  { mill_description: "Brake Size", info_criteria: `TE 250/30/5 THRUSTER` }
];

// const testDataPostMan = 
// [
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Gear/Gear Guard / Gear spray sys.",
//     "condition": "NA",
//     "work_to_be_scheduled": "clean gears"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Pinion/ Drive system (Up drive)",
//     "condition": "Green",
//     "work_to_be_scheduled": "Align pinion"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Pinion/ Drive system (Down drive)",
//     "condition": "Red",
//     "work_to_be_scheduled": "Mop the floors"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Shell",
//     "condition": "Yellow",
//     "work_to_be_scheduled": "Perform MPI on head to shell welds"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Feed head",
//     "condition": "Red",
//     "work_to_be_scheduled": "do something"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Discharge head",
//     "condition": "Yellow",
//     "work_to_be_scheduled": "do something interesting"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Palier principal.alimentation",
//     "condition": "Red",
//     "work_to_be_scheduled": "ds"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Palier principal.décharge",
//     "condition": "Green",
//     "work_to_be_scheduled": "ds"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Système de lubrication. des paliers",
//     "condition": "NA",
//     "work_to_be_scheduled": "Lubricate the system"
//   },
//   {
//     "mill_id": "72346-B",
//     "version": 1,
//     "component": "Pas à pas (Inching drive)",
//     "condition": "Yellow",
//     "work_to_be_scheduled": "Align Coupling"
//   }
// ];
