const background_image = "../../images/pic03.jpg";

export const dashboard_data = [ {
    title: "Mill Specification",
    background_image: background_image,
    link_to: "/MillSpecification",
    description: "Click Here to see the specifications of this equipment.",
    component_name: "<MillSpecification/>"
},
{
    title: "Previous Visit",
    background_image: background_image,
    link_to: "/PreviousVisit",
    description: "Previous Visits are visits that have been approved",
    component_name: "<PreviousVisit/>"
},
{
    title: "Create Report",
    background_image: background_image,
    description: "Click Here to create a new report for equipment.",
},
{
    title: "Reports In Progress",
    background_image: background_image,
    link_to: "/ReportsInProgress",
    description: "Ongoing reports in progress, not yet submitted.",
    component_name: "<PreviousVisit/>"
},
{
    title: "Instructions and manuals",
    background_image: background_image,
    link_to: "/",
    description: "Intruction and manuals",
    component_name: "<EquipmentList/>"
}
];